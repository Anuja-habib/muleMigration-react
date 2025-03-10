import React, { useState } from 'react';
import config from '../config/config';
const ZipUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [apiResponse, setApiResponse] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setUploadError(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadError('Please select a ZIP file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch(config.apiUrlPython + '/tibcoParser', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        let errorMessage = `HTTP error! status: ${response.status}`;

        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          errorMessage += `, message: ${JSON.stringify(errorData)}`;
        } else {
          const errorText = await response.text();
          errorMessage += `, response: ${errorText}`;
        }

        throw new Error(errorMessage);
      }

      const data = await response.json();
      setApiResponse(data);
      setSelectedFile(null);
    } catch (error) {
      setUploadError(error.message || 'Upload failed.');
      console.error('Upload error:', error);
    }
  };

  return (
    <div>
      <input type="file" accept=".zip" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!selectedFile}>
        Upload ZIP File
      </button>

      {apiResponse && (
        <div>
          <h2>API Response:</h2>
          <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ZipUploader;