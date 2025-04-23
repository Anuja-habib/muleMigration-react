import React, { useState } from 'react'
import styled from 'styled-components'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import {
  FiUploadCloud,
  FiCopy,
  FiDownload,
  FiCode,
  FiEdit,
  FiCheckCircle,
  FiAlertCircle,
} from 'react-icons/fi'
import { MdContentPaste } from 'react-icons/md'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import config from '../config/config'
import Editor from '@monaco-editor/react'

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
`

const DescriptionSection = styled.div`
  background: linear-gradient(135deg, #4a46cc, #0b1b42);
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 32px;
  color: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`

const Title = styled.h1`
  margin: 0 0 16px 0;
  font-size: 32px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 12px;
  letter-spacing: -0.5px;

  svg {
    font-size: 36px;
  }
`

const Description = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 24px;
`

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 24px;
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }

  h3 {
    font-size: 18px;
    margin: 0 0 12px 0;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  p {
    margin: 0;
    font-size: 14px;
    opacity: 0.9;
    line-height: 1.6;
  }
`

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-top: 24px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`

const EditorPanel = styled.div`
  background: white;
  border: 1px solid #e1e4e8;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s ease;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 600px;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }
`

const EditorContent = styled.div`
  flex: 1;
  overflow: auto;
  position: relative;
  display: flex;
  flex-direction: column;
`

const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: #f8f9fa;
  border-bottom: 1px solid #e1e4e8;
`

const PanelTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #24292e;
  display: flex;
  align-items: center;
  gap: 8px;
`

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: ${(props) => (props.error ? '#cb2431' : '#28a745')};
  margin-left: 12px;

  svg {
    font-size: 14px;
  }
`

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`

const IconButton = styled.button`
  display: flex;
  align-items: center;
  padding: 6px 12px;
  border: 1px solid #e1e4e8;
  border-radius: 6px;
  background: white;
  color: #586069;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f3f4f6;
    border-color: #bbb;
    color: #24292e;
  }

  &:active {
    background: #e1e4e8;
  }

  svg {
    margin-right: 6px;
  }
`

const UploadArea = styled.div`
  padding: 40px;
  border: 2px dashed #e1e4e8;
  border-radius: 6px;
  margin: 16px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  padding: 40px;
  border: 2px dashed #e1e4e8;
  border-radius: 6px;
  margin: 16px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  height: 100%;

  &:hover {
    border-color: #0366d6;
    background: #f6f8fa;
  }
`

const TextArea = styled.textarea`
  width: 100%;
  flex: 1;
  padding: 16px;
  border: none;
  resize: none;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  font-size: 14px;
  line-height: 1.5;
  color: #24292e;
  background: #fafbfc;

  &:focus {
    outline: none;
    background: white;
  }
`

const ConvertButton = styled(IconButton)`
  background: #4a46cc;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 15px;
  font-weight: 600;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(74, 70, 204, 0.2);
  position: relative;
  overflow: hidden;
  min-width: 160px;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  &:hover {
    background: #3f3bb3;
    color: white;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(74, 70, 204, 0.3);

    &:before {
      opacity: 1;
    }
  }

  &:active {
    background: #353299;
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(74, 70, 204, 0.2);
  }

  svg {
    font-size: 18px;
    margin-right: 8px;
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`

const CodeViewer = styled.div`
  background: white;
  font-family:
    ui-monospace,
    SFMono-Regular,
    SF Mono,
    Menlo,
    Consolas,
    Liberation Mono,
    monospace;
  font-size: 12px;
  line-height: 20px;
  overflow: auto;
  height: 100%;
`

const CodeContainer = styled.div`
  display: table;
  width: 100%;
  padding: 0;
  margin: 0;
  border-spacing: 0;
`

const CodeLine = styled.div`
  display: table-row;
  background: ${(props) => (props.highlighted ? '#f6f8fa' : 'transparent')};

  &:hover {
    background: #f6f8fa;
  }
`

const LineNumber = styled.div`
  display: table-cell;
  padding: 0 10px;
  width: 50px;
  min-width: 50px;
  color: #6e7781;
  text-align: right;
  user-select: none;
  border-right: 1px solid #d0d7de;
  background: #f6f8fa;
`

const LineContent = styled.div`
  display: table-cell;
  padding: 0 10px;
  white-space: pre;
  color: #24292f;
`

const LoadingSpinner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;
  color: #586069;
`

const TabContainer = styled.div`
  display: flex;
  padding: 12px 16px;
  background: #f6f8fa;
  border-bottom: 1px solid #e1e4e8;
`

const TabGroup = styled.div`
  display: flex;
  background: #edf0f3;
  padding: 4px;
  border-radius: 30px;
`

const Tab = styled.button`
  padding: 8px 16px;
  background: ${(props) => (props.active ? '#4a46cc' : 'transparent')};
  border: none;
  border-radius: 20px;
  color: ${(props) => (props.active ? 'white' : '#586069')};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
  min-width: 130px;
  justify-content: center;

  &:hover {
    background: ${(props) => (props.active ? '#4a46cc' : '#e1e4e8')};
    color: ${(props) => (props.active ? 'white' : '#24292e')};
  }

  svg {
    font-size: 16px;
  }
`

const InputActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: #f8f9fa;
  border-top: 1px solid #e1e4e8;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  backdrop-filter: blur(8px);
`

const ConversionStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #6a737d;
  font-size: 14px;

  svg {
    color: #4a46cc;
    font-size: 16px;
  }
`

const ConversionTip = styled.div`
  padding: 12px 20px;
  background: #f1f8ff;
  border-bottom: 1px solid #e1e4e8;
  color: #24292e;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    color: #0366d6;
    font-size: 16px;
  }
