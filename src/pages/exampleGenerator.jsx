import React, { useState } from 'react';
import FileViewer from '../components/fileViewer';
import "../css/textPreview.css"
import {SmallBanner} from '../components/Banner'
function ContentUpload() {
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  
  let info = "Paste the DataType to generate the Example file"
  let heading = "Welcome to Raml Example Generator"
  const handleContentChange = (e) => {
    setContent(e.target.value);
    
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setOutput('');

    let promptValue = '';

    if (file) {
        
      const reader = new FileReader();
      reader.onload = async (event) => {
        promptValue = event.target.result;
        await sendRequest(promptValue);
      };
      reader.readAsText(file);
    } else {
      await sendRequest(content);
    }
  };

  const sendRequest = async (promptValue) => {
    try {
      const response = await fetch('http://127.0.0.1:5005/generateRamlExample', {
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
      <SmallBanner heading={heading} info={info}/>
        <div className='input-container'>
      <div>
        <textarea 
          value={content}
          onChange={handleContentChange}
          placeholder="Paste content here..."
          rows={5}
          cols={50}
        />
      </div>

      <div>
        <input type="file" onChange={handleFileChange} />
      </div>

      <button type="submit" onClick={handleSubmit} disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>
      </div>
      <FileViewer apiResponse={output} isLoading={loading}/>
    </div>
  );
}


export default ContentUpload;