import React, { useState, useRef, useEffect } from 'react'
import { FiUploadCloud, FiCode } from 'react-icons/fi'

import config from '../config/config'
import Editor from '@monaco-editor/react'

import { JSONToRAMLTexts } from '../seeds/features'

import SendSubmit from '../components/HeroPages/SendSubmit'
import HeroBanner from '../components/HeroPages/HeroBanner'
import ToggleTabs from '../components/HeroPages/ToggleTabs'
import ToggleInputTabs from '../components/HeroPages/ToggleInputTabs'
import InputSectionHeader from '../components/HeroPages/InputSectionHeader'
import FileLoadedSuccess from '../components/HeroPages/FileLoadedSuccess'
import PasteInputText from '../components/HeroPages/PasteInputText'
import ToggleOutputText from '../components/HeroPages/ToggleOutputText'
import OutputActions from '../components/HeroPages/OutputActions'

const JSONToRAML = () => {
  const [inputContent, setInputContent] = useState()
  const [outputContent, setOutputContent] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('upload')
  const [inputContentText, setInputContentText] = useState()
  const [isRequired, setIsRequired] = useState(false)
  const [filename, setFilename] = useState(`example-${(+new Date()).toString(36)}`)
  const [viewTab, setViewTab] = useState('input')

  const fileInputRef = React.useRef(null)
  const editorRef = useRef(null)

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
    convertToRaml(inputContentText)
  }

  const convertToRaml = async (content) => {
    setIsLoading(true)
    setError(null)

    console.log({
      required: isRequired,
      payload: content,
    })

    try {
      const response = await fetch(config.apiUrlPython + '/json-to-raml', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          required: isRequired,
          payload: JSON.parse(content),
        }),
      })

      if (!response.ok) {
        throw new Error('Conversion failed')
      }

      const data = await response.text()
      setOutputContent(data)
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
        title={JSONToRAMLTexts.title}
        subtitle={JSONToRAMLTexts.subtitle}
        features={JSONToRAMLTexts.features}
      />

      <ToggleTabs activeTab={viewTab} setActiveTab={setViewTab} />

      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        {viewTab === 'input' && (
          <div className="w-full bg-white border border-[#e1e4e8] rounded-xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.05)] transition-shadow duration-200 ease-in-out hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] flex flex-col h-[600px]">
            <InputSectionHeader
              onClear={() => {
                setInputContent(null)
                setInputContentText('')
              }}
            />

            <div className="flex justify-between px-4 py-3 bg-[#f6f8fa] border-b border-[#e1e4e8]">
              <ToggleInputTabs activeTab={activeTab} setActiveTab={setActiveTab} />
              {inputContent && <SendSubmit isLoading={isLoading} handleSubmit={handleSubmit} />}
            </div>

            <div className="px-4 py-2 bg-[#f6f8fa] border-b border-[#e1e4e8] flex items-center gap-2">
              <input
                id="requiredFlag"
                type="checkbox"
                checked={isRequired}
                onChange={(e) => setIsRequired(e.target.checked)}
                className="accent-[#4a46cc] w-4 h-4"
              />
              <label htmlFor="requiredFlag" className="text-sm text-[#586069]">
                Mark all fields as required
              </label>
            </div>

            {activeTab === 'paste' && (
              <div className="py-3 px-5 bg-[#f1f8ff] border-b border-[#e1e4e8] text-[#24292e] text-[14px] flex items-center gap-2">
                <FiCode /> Write or paste your JSON content below
              </div>
            )}
            <div className="flex-1 overflow-auto relative flex flex-col">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                onClick={(e) => (e.target.value = null)}
                className="hidden"
                accept=".json"
              />
              {activeTab === 'upload' ? (
                <div
                  className={`p-10 border-2 border-dashed rounded-md m-4 text-center cursor-pointer transition-all duration-200 flex flex-col items-center gap-5 h-full
                ${inputContent ? 'border-green-500 bg-green-50 hover:border-green-600' : 'border-[#e1e4e8] hover:border-[#0366d6] hover:bg-[#f6f8fa]'}`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <FiUploadCloud size={48} color="#586069" />
                  <p>Drop your JSON file here or click to upload</p>
                  {(inputContent || inputContentText) && <FileLoadedSuccess />}
                </div>
              ) : (
                <Editor
                  height="100%"
                  defaultLanguage="json"
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

            <div className="flex flex-grow overflow-hidden font-mono text-[12px] leading-[20px]">
              {isLoading ? (
                <OutputLoader />
              ) : error ? (
                <div className="p-4 text-red-600">{error}</div>
              ) : (
                <div className="flex flex-grow overflow-hidden w-full">
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
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default JSONToRAML
