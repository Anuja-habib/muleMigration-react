import React, { useState } from 'react'
import config from '../config/config'
import Dashboard from './dashboard'
import '../css/file-upload.css'
const ZipUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [apiResponse, setApiResponse] = useState(null)
  const [uploadError, setUploadError] = useState(null)

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0])
    setUploadError(null)
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadError('Please select a ZIP file.')
      return
    }

    const formData = new FormData()
    formData.append('file', selectedFile)

    try {
      const response = await fetch(config.apiUrlPython + '/tibcoParser', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const contentType = response.headers.get('content-type')
        let errorMessage = `HTTP error! status: ${response.status}`

        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json()
          errorMessage += `, message: ${JSON.stringify(errorData)}`
        } else {
          const errorText = await response.text()
          errorMessage += `, response: ${errorText}`
        }

        throw new Error(errorMessage)
      }

      const data = await response.json()
      setApiResponse(data)
      setSelectedFile(null)
    } catch (error) {
      setUploadError(error.message || 'Upload failed.')
      console.error('Upload error:', error)
    }
  }

  return (
    <div>
      {!apiResponse && (
        <div className="file-upload-container">
          <div className="file-upload-sub-container">
            <div className="file-upload-input-container file-upload-input-container--zip">
              <input type="file" accept=".zip" onChange={handleFileChange} />
            </div>
            <button onClick={handleUpload} disabled={!selectedFile}>
              Upload ZIP File
            </button>
          </div>
        </div>
      )}
      {apiResponse && (
        <div className="dashboard-position">
          <Dashboard data={apiResponse} />
        </div>
      )}
    </div>
  )
}

export default ZipUploader
