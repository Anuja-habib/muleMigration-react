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
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = async () => {
    const zip = new JSZip()
    const baseFolder = zip.folder('OrderProcessingService')

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
    saveAs(blob, 'OrderProcessingService.zip')
  }

  return (
    <div className="max-w-[1200px] mx-auto p-6">
      <div className="bg-gradient-to-br from-[#4a46cc] to-[#0b1b42] rounded-2xl p-8 mb-8 text-white shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
        <h1 className="mb-4 text-2xl sm:text-3xl lg:text-4xl font-semibold flex items-center gap-3 tracking-[-0.5px]">
          <FiCode className="text-2xl sm:text-3xl" />
          WSDL to RAML Converter
        </h1>
        <p>
          Convert your WSDL schema to clean, structured RAML definitions for seamless API
          documentation and development.
        </p>

        <div className="flex flex-col md:flex-row gap-6 mt-6">
          <div className="bg-white/10 p-6 rounded-xl backdrop-blur border border-white/10 transition-transform duration-200 ease-in-out hover:translate-y-0.5">
            <h3 className="text-[18px] mb-3 font-medium flex items-center gap-2">
              <FiUploadCloud />
              Easy Upload
            </h3>
            <p className="text-sm opacity-90 leading-relaxed m-0">
              Upload your WSDL files with ease — simply drag and drop or paste the content directly.
              We support both single and multiple schema files with automatic validation to ensure
              accuracy.
            </p>
          </div>

          <div className="bg-white/10 p-6 rounded-xl backdrop-blur border border-white/10 transition-transform duration-200 ease-in-out hover:translate-y-0.5">
            <h3 className="text-[18px] mb-3 font-medium flex items-center gap-2">
              <FiCode />
              Smart Generation
            </h3>
            <p className="text-sm opacity-90 leading-relaxed m-0">
              Our converter automatically generates RAML data type structures from your WSDL schema.
              It ensures a clean, well-formatted RAML output with intelligent type mappings and
              useful examples to help you get started.
            </p>
          </div>

          <div className="bg-white/10 p-6 rounded-xl backdrop-blur border border-white/10 transition-transform duration-200 ease-in-out hover:translate-y-0.5">
            <h3 className="text-[18px] mb-3 font-medium flex items-center gap-2">
              <FiDownload />
              Instant Export
            </h3>
            <p className="text-sm opacity-90 leading-relaxed m-0">
              Once your WSDL is converted to RAML, download the file instantly or copy it to your
              clipboard. Our tool also provides syntax highlighting and validation to ensure your
              RAML is API-ready.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        <div className="w-full bg-white border border-[#e1e4e8] rounded-xl overflow-scroll shadow-[0_2px_12px_rgba(0,0,0,0.05)] transition-shadow duration-200 ease-in-out hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] flex flex-col h-[600px]">
          <div className="flex items-center justify-between px-5 py-4 bg-[#f8f9fa] border-b border-[#e1e4e8]">
            <div className="flex items-center">
              <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                <FiCode /> Input WSDL
              </h3>
            </div>
            <div className="flex gap-2">
              <div
                className="flex gap-1 items-center px-3 py-1.5 border border-[#e1e4e8] rounded-md bg-white text-[#586069] text-[13px] cursor-pointer transition-all duration-200 hover:bg-[#f3f4f6] hover:border-[#bbb] hover:text-[#24292e] active:bg-[#e1e4e8]"
                onClick={() => {
                  setInputContent('')
                  setInputContentText('')
                }}
              >
                <MdContentPaste /> <span>Clear</span>
              </div>
            </div>
          </div>
          <div className="flex justify-between px-4 py-3 bg-[#f6f8fa] border-b border-[#e1e4e8]">
            <div className="flex bg-[#edf0f3] p-1 rounded-full">
              <div className="flex bg-[#edf0f3] rounded-full">
                <button
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-[14px] font-medium cursor-pointer transition-all duration-200 min-w-[130px] justify-center 
      ${activeTab === 'upload' ? 'bg-[#4a46cc] text-white scale-105' : 'bg-transparent text-[#586069]'}
  `}
                  onClick={() => setActiveTab('upload')}
                >
                  <FiUploadCloud /> Upload File
                </button>
                <button
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-[14px] font-medium cursor-pointer transition-all duration-200 min-w-[130px] justify-center 
      ${activeTab === 'paste' ? 'bg-[#4a46cc] text-white scale-105' : 'bg-transparent text-[#586069]'}
      `}
                  onClick={() => setActiveTab('paste')}
                >
                  <FiEdit /> Write/Paste
                </button>
              </div>
            </div>

            {(inputContent || inputContentText) && (
              <button
                className="relative bg-green-600  text-white p-4 text-sm font-semibold rounded-full  hover:bg-green-800 hover:text-white hover:translate-y-[-1px] hover:shadow-[0_4px_8px_rgba(74,70,204,0.3)] w-auto flex items-center justify-center gap-2.5 overflow-hidden transition-all duration-200 ease-in-out cursor-pointer"
                onClick={handleSubmit}
              >
                <FiSend /> Send
              </button>
            )}
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
                {(inputContent || inputContentText) && (
                  <span className="text-green-600 font-medium mt-2 flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414L8.414 15 4 10.586a1 1 0 011.414-1.414L8.414 12.172l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    File loaded successfully!
                  </span>
                )}
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
          {activeTab === 'paste' && (
            <div className="flex justify-between items-center py-4 px-5 bg-[#f8f9fa] border-t border-[#e1e4e8] sticky bottom-0 left-0 right-0 z-10 backdrop-blur-[8px]">
              <div className="flex items-center gap-2 text-[#6a737d] text-[14px]">
                {inputContent ? (
                  <>
                    <FiCheckCircle size={16} color="4a46cc" />
                    Ready to convert
                  </>
                ) : (
                  <>
                    <FiEdit size={16} color="4a46cc" />
                    Start writing or paste your WSDL content
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="w-full bg-white border border-[#e1e4e8] rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.05)] transition-shadow duration-200 ease-in-out hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] flex flex-col h-[600px]">
          {/* Header */}
          <div className="flex items-center justify-between py-4 px-5 bg-white border-b border-[#e1e4e8]">
            <div className="flex items-center gap-4">
              <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                <FiCode /> Output RAML
              </h3>
              {error ? (
                <div className="flex items-center gap-1 text-[12px] text-red-800">
                  <FiAlertCircle />
                  <span>Generation failed</span>
                </div>
              ) : (
                outputContent && (
                  <div className="flex items-center gap-1 text-[12px] text-green-800 ml-3">
                    <FiCheckCircle />
                    <span>Generation successful</span>
                  </div>
                )
              )}
            </div>
            <div className="flex gap-2">
              <CopyToClipboard
                text={
                  typeof getActiveContent() === 'string'
                    ? getActiveContent()
                    : JSON.stringify(getActiveContent(), null, 4)
                }
              >
                <button className="flex items-center px-3 py-1.5 border border-[#e1e4e8] rounded-[6px] bg-white text-[#586069] text-[13px] cursor-pointer transition-all duration-200 hover:bg-[#f3f4f6] hover:border-[#bbb] hover:text-[#24292e] active:bg-[#e1e4e8]">
                  <FiCopy />
                </button>
              </CopyToClipboard>
              <button
                className="flex gap-1 items-center px-3 py-1.5 border border-[#e1e4e8] rounded-[6px] bg-white text-[#586069] text-[13px] cursor-pointer transition-all duration-200 hover:bg-[#f3f4f6] hover:border-[#bbb] hover:text-[#24292e] active:bg-[#e1e4e8]"
                onClick={() => handleDownload()}
              >
                <FiDownload /> <span>Download</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex flex-grow overflow-hidden font-mono text-[12px] leading-[20px]">
            {isLoading ? (
              <div className="flex items-center justify-center w-full">
                {/* Loading spinner */}
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 text-gray-200 animate-spin dark:text-white fill-indigo-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </div>
            ) : error ? (
              <div className="p-4 text-red-600">{error}</div>
            ) : (
              <div className="flex flex-grow overflow-hidden w-full">
                {/* Sidebar */}
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

                {/* Editor */}
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
      </div>
    </div>
  )
}

export default WsdlToRaml
