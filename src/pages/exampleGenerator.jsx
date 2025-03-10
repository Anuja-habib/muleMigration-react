import React, { useState } from 'react';
import FileViewer from '../components/fileViewer';
import "../css/textPreview.css";
import { SmallBanner } from '../components/Banner';
import config from '../config/config';
import FileUpload from '../components/fileUpload'; // Import FileUpload

function ContentUpload() {
    const [content, setContent] = useState('');
    const [file, setFile] = useState(null);
    const [output, setOutput] = useState('');
    const [loading, setLoading] = useState(false);
    let title = 'RAML Example Generator';
    let subtitle = 'To generate the example, paste your DataType in the text area or upload a DataTypefile. Then click the "Submit" button to generate the example.';

    const handleFileUpload = (uploadedFile, uploadedContent) => {
      
        if (uploadedFile) {
            setFile(uploadedFile);
            setContent(uploadedContent); // Store content from FileUpload
        } else {
            setFile(null);
            setContent(uploadedContent);
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        setOutput('');

        let promptValue = content; // Use the content state directly

        await sendRequest(promptValue);
    };

    const sendRequest = async (promptValue) => {
        try {
            const response = await fetch(config.apiUrlPython + '/generateRamlExample', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: promptValue }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setOutput(data);
        } catch (error) {
            console.error('Error submitting data:', error);
            setOutput('Error processing request.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <SmallBanner title={title} subtitle={subtitle} />
                <FileUpload onFileUpload={handleFileUpload} /> {/* Add FileUpload */}
            <FileViewer apiResponse={output} isLoading={loading} />
        </div>
    );
}

export default ContentUpload;