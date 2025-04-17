import React, { useState } from 'react';
import FileViewer from '../components/FileViewer';
import "../css/textPreview.css";
import { SmallBanner } from '../components/Banner';
import config from '../config/config';
import FileUpload from '../components/FileUpload'; // Import FileUpload

function ContentUpload() {
    const [apiEndpoint, setApiEndpoint] = useState(config.apiUrlPython+ '/xsd-to-raml');
    const [content, setContent] = useState('');
    const [file, setFile] = useState(null);
    const [output, setOutput] = useState('');
    const [loading, setLoading] = useState(false);
    let title = 'RAML Example Generator';
    let subtitle = 'To generate the example, paste your DataType in the text area or upload a DataTypefile. Then click the "Submit" button to generate the example.';

    const handleFileUpload = async (uploadedFile, uploadedContent) => {
      setLoading(true);
      setOutput('');

      let promptValue = uploadedContent;

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
          {output && <FileViewer apiResponse={output} isLoading={loading} />}
          {!output &&<FileUpload onFileUpload={handleFileUpload} />}
         
      </div>
  );
}

export default ContentUpload;