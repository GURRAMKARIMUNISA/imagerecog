import React, { useState } from 'react';
import axios from 'axios';

const ImageUploader = () => {
    const [image, setImage] = useState(null);

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('image', image);

        const response = await axios.post('/extract_text', formData);

        const text = response.data;

        // Display the extracted text
        console.log(text);
    };

    return (
        <div>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default ImageUploader;