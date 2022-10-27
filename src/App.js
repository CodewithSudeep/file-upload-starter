import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

const App = () => {

  const [file, setfile] = useState(null)
  
  const onFormSubmit = (e) => {
      e.preventDefault();
      alert("jjj")
      const formData = new FormData();
      formData.append('myfile',file);
      const config = {
          headers: {
              'content-type': 'multipart/form-data'
          }
      };
      axios.post("http://localhost:5000/fileupload",formData,config)
          .then((response) => {
              alert("The file is successfully uploaded");
          }).catch((error) => {
      });
  }

  const onChange = (e) => {
      setfile(e.target.files);
  }

      return (
          <form onSubmit={(e)=>onFormSubmit(e)}>
              <h1>File Upload</h1>
              <input type="file" className="file-input" name="myImage" onChange= {()=>onChange} />
              <button className="upload-button" type="submit">Upload</button>
          </form>
      )
  
}

export default App;