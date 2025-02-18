import { useState, useRef } from 'react';
import styled from 'styled-components';

const FileUploadContainer = styled.div`
;

  padding: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer; /* Make the whole area clickable */
  border-radius: 21px;
  background: #e0e0e0;
  box-shadow:  40px -40px 80px #9b9b9b,
              -40px 40px 80px #ffffff;
`;

const DropZone = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 100%; /* Ensure dropzone takes full width */
  color:rgb(255, 255, 255);
  
`;

const UploadButton = styled.button`
  margin-top: 20px;
  padding: 20px 30px;
  border-radius: 21px;
  background: linear-gradient(145deg,rgb(192, 207, 232),rgb(178, 200, 235));
  box-shadow:  8px 8px 51pxrgb(145, 170, 212),
              -8px -8px 51px #7cbeff;
  color: white;
  cursor: pointer;

  &:hover {
   border-radius: 21px;
  background: linear-gradient(145deg,rgb(142, 174, 225), #669bf3);
  box-shadow:  18px 18px 51pxrgb(176, 196, 231),
              -18px -18px 51px #7cbeff;
  }
`;

const FileInfo = styled.div`
  margin-top: 10px;
  font-size: 14px;
`;

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null); // Ref for the hidden input

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Important to prevent default drag behavior
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append('file', file); // 'file' should match your backend's expected name

    try {
      const response = await fetch('http://127.0.0.1:5000/upload', { // Replace with your upload endpoint
        method: 'POST',
        body: formData,
      });
      console.log("Response ",response.json());

      if (response.ok) {
        alert("File uploaded successfully!");
        setFile(null); // Clear the file after successful upload
        if (fileInputRef.current) {
          fileInputRef.current.value = ''; // Reset the input as well
        }
      } else {
        const errorData = await response.json(); // Try to parse error response
        alert(`Upload failed: ${response.status} - ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      alert("Upload failed: " + error);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click(); // Programmatically trigger the file input
  };

  return (
    <FileUploadContainer onDragOver={handleDragOver} onDrop={handleDrop} onClick={handleClick}>
      <DropZone>
        <p>Drag & drop a file here or click to select</p>
        <input
          type="file"
          ref={fileInputRef} // Assign the ref to the input
          style={{ display: 'none' }} // Hide the input visually
          onChange={handleFileInputChange}
        />
        {file && <FileInfo>Selected file: {file.name}</FileInfo>} {/* Display file info */}
      </DropZone>
      <UploadButton onClick={handleUpload} disabled={!file}>Upload</UploadButton>
    </FileUploadContainer>
  );
};

export default FileUpload;