import React, { useState } from 'react';
import FileUpload from '../components/FileUpload';
// import FileViewer from '../components/FileViewer';
import { Flex, Item } from '@react-css/flex';
import {SmallBanner} from '../components/Banner'
import config from '../config/config';
const XsdToRaml = () => {
    let title = 'XSD to RAML Converter';
    let subtitle = 'To use the tool, simply upload your XSD file and click the "Convert" button. The tool will then generate a RAML file that you can download and use to create APIs.';
    const [originalFileData, setOriginalFileData] = useState(null);
    const [apiResponseData, setApiResponseData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [apiEndpoint, setApiEndpoint] = useState(config.apiUrlPython+ '/xsd-to-raml');
    const [uploadComplete, setUploadComplete] = useState(false); // New state variable

    const handleFileUpload = (file, fileContent) => {
        setOriginalFileData({ result: fileContent, filename: file.name });
        setApiResponseData(null);
        setIsLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('file', file);

        fetch(apiEndpoint, {
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
            setApiResponseData(data);
            setIsLoading(false);
            setUploadComplete(true); // Set uploadComplete to true
        })
        .catch(err => {
            setError(err);
            setIsLoading(false);
            setUploadComplete(false); // ensure it is false in error case
        });
    };

    return (
        <div className='row'>
             <SmallBanner title={title} subtitle={subtitle}/>
            {uploadComplete ? (
                <>
                    <div className='column'>
                        {/* <FileViewer apiResponse={originalFileData} error={error} isLoading={false} /> */}
                    </div>
                    <div className='column'>
                        {/* <FileViewer apiResponse={apiResponseData} error={error} isLoading={isLoading} /> */}
                    </div>
                </>
            ) : (
                <>
                    <div className='c'>
                        <FileUpload onFileUpload={handleFileUpload} />
                    </div>
                    
                </>
            )}
        </div>
    );
};

export default XsdToRaml;