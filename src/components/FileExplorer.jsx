import React, { useState } from 'react'
import FileViewer from './FileViewer' // Adjust path
import JSZip from 'jszip'
import { MdArrowDropDown, MdArrowRight, MdDownload } from 'react-icons/md'
import '../css/fileExplorer.css'

const Parent = () => {
  const [selectedFileContent, setSelectedFileContent] = useState(null)

  const handleFileClick = (fileData) => {
    setSelectedFileContent(fileData)
  }

  const fileStructure = {
    root: {
      folder1: {
        'file1.txt': 'This is the content of file1.txt',
        'file2.js': "console.log('Hello from file2.js');",
      },
      folder2: {
        subfolder1: {
          'file3.xml': '<xml><data>Example XML</data></xml>',
        },
      },
      'file4.json': '{"key": "value"}',
    },
  }

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '300px', borderRight: '1px solid #ccc', padding: '10px' }}>
        <FileExplorer
          fileStructure={fileStructure.root}
          onFileClick={handleFileClick}
          mainFolderName={mainFolderName}
        />
      </div>
      <div style={{ flex: 1, padding: '10px' }}>
        <FileViewer apiResponse={selectedFileContent} />
      </div>
    </div>
  )
}

export default Parent

export const FileExplorer = ({ fileStructure, onFileClick }) => {
  const [expandedFolders, setExpandedFolders] = useState({})
  let FolderName = fileStructure.folderName
  fileStructure = fileStructure.result
  const toggleFolder = (path) => {
    setExpandedFolders({
      ...expandedFolders,
      [path.join('/')]: !expandedFolders[path.join('/')],
    })
  }

  const isFolderExpanded = (path) => {
    return expandedFolders[path.join('/')] || false
  }

  const renderItems = (items, path = []) => {
    return Object.entries(items).map(([name, content]) => {
      const currentPath = [...path, name]
      if (typeof content === 'string') {
        // File
        return (
          <div
            className="fileNames"
            key={currentPath.join('/')}
            style={{
              paddingLeft: `${path.length * 20}px`,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
            onClick={() => onFileClick({ result: content, filename: name })}
          >
            {name}
          </div>
        )
      } else {
        // Folder
        return (
          <div key={currentPath.join('/')}>
            <div
              style={{
                paddingLeft: `${path.length * 20}px`,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
              onClick={() => toggleFolder(currentPath)}
            >
              {isFolderExpanded(currentPath) ? <MdArrowDropDown /> : <MdArrowRight />}
              {name}
            </div>
            {isFolderExpanded(currentPath) && renderItems(content, currentPath)}
          </div>
        )
      }
    })
  }

  const downloadZip = () => {
    const zip = new JSZip()
    const addFilesToZip = (items, path = '') => {
      Object.entries(items).forEach(([name, content]) => {
        const currentPath = path ? `${path}/${name}` : name
        if (typeof content === 'string') {
          zip.file(currentPath, content)
        } else {
          addFilesToZip(content, currentPath)
        }
      })
    }
    addFilesToZip(fileStructure)

    zip.generateAsync({ type: 'blob' }).then((content) => {
      const url = URL.createObjectURL(content)
      const link = document.createElement('a')
      link.href = url
      link.download = FolderName + '.zip'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    })
  }

  return (
    <div className="file-explorer">
      <button
        onClick={downloadZip}
        style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}
      >
        <MdDownload style={{ marginRight: '5px' }} /> Download ZIP
      </button>
      <div>
        {FolderName && (
          <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
            {FolderName} {/* Display mainFolderName */}
          </div>
        )}
        {renderItems(fileStructure)}
      </div>
    </div>
  )
}
