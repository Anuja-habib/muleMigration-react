import React, { useState } from 'react';
import TibcoFileUploader from '../components/tibcoFileParser'; // Assuming FileUploader.js is in the same directory
import FileViewer from '../components/fileViewer'; // Assuming FileViewer.js is in the same directory

import {SmallBanner} from '../components/Banner'
const TibcoConverter = () => {
  let info = "Drag & and Drop the Tibco Zip here"
  let heading = "Welcome to Tibco to RAML Converter"  
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
    <div><SmallBanner heading={heading} info={info}/>
    <div>
      <TibcoFileUploader
        onUploadSuccess={handleUploadSuccess}
        onUploadFailure={handleUploadFailure}
        onUploadStart={handleUploadStart}
      />
      {uploadError && <p style={{ color: 'red' }}>{uploadError}</p>}
      <FileViewer apiResponse={apiResponse} error={uploadError} isLoading={isLoading} />
    </div>
    </div>
  );
};

export default TibcoConverter;