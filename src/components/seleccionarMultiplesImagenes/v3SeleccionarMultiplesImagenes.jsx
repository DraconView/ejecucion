import { useState, useRef } from 'react';
import Cropper from "react-cropper";
import "react-cropper/dist/cropper.css";

function ImageUploader(props) {
  const [images, setImages] = useState([]);
  const cropperRef = useRef();

  function handleFileChange(event) {
    const selectedFiles = Array.from(event.target.files);
    setImages(selectedFiles);
  }

  function handleCrop(index) {
    // Aquí puedes agregar la lógica para recortar la imagen en un tamaño 1x1
    const cropper = cropperRef.current;
    const canvas = cropper.getCroppedCanvas({ width: 1, height: 1 });
    const croppedImage = canvas.toDataURL();
    //console.log(`Cropping image ${index}...`);
    //console.log(croppedImage);
  }

  return (
    <div>
      <h1>Image Uploader</h1>
      <label htmlFor="image-input">Select images:</label>
      <input
        id="image-input"
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        style={{ display: 'flex' }}
      />
      <div>
        {images.map((image, index) => (
          <div key={index}>
            <Cropper
              ref={cropperRef}
              src={URL.createObjectURL(image)}
              style={{ height: 200, width: '100%' }}
              aspectRatio={1}
            />
            <button onClick={() => handleCrop(index)}>Crop</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageUploader;
