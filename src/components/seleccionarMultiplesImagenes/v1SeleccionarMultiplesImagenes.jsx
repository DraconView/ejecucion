import { useState } from 'react';

function ImageUploader(props) {
  const [images, setImages] = useState([]);

  function handleFileChange(event) {
    const selectedFiles = Array.from(event.target.files);
    setImages(selectedFiles);
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
            <img
              src={URL.createObjectURL(image)}
              alt={image.name}
              style={{ maxWidth: 100 }}
            />
            <span>{image.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageUploader;
