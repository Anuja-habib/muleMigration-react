import React, { useState } from 'react';
import './/file-upload.component.css';

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadSuccessful, setUploadSuccessful] = useState(false); 
  const [uploadError, setUploadError] = useState(null);   
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setUploadSuccessful(false); // Reset success message on new file selection
    setUploadError(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('event',selectedFile)
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      console.log('event',selectedFile)
      try {
        const response = await fetch('/upload', { 
          method: 'POST', 
          body: formData 
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
      console.log('File uploaded successfully:', data);
      setSelectedFile(null); // Clear the selected file from state
      event.target.reset();   // Clear the file input field
      setUploadSuccessful(true); // Set the success message
      setUploadError(null);       // Clear any previous error
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadError(error.message); // Set the error message for display
      setUploadSuccessful(false);  
      }
    }
  };

  return (
    <div className='file-upload-container'>
      <div className="upload-card">
      <div className="cloud-icon">
      <label className='drag-drop-text'> Drag the file here</label>
    <form onSubmit={handleSubmit}>
      <input 
        label ="Drag or select the file"
        type="file" 
        onChange={handleFileChange} 
      />
      <button className='select-files-button' type="submit">Upload</button>
    </form>
    </div>
    </div>
    </div>
    
  );
}

export default FileUpload;