// App.js
import React, { useState } from 'react';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (selectedFile) {
      // Handle the uploaded file here
      console.log(selectedFile); 
      // You can send the file to a server for processing, 
      // extract information from the JAR file, 
      // or perform other actions.
    }
  };

  return (
    <div className="App">
    <h1>Hello World!</h1>
      <h1>JAR File Uploader</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="file" 
          accept=".jar" 
          onChange={handleFileChange} 
        />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default App;