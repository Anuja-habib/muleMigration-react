import React, { useState } from 'react';
import InputComponent from '../components/promptInput';
import FileViewer from '../components/fileViewer';
import {SmallBanner} from '../components/Banner'
const Generate = () => {
  const [apiData, setApiData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
let info = "Enter the prompt to generate the file"
let heading = "Welcome to Raml Generator"
  const handlePromptSubmit = (data, err) => {
    if (data === true) {
      // Loading started
      setIsLoading(true);
      setApiData(null);
      setError(null);
    } else if (err) {
      // Error occurred
      setIsLoading(false);
      setError(err);
    } else {
      // Data received
      setIsLoading(false);
      setApiData(data);
    }
  };

  return (
    <div>
      <SmallBanner heading={heading} info={info}/>
      <div>
      <InputComponent onPromptSubmit={handlePromptSubmit} />
      <FileViewer apiResponse={apiData} error={error} isLoading={isLoading}/>
    </div>
    </div>
  );
};

export default Generate;