import axios from "axios"
import './App.css'
import UploadImage from './UploadImage'
import { useState } from "react"
import CopyImage from "./CopyImage"
axios.defaults.baseURL = "https://image-uploader-api-j85r.onrender.com"

function App() {
  const [uploaded, setUploaded] = useState(false)
  const [photos, setPhotos] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragEnter = e => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = e => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDragOver = e => {
    e.preventDefault();
  };

  const handleDrop = e => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleInputChange = e => {
    const files = e.target.files;
    handleFiles(files);
  };

  const handleFiles = files => {
    const data = new FormData()
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    console.log(data)
    axios.post('/uploads', data, { headers: { "Content-type": "multipart/form-data" } })
      .then(res => {
        setPhotos(res.data);
        setUploaded(true)
      })
      .catch(e => console.log(e))
  };


  if (uploaded) {
    return <CopyImage photos={photos} />
  }


  return (
    <>
      <div className='main'>
        <div className={`container dropzone ${isDragOver ? 'drag-over' : ''}`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <UploadImage />
          <input className='file-input' onChange={handleInputChange} type="file" multiple />
          <button className='upload-btn' onClick={() => document.querySelector(".file-input").click()}>
            select files
          </button>

        </div>
      </div>
    </>
  )
}

export default App
