import React, { useState, useRef } from 'react';
import '../css/file-upload.css';
import Switch from "react-switch";
import { Oval } from 'react-loader-spinner'; // Import the loading spinner

const FileUpload = ({ onFileUpload }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);
    const [uploadStatus, setUploadStatus] = useState(null);
    const [isTextMode, setIsTextMode] = useState(false);
    const [textAreaContent, setTextAreaContent] = useState('');
    const [border, setBorder] = useState('#1c2764 2px dashed');
    const [isLoading, setIsLoading] = useState(false); // Add loading state

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setUploadStatus(null);
    };

    const handleUploadClick = () => {
        if (!isTextMode) {
            fileInputRef.current.click();
        }
    };

    const changeLayout = () => {
        setIsTextMode(!isTextMode);
        if (isTextMode) {
            setBorder('#1c2764 2px dashed');
        } else {
            setBorder('none');
        }
    };

    const handleUploadButtonClick = () => {
        setIsLoading(true); // Start loading
        console.log('Upload started, isLoading:', isLoading);
        setUploadStatus('uploading');

        if (isTextMode) {
            setBorder('none');
            onFileUpload(
                new File([textAreaContent], 'pasted_content.txt', {
                    type: 'text/plain',
                }),
                textAreaContent
            );
            setUploadStatus('success');
            setTextAreaContent('');
            setIsLoading(false); 
            console.log('Upload finished, isLoading:', isLoading);
        } else if (selectedFile) {
            const reader = new FileReader();

            reader.onload = (event) => {
                onFileUpload(selectedFile, event.target.result);
                setUploadStatus('success');
                setIsLoading(false);
            };

            reader.onerror = () => {
                setUploadStatus('error');
                setIsLoading(false); 
            };

            reader.readAsText(selectedFile);
        } else {
            setUploadStatus('error');
            setIsLoading(false); 
        }
        setSelectedFile(null);
    };

    const handleClear = () => {
        setSelectedFile(null);
        setUploadStatus(null);
        setTextAreaContent('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleTextAreaChange = (event) => {
        setTextAreaContent(event.target.value);
    };

    return (
        <div className="file-upload-container">
             {isLoading && <Oval className="loading-icon" color="#1c2764" height={20} width={20} />}
            <div className="file-upload-sub-container">
                <div className="file-upload-input-container" style={{ border: border }} onClick={handleUploadClick}>
                    {isTextMode ? (
                        <textarea
                            value={textAreaContent}
                            onChange={handleTextAreaChange}
                            placeholder="Paste content here..."
                            rows={5}
                            cols={50}
                            style={{ width: '100%', height: '100px' }}
                        />
                    ) : (
                        <>
                            <input
                                className="file-upload-input"
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                            />
                            {!selectedFile && <p>Drag & drop file or click to browse</p>}
                            {selectedFile && (
                                <div style={{ marginTop: '10px', fontSize: '20px' }}>
                                    <p>Selected File: {selectedFile.name}</p>
                                    {uploadStatus && (
                                        <p>
                                            Upload Status:{' '}
                                            {uploadStatus === 'uploading'
                                                ? 'Uploading...'
                                                : uploadStatus === 'success'
                                                ? 'Success!'
                                                : uploadStatus === 'error'
                                                ? 'Error'
                                                : ''}
                                        </p>
                                    )}
                                </div>
                            )}
                        </>
                    )}
                </div>
                <div>
                    <button onClick={handleUploadButtonClick}>Upload</button>
                    {selectedFile || isTextMode ? <button onClick={handleClear}>Clear</button> : null}
                    <div className="toggle-div">
                        <Switch
                            className="toggle"
                            onChange={() => changeLayout()}
                            checked={isTextMode}
                            disabled={false}
                            offColor={'#273275'}
                            onColor={'#273275'}
                        />
                        Paste Content
                       
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FileUpload;