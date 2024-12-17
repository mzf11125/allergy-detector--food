// components/DesktopDetector.js
import { useState } from "react";

const DesktopDetector = ({ onDetect }) => {
  const [image, setImage] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Food Allergy Detector</h1>
      <div className="flex gap-4">
        <div className="w-1/2">
          {image && (
            <img src={image} alt="Uploaded" className="mb-4 w-full rounded" />
          )}
          <input
            type="file"
            accept="image/*"
            className="mb-4"
            onChange={handleFileUpload}
          />
        </div>
        <textarea
          className="w-1/2 h-48 border rounded p-4"
          placeholder="Enter ingredients here..."
          id="ingredients"
        />
      </div>
      <button
        type="button"
        className="mt-4 w-full bg-blue-500 text-white py-2 rounded"
        onClick={() => onDetect(image)}
      >
        Detect Allergens
      </button>
    </div>
  );
};

export default DesktopDetector;
