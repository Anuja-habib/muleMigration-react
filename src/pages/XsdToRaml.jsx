import React, { useState } from 'react';
import FileUpload from '../components/FileUpload';
import FileViewer from '../components/FileViewer';
import { Flex, Item } from '@react-css/flex';
import {SmallBanner} from '../components/Banner'
const XsdToRaml = () => {
    const [originalFileData, setOriginalFileData] = useState(null);
    const [apiResponseData, setApiResponseData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [apiEndpoint, setApiEndpoint] = useState('http://127.0.0.1:5000/xsd-to-raml');
    const [uploadComplete, setUploadComplete] = useState(false); // New state variable
    let info = "Drag & and Drop the XSD here"
    let heading = "Welcome to XSD to RAML Converter"

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
        <div><SmallBanner heading={heading} info={info}/>
        <div className='row'>

            {uploadComplete ? (
                <>
                    <div className='column'>
                        <FileViewer apiResponse={originalFileData} error={error} isLoading={false} />
                    </div>
                    <div className='column'>
                        <FileViewer apiResponse={apiResponseData} error={error} isLoading={isLoading} />
                    </div>
                </>
            ) : (
                <>
                    <div className='col'>
                        <FileUpload onFileUpload={handleFileUpload} />
                    </div>
                
                </>
            )}
        </div>
        </div>
    );
};

export default XsdToRaml;