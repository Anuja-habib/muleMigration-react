import React, { useState, useRef } from 'react';

const FileUploadPreview = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewContent, setPreviewContent] = useState(null);
    const fileInputRef = useRef(null);
    const [uploadStatus, setUploadStatus] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setPreviewContent(null);
        setUploadStatus(null);

        if (file) {
          const reader = new FileReader();

          reader.onloadend = () => {
              try {
                const formData = new FormData();
                formData.append('file', file);
    
                setUploadStatus('uploading');
    
                fetch('http://127.0.0.1:5000/upload', { // Replace with your API endpoint
                    method: 'POST',
                    body: formData,
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }
                        console.log(response.json());
                        return response.json();
                        
                    })
                    .then(data => {
                        console.log('File uploaded successfully:', data);
                        setUploadStatus('success');
                    })
                    .catch(error => {
                        console.error('File upload failed:', error);
                        setUploadStatus('error');
                    });

                  if (file.type.startsWith('image/')) {
                      setPreviewContent(<img src={reader.response} alt={file.name} style={{ maxWidth: '100%', maxHeight: '400px' }} />);
                  } else if (file.type.startsWith('video/')) {
                      setPreviewContent(
                          <video controls width="100%" height="400px">
                              <source src={reader.result} type={file.type} />
                              Your browser does not support the video tag.
                          </video>
                      );
                  } else if (file.type === 'application/pdf') {
                      setPreviewContent(
                          <iframe src={reader.result} title={file.name} width="100%" height="400px" />);
                  } else if (file.type.startsWith('text/') || file.type.includes('json') || file.type.includes('xml') || file.name.endsWith('.wsdl') || file.name.endsWith('.raml')) {
                      setPreviewContent(<pre>{reader.response}</pre>);
                  } else {
                      // For other file types, attempt to display as text or provide a generic message
                      reader.readAsText(file); // Try reading as text first
                      reader.onloadend = () => {  // Set a new onloadend handler after reading as text
                          setPreviewContent(<pre>{reader.result}</pre>); // Display as text even if type is not recognized
                      };
                      reader.onerror = () => { // If reading as text fails, show a message
                          setPreviewContent(<p>Preview not available for this file type: {file.type || 'Unknown'}</p>);
                      };
                  }
              } catch (error) {
                  setPreviewContent(<p>Error previewing file: {error.message}</p>);
              }
          };

          if (file.type.startsWith('image/') || file.type.startsWith('video/') || file.type === 'application/pdf') {
              reader.readAsDataURL(file);
          } else {
              reader.readAsText(file); // Read as text for other types
          }


           
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleClear = () => {
        setSelectedFile(null);
        setPreviewContent(null);
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
                            <p>Upload Status: {uploadStatus === 'uploading' ? 'Uploading...' : uploadStatus === 'success' ? 'Success!' : uploadStatus === 'error' ? 'Error' : ''}</p>
                        )}
                    </div>
                )}
            </div>

            <div style={{ flex: 1, padding: '10px', justifyContent: 'center', alignItems: 'center', overflow: 'auto'  }}> {/* Added overflow */}
                {previewContent}
                {!selectedFile && <p>No file selected.</p>}
            </div>
        </div>
    );
};

export default FileUploadPreview;