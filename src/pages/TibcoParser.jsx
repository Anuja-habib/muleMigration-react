import React, { useState } from 'react';
import TibcoFileUploader from '../components/tibcoFileParser'; // Assuming FileUploader.js is in the same directory
import FileViewer from '../components/fileViewer'; // Assuming FileViewer.js is in the same directory

const TibcoConverter = () => {
  const [apiResponse, setApiResponse] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleUploadSuccess = (data) => {
    setApiResponse(data);
    setUploadError(null);
    setIsLoading(false);
  };

  const handleUploadFailure = (error) => {
    setUploadError(error.message || 'Upload failed.');
    setApiResponse(null);
    setIsLoading(false);
  };

  const handleUploadStart = () => {
    setIsLoading(true);
  };

  return (
    <div>
      <TibcoFileUploader
        onUploadSuccess={handleUploadSuccess}
        onUploadFailure={handleUploadFailure}
        onUploadStart={handleUploadStart}
      />
      {uploadError && <p style={{ color: 'red' }}>{uploadError}</p>}
     
    </div>
  );
};

export default TibcoConverter;