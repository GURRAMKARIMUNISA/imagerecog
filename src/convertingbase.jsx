import React, { useState, useEffect } from 'react';

const ImageToBase64Converter = () => {
  const [imageBase64, setImageBase64] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch('https://k73yjrhmx0.execute-api.us-east-1.amazonaws.com/dev/aipoc'); // Replace with your API endpoint
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onload = () => {
          const base64data = reader.result;
          setImageBase64(base64data);
        };
        reader.readAsDataURL(blob);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchImage();
  }, []);

  return (
    <div>
      {imageBase64 && (
        <img
          src={imageBase64}
          alt="Converted to Base64"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      )}
    </div>
  );
};

export default ImageToBase64Converter;
