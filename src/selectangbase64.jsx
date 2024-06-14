import React, { useState } from 'react';

const Selectinglanguagebase64 = () => {
  const [image, setImage] = useState(null);
  const [language, setLanguage] = useState('');
  const [base64Image, setBase64Image] = useState('');

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleConvertToBase64 = () => {
    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onloadend = () => {
        setBase64Image(reader.result.replace("data:", "")
        .replace(/^.+,/, ""));
      };
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <select value={language} onChange={handleLanguageChange}>
        <option value="">Select Language</option>
        <option value="English">English</option>
        <option value="Spanish">Spanish</option>
        <option value="French">French</option>
        {/* Add more language options as needed */}
      </select>
      <button onClick={handleConvertToBase64}>Convert to Base64</button>
      {base64Image && (
        <div>
          <h2>Base64 Image:</h2>
          <p>{base64Image}</p>
        </div>
      )}
    </div>
  );
};

export default Selectinglanguagebase64;