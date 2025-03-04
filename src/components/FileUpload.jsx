import React, { useState, useRef } from 'react';

const FileUpload = ({ onFileUpload }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);
    const [uploadStatus, setUploadStatus] = useState(null);
    const [fileMetadata, setFileMetadata] = useState(null);

    const handleFileChange = (event) => {
      console.log("Start 1"+ event)
      const file = event.target.files[0];
      console.log("Start 2"+ file)
      setSelectedFile(file);
      setUploadStatus(null);
    
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
  
        setUploadStatus('uploading ');
        
  
        const reader = new FileReader();
       
        reader.onload = (event) => {
          fetch('http://127.0.0.1:5004/upload', {
            method: 'POST',
            body: formData,
          })
          .then(response => {
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              return response.json();
            })
          .then(data => {
              console.log("Start 3"+ data['result'])
              console.log("Start filename "+ data['filename'])
              setFileMetadata(data['filename']);
              setUploadStatus('success');
              onFileUpload(data, event.target.result  )
            })
          .catch(error => {
              console.error('File upload failed:', error);
              setUploadStatus('error');
              onFileUpload(null, error);
            });
        };
  
        reader.readAsText(file); // Or readAsDataURL for images/binary files
      }
    };

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleClear = () => {
        setSelectedFile(null);
        setUploadStatus(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <div style={{ flex: 1, padding: '20px', borderRight: '1px solid #ccc', display: 'flex', flexDirection: 'column' }}>
                <div style={{ border: '1px dashed #ccc', borderRadius: '5px', padding: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '200px' }} onClick={handleUploadClick}>
                    <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
                    <p>Drag & drop file or click to browse</p>
                </div>
              
                {selectedFile && (
                    <div style={{ marginTop: '10px' }}>
                        <p>Selected File: {selectedFile.name}</p>
                        <button onClick={handleClear}>Clear</button>
                        {uploadStatus && (
                            <p>Upload Status: {uploadStatus === 'uploading'? 'Uploading...': uploadStatus === 'success'? 'Success!': uploadStatus === 'error'? 'Error': ''}</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FileUpload;