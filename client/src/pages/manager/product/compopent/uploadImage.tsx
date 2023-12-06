import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';

const ImageUpload: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl,setImageUrl]=useState<string>('')
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleImageUpload = async () => {
    try {
      if (!image) {
        console.error('Please select an image');
        return;
      }

      const formData = new FormData();
      formData.append('image', image);

      const response = await axios.post<{ imageUrl: string }>('http://localhost:9000/upload', formData);
      console.log('Image uploaded:', response.data.imageUrl);
      alert("thanh cong")
      setImageUrl(response.data.imageUrl)
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleImageUpload}>Upload Image</button>
      <img width={100} src={imageUrl} alt="no image" />
    </div>
  );
};

export default ImageUpload;