`

const XsdToRaml = () => {
  const [inputContent, setInputContent] = useState('')
  const [outputContent, setOutputContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState('upload')
  const fileInputRef = React.useRef(null)

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setInputContent(e.target.result)
        convertToRaml(e.target.result)
      }
      reader.readAsText(file)
    }
  }

  const convertToRaml = async (content) => {
    setIsLoading(true)
    setError(null)

    const formData = new FormData()
    formData.append('file', new Blob([content], { type: 'text/xml' }), 'input.xsd')

    try {
      const response = await fetch(config.apiUrlPython + '/xsd-to-raml', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Conversion failed')
      }

      const data = await response.json()
      setOutputContent(data.result)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = (content, filename) => {
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleCopy = (content) => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const renderCodeWithLineNumbers = (content) => {
    if (!content) return null
    const lines = content.split('\n')

    return (
      <CodeContainer>
        {lines.map((line, index) => (
          <CodeLine key={index} highlighted={index % 2 === 0}>
            <LineNumber>{index + 1}</LineNumber>
            <LineContent>{line}</LineContent>
          </CodeLine>
        ))}
      </CodeContainer>
    )
  }

  return (
    <PageContainer>
      <DescriptionSection>
        <Title>
          <FiCode /> XSD to RAML Converter
        </Title>
        <p>
          Transform your XML Schema Definitions into RAML specifications with our powerful
          converter.
        </p>

        <Description>
          <FeatureCard>
            <h3>
              <FiUploadCloud /> Easy Upload
            </h3>
            <p>
              Drag and drop your XSD files or paste content directly. Supports single and multiple
              schema files with automatic validation.
            </p>
          </FeatureCard>

          <FeatureCard>
            <h3>
              <FiCode /> Smart Conversion
            </h3>
            <p>
              Automatically converts complex XSD structures into clean, well-formatted RAML types
              with intelligent type mapping and examples.
            </p>
          </FeatureCard>

          <FeatureCard>
            <h3>
              <FiDownload /> Instant Export
            </h3>
            <p>
              Download your converted RAML instantly or copy to clipboard. Includes syntax
              highlighting and validation for perfect API specifications.
            </p>
          </FeatureCard>
        </Description>
      </DescriptionSection>

      <ContentContainer>
        <EditorPanel>
          <PanelHeader>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <PanelTitle>
                <FiCode /> Input XSD
              </PanelTitle>
            </div>
            <ActionButtons>
              <IconButton onClick={() => setInputContent('')}>
                <MdContentPaste /> Clear
              </IconButton>
            </ActionButtons>
          </PanelHeader>
          <TabContainer>
            <TabGroup>
              <Tab active={activeTab === 'upload'} onClick={() => setActiveTab('upload')}>
                <FiUploadCloud /> Upload File
              </Tab>
              <Tab active={activeTab === 'paste'} onClick={() => setActiveTab('paste')}>
                <FiEdit /> Write/Paste
              </Tab>
            </TabGroup>
          </TabContainer>
          {activeTab === 'paste' && (
            <ConversionTip>
              <FiCode /> Write or paste your XSD content below and click Convert to generate RAML
            </ConversionTip>
          )}
          <EditorContent>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              style={{ display: 'none' }}
              accept=".xsd"
            />
            {activeTab === 'upload' ? (
              <UploadArea onClick={() => fileInputRef.current?.click()}>
                <FiUploadCloud size={48} color="#586069" />
                <p>Drop your XSD file here or click to upload</p>
              </UploadArea>
            ) : (
              // <TextArea
              //   value={inputContent}
              //   onChange={(e) => setInputContent(e.target.value)}
              //   placeholder="Write or paste your XSD content here..."
              // />
              // <div className="w-full h-full rounded-2xl overflow-hidden">
              <Editor
                height="100%"
                defaultLanguage="yaml"
                theme="vs-light"
                // value={JSON.stringify(output, null, 4)}
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
              // </div>
            )}
          </EditorContent>
          {activeTab === 'paste' && (
            <InputActions>
              <ConversionStatus>
                {inputContent ? (
                  <>
                    <FiCheckCircle />
                    Ready to convert
                  </>
                ) : (
                  <>
                    <FiEdit />
                    Start writing or paste your XSD content
                  </>
                )}
              </ConversionStatus>
              {inputContent && (
                <ConvertButton onClick={() => convertToRaml(inputContent)}>
                  <FiCode /> Convert to RAML
                </ConvertButton>
              )}
            </InputActions>
          )}
        </EditorPanel>

        <EditorPanel>
          <PanelHeader>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <PanelTitle>
                <FiCode /> Output RAML
              </PanelTitle>
              {error ? (
                <StatusIndicator error>
                  <FiAlertCircle /> Conversion failed
                </StatusIndicator>
              ) : (
                outputContent && (
                  <StatusIndicator>
                    <FiCheckCircle /> Conversion successful
                  </StatusIndicator>
                )
              )}
            </div>
            <ActionButtons>
              <CopyToClipboard text={outputContent} onCopy={handleCopy}>
                <IconButton>
                  <FiCopy /> {copied ? 'Copied!' : 'Copy'}
                </IconButton>
              </CopyToClipboard>
              <IconButton onClick={() => handleDownload(outputContent, 'converted.raml')}>
                <FiDownload /> Download
              </IconButton>
            </ActionButtons>
          </PanelHeader>
          <CodeViewer>
            {isLoading ? (
              <LoadingSpinner>Converting...</LoadingSpinner>
            ) : error ? (
              <div style={{ padding: '16px', color: '#cb2431' }}>{error}</div>
            ) : (
              <Editor
                height="100%"
                defaultLanguage="yaml"
                theme="vs-light"
                // value={JSON.stringify(output, null, 4)}
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
          </CodeViewer>
        </EditorPanel>
      </ContentContainer>
    </PageContainer>
  )
}

export default XsdToRaml
