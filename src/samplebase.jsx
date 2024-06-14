// import React, { useState } from 'react';
// import axios from 'axios';

// const ImageUploader = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [base64Image, setBase64Image] = useState('');

//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]);
//   };

//   const handleUpload = () => {
//     if (selectedFile) {
//       const formData = new FormData();
//       formData.append('image', selectedFile);

//       axios.post('https://k73yjrhmx0.execute-api.us-east-1.amazonaws.com/dev/aipoc', formData)
//         .then(response => {
//           console.log(response.data);
//           setBase64Image(response.data.base64Image); // Assuming the API returns the base64 image
//         })
//         .catch(error => {
//           console.error('Error uploading image:', error);
//         });
//     } else {
//       console.error('No file selected.');
//     }
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleUpload}>Upload</button>
//       {base64Image && <img src={`data:image/png;base64,${base64Image}`} alt="Uploaded" />}
//     </div>
//   );
// };

// export default ImageUploader;





import React, { useState } from 'react';
import axios from 'axios';

const ImageUploadForm = () => {
  const [image, setImage] = useState(null);
  const [base64Image, setBase64Image] = useState('');

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);

    const reader = new FileReader();
    reader.onloadend = () => {
      setBase64Image(reader.result);
    };
    reader.readAsDataURL(selectedImage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('image', image);

      const response = await axios.post('https://k73yjrhmx0.execute-api.us-east-1.amazonaws.com/dev/aipoc', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Image uploaded:', response.data.filename);
      console.log('Base64 data:', base64Image);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <h2>Upload an Image</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button type="submit">Upload</button>
      </form>
      {base64Image && (
        <div>
          <h3>Base64 Image:</h3>
          <img src={base64Image} alt="Uploaded" />
        </div>
      )}
    </div>
  );
};

export default ImageUploadForm;
