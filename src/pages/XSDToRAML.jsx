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
import config from '../config/config'
import Editor from '@monaco-editor/react'
import yaml from 'js-yaml'

import { XSDToRAMLTexts } from '../seeds/features'

import SendSubmit from '../components/HeroPages/SendSubmit'
import HeroBanner from '../components/HeroPages/HeroBanner'
import ToggleTabs from '../components/HeroPages/ToggleTabs'
import ToggleInputTabs from '../components/HeroPages/ToggleInputTabs'
import InputSectionHeader from '../components/HeroPages/InputSectionHeader'
import FileLoadedSuccess from '../components/HeroPages/FileLoadedSuccess'
import PasteInputText from '../components/HeroPages/PasteInputText'
import ToggleOutputText from '../components/HeroPages/ToggleOutputText'
import OutputActions from '../components/HeroPages/OutputActions'

const XSDToRAML = () => {
  const [inputContent, setInputContent] = useState()
  const [outputContent, setOutputContent] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('upload')
  const [filename, setFilename] = useState(`example-${(+new Date()).toString(36)}`)
  const [viewTab, setViewTab] = useState('input')
  const [inputContentText, setInputContentText] = useState()

  const fileInputRef = React.useRef(null)
  const editorRef = useRef(null)

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor
  }

  const readFile = (file) => {
    console.log(file)
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setInputContentText(e.target.result)
      }
      reader.readAsText(file)
    }
  }

  useEffect(() => {
    if (activeTab === 'paste') {
      if (editorRef.current) {
        editorRef.current.layout()
      }

      if (inputContentText) {
        const file = new File([inputContentText], `example-${(+new Date()).toString(36)}`, {
          type: 'application/xml',
        })
        setInputContent(file)
      }
    } else if (activeTab === 'upload') {
      const file = fileInputRef.current?.files[0]
      if (file) {
        setInputContent(file)
      }
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

      const response = await fetch(config.apiUrlPython + '/xsd-to-raml', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Conversion failed')
      }

      const data = await response.json()

      const parsedYAML = yaml.load(data['result'])
      const yamlString = yaml.dump(parsedYAML)
      setOutputContent(yamlString)
      setViewTab('output')
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = (content, filename) => {
    const dataToDownload = typeof content === 'string' ? content : JSON.stringify(content, null, 4)

    const blob = new Blob([dataToDownload], {
      type: 'application/json',
    })

    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="max-w-[1200px] mx-auto p-6">
      <HeroBanner
        title={XSDToRAMLTexts.title}
        subtitle={XSDToRAMLTexts.subtitle}
        features={XSDToRAMLTexts.features}
      />

      <ToggleTabs activeTab={viewTab} setActiveTab={setViewTab} />

      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        {viewTab === 'input' && (
          <div className="w-full bg-white border border-[#e1e4e8] rounded-xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.05)] transition-shadow duration-200 ease-in-out hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] flex flex-col h-[600px]">
            <InputSectionHeader
              onClear={() => {
                setInputContent(null)
                setInputContentText('')
                if (fileInputRef.current) {
                  fileInputRef.current.value = '' // <== this actually clears the file input
                }
              }}
            />
            <div className="flex justify-between px-4 py-3 bg-[#f6f8fa] border-b border-[#e1e4e8]">
              <ToggleInputTabs activeTab={activeTab} setActiveTab={setActiveTab} />

              {inputContent && inputContentText && (
                <SendSubmit isLoading={isLoading} handleSubmit={handleSubmit} />
              )}
            </div>
            {activeTab === 'paste' && (
              <div className="py-3 px-5 bg-[#f1f8ff] border-b border-[#e1e4e8] text-[#24292e] text-[14px] flex items-center gap-2">
                <FiCode /> Write or paste your datatype content below
              </div>
            )}
            <div className="flex-1 overflow-auto relative flex flex-col">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                onClick={(e) => (e.target.value = null)}
                className="hidden"
                accept=".xsd"
              />
              {activeTab === 'upload' ? (
                <div
                  className={`p-10 border-2 border-dashed rounded-md m-4 text-center cursor-pointer transition-all duration-200 flex flex-col items-center gap-5 h-full
                ${inputContent ? 'border-green-500 bg-green-50 hover:border-green-600' : 'border-[#e1e4e8] hover:border-[#0366d6] hover:bg-[#f6f8fa]'}`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <FiUploadCloud size={48} color="#586069" />
                  <p>Drop your datatype file here or click to upload</p>
                  {inputContent && inputContentText && <FileLoadedSuccess />}
                </div>
              ) : (
                <Editor
                  height="100%"
                  defaultLanguage="xsd"
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
                outputContent={outputContent}
                filename={filename}
                setFilename={setFilename}
                handleDownload={handleDownload}
              />
            </div>
            <div className="bg-white font-mono text-[12px] leading-[20px] overflow-auto h-full">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
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
                  <span className="sr-only">Loading...</span>
                </div>
              ) : error ? (
                <div className="p-4 text-red-600">{error}</div>
              ) : (
                <Editor
                  height="100%"
                  defaultLanguage="yaml"
                  theme="vs-light"
                  value={outputContent}
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
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default XSDToRAML
