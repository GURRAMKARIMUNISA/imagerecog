import React, { useState } from 'react';

const ImageUploadComponent = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [response, setResponse] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select an image first!');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch('https://k73yjrhmx0.execute-api.us-east-1.amazonaws.com/dev/aipoc', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setResponse(data.message); // Assuming your API returns a message
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Image</button>
      {response && <p>{response}</p>}
    </div>
  );
};

export default ImageUploadComponent;
