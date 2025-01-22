import React, { useState } from "react";
import FileUpload from "./components/file-upload/file-upload.component";
import ColorSchemesExample from "./components/nav/nav"

function App() {
  const [newUserInfo, setNewUserInfo] = useState({
    profileImages: []
  });

  const updateUploadedFiles = (files) =>
    setNewUserInfo({ ...newUserInfo, profileImages: files });

  const handleSubmit = (event) => {
    event.preventDefault();
    //logic to create new user...
  };

  return (
  
    
    <div>
      <ColorSchemesExample></ColorSchemesExample>
      <form onSubmit={handleSubmit}>
        <FileUpload
          accept=".jpg,.png,.jpeg,jar"

          multiple
          updateFilesCb={updateUploadedFiles}
        />

      </form>
    </div>
  );
}

export default App;
