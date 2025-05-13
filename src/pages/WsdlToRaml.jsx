import React, { useState, useRef, useEffect } from 'react'
import {
  FiUploadCloud,
  FiCopy,
  FiDownload,
  FiCode,
  FiEdit,
  FiCheckCircle,
  FiAlertCircle,
  FiSend,
} from 'react-icons/fi'
import { MdContentPaste } from 'react-icons/md'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

import config from '../config/config'
import Editor from '@monaco-editor/react'

import { WSDLToRAMLTexts } from '../seeds/features'

import SendSubmit from '../components/HeroPages/SendSubmit'
import HeroBanner from '../components/HeroPages/HeroBanner'
import ToggleTabs from '../components/HeroPages/ToggleTabs'
import ToggleInputTabs from '../components/HeroPages/ToggleInputTabs'
import InputSectionHeader from '../components/HeroPages/InputSectionHeader'
import FileLoadedSuccess from '../components/HeroPages/FileLoadedSuccess'
import PasteInputText from '../components/HeroPages/PasteInputText'
import ToggleOutputText from '../components/HeroPages/ToggleOutputText'
import OutputActions from '../components/HeroPages/OutputActions'

let fileStructure = {
  root: {
    'root-file.raml': '#%RAML 1.0\ntitle: Root File',
  },
  dataTypes: {
    'file-a1.raml': '#%RAML 1.0\ntitle: File A1',
    'file-a2.raml': '#%RAML 1.0\ntitle: File A2',
  },
  examples: {
    'file-b1.raml': '#%RAML 1.0\ntitle: File B1',
    'file-b2.raml': '#%RAML 1.0\ntitle: File B2',
  },
}

const WsdlToRaml = () => {
  const [inputContent, setInputContent] = useState()
  const [outputContent, setOutputContent] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('upload')
  const [inputContentText, setInputContentText] = useState()
  const [activePath, setActivePath] = useState(['root', 'api.raml'])
  const [files, setFiles] = useState(fileStructure)
  const [filename, setFilename] = useState(`example-${(+new Date()).toString(36)}`)
  const [viewTab, setViewTab] = useState('input')

  const fileInputRef = React.useRef(null)
  const editorRef = useRef(null)

  const getActiveContent = () => {
    const [folder, file] = activePath
    return files[folder][file]
  }

  const updateActiveContent = (newContent) => {
    const [folder, file] = activePath
    setFiles((prev) => ({
      ...prev,
      [folder]: {
        ...prev[folder],
        [file]: newContent,
      },
    }))
  }

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor
  }

  const readFile = (file) => {
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setInputContentText(e.target.result)
      }
      reader.readAsText(file)
    }
  }

  useEffect(() => {
    if (activeTab === 'paste' && editorRef.current) {
      editorRef.current.layout()
    }

    if (inputContentText && inputContentText.length > 0) {
      const file = new File([inputContentText], 'temp', { type: 'application/xml' })
      setInputContent(file)
    }
  }, [activeTab, inputContentText])

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setInputContent(file)
      readFile(file)
    }
  }

  const handleSubmit = () => {
    convertToRaml()
  }

  const convertToRaml = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', inputContent)

      console.log(formData)

      const response = await fetch(config.apiUrlPython + '/wsdl-to-raml', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Conversion failed')
      }

      const data = await response.json()

      const transformResponseToFileStructure = (response) => {
        const fileStructure = {
          root: {
            'api.raml': response.result['api.raml'],
          },
          dataTypes: {},
          examples: {},
        }

        // Populate dataTypes folder
        Object.keys(response.result.dataTypes).forEach((fileName) => {
          fileStructure.dataTypes[fileName] = response.result.dataTypes[fileName]
        })

        // Populate examples folder
        Object.keys(response.result.examples).forEach((fileName) => {
          fileStructure.examples[fileName] = response.result.examples[fileName]
        })

        return fileStructure
      }

      setFiles(transformResponseToFileStructure(data))
      setViewTab('output')
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = async (projectName) => {
    const finalName = projectName || filename || `example-${(+new Date()).toString(36)}`
    const zip = new JSZip()
    const baseFolder = zip.folder(finalName)

    for (const [name, content] of Object.entries(files.root)) {
      baseFolder.file(name, content)
    }

    const dataTypesFolder = baseFolder.folder('dataTypes')
    for (const [name, content] of Object.entries(files.dataTypes)) {
      dataTypesFolder.file(name, content)
    }

    const examplesFolder = baseFolder.folder('examples')
    for (const [name, content] of Object.entries(files.examples)) {
      examplesFolder.file(name, content)
    }

    const blob = await zip.generateAsync({ type: 'blob' })
    saveAs(blob, `${finalName}.zip`)
  }

  return (
    <div className="max-w-[1200px] mx-auto p-6">
      <HeroBanner
        title={WSDLToRAMLTexts.title}
        subtitle={WSDLToRAMLTexts.subtitle}
        features={WSDLToRAMLTexts.features}
      />

      <ToggleTabs activeTab={viewTab} setActiveTab={setViewTab} />

      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        {viewTab === 'input' && (
          <div className="w-full bg-white border border-[#e1e4e8] rounded-xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.05)] transition-shadow duration-200 ease-in-out hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] flex flex-col h-[600px]">
            <InputSectionHeader onClear={() => setInputContent(null)} />

            <div className="flex justify-between px-4 py-3 bg-[#f6f8fa] border-b border-[#e1e4e8]">
              <ToggleInputTabs activeTab={activeTab} setActiveTab={setActiveTab} />
              {inputContent && <SendSubmit isLoading={isLoading} handleSubmit={handleSubmit} />}
            </div>

            {activeTab === 'paste' && (
              <div className="py-3 px-5 bg-[#f1f8ff] border-b border-[#e1e4e8] text-[#24292e] text-[14px] flex items-center gap-2">
                <FiCode /> Write or paste your WSDL content below
              </div>
            )}
            <div className="flex-1 overflow-auto relative flex flex-col">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                onClick={(e) => (e.target.value = null)}
                className="hidden"
                accept=".xml,.wsdl"
              />
              {activeTab === 'upload' ? (
                <div
                  className={`p-10 border-2 border-dashed rounded-md m-4 text-center cursor-pointer transition-all duration-200 flex flex-col items-center gap-5 h-full
                ${inputContent ? 'border-green-500 bg-green-50 hover:border-green-600' : 'border-[#e1e4e8] hover:border-[#0366d6] hover:bg-[#f6f8fa]'}`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <FiUploadCloud size={48} color="#586069" />
                  <p>Drop your WSDL file here or click to upload</p>
                  {(inputContent || inputContentText) && <FileLoadedSuccess />}
                </div>
              ) : (
                <Editor
                  height="100%"
                  defaultLanguage="xml"
                  theme="vs-light"
                  value={inputContentText}
                  onChange={(value) => setInputContentText(value)}
                  onMount={(editor) => handleEditorDidMount(editor)}
                  options={{
                    tabSize: 4,
                    insertSpaces: true,
                    detectIndentation: false,
                    fontSize: 16,
                    lineHeight: 1.8,
                    fontFamily: "'Fira Code', monospace",
                    minimap: { enabled: false },
                    wordWrap: 'on',
                    lineNumbers: 'on',
                    cursorStyle: 'line',
                  }}
                />
              )}
            </div>
            {activeTab === 'paste' && <PasteInputText inputContent={inputContent} />}
          </div>
        )}
        {viewTab === 'output' && (
          <div className="w-full bg-white border border-[#e1e4e8] rounded-xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.05)] transition-shadow duration-200 ease-in-out hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] flex flex-col h-[600px]">
            <div className="flex items-center justify-between py-4 px-5 bg-white border-b border-[#e1e4e8]">
              <ToggleOutputText error={error} outputContent={outputContent} />
              <OutputActions
                outputContent={getActiveContent}
                filename={filename}
                setFilename={setFilename}
                handleDownload={handleDownload}
              />
            </div>

            <div className="flex flex-grow overflow-hidden font-mono text-[12px] leading-[20px]">
              {isLoading ? (
                <OutputLoader />
              ) : error ? (
                <div className="p-4 text-red-600">{error}</div>
              ) : (
                <div className="flex flex-grow overflow-hidden w-full">
                  <div className="w-60 bg-gray-100 border-r border-gray-300 p-4 overflow-y-auto">
                    <h4 className="text-lg font-semibold mb-4">Files</h4>
                    {Object.entries(files).map(([folderName, folderFiles]) => (
                      <div key={folderName} className="mb-4">
                        {folderName !== 'root' && (
                          <div className="text-sm font-medium text-gray-700 mb-1">{folderName}</div>
                        )}
                        <div className={folderName !== 'root' ? 'pl-4' : ''}>
                          {Object.keys(folderFiles).map((fileName) => (
                            <div
                              key={fileName}
                              className={`cursor-pointer text-sm py-1 px-2 rounded hover:bg-gray-200 ${
                                activePath[0] === folderName && activePath[1] === fileName
                                  ? 'bg-blue-100 text-blue-600 font-medium'
                                  : ''
                              }`}
                              onClick={() => setActivePath([folderName, fileName])}
                            >
                              {fileName}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex-grow overflow-hidden">
                    <Editor
                      height="100%"
                      defaultLanguage="yaml"
                      theme="vs-light"
                      value={getActiveContent()}
                      onChange={(value) => updateActiveContent(value || '')}
                      options={{
                        fontSize: 16,
                        lineHeight: 1.8,
                        fontFamily: "'Fira Code', monospace",
                        minimap: { enabled: false },
                        wordWrap: 'on',
                        lineNumbers: 'on',
                        cursorStyle: 'line',
                        tabSize: 4,
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default WsdlToRaml
