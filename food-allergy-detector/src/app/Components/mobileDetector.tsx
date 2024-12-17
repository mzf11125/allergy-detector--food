// components/MobileDetector.tsx
import { useState } from "react";
import CameraPhoto, { FACING_MODES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";

interface MobileDetectorProps {
  onDetect: (image: string | null, text: string) => void;
}

const MobileDetector: React.FC<MobileDetectorProps> = ({ onDetect }) => {
  const [image, setImage] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const handleCapture = (dataUri: string) => {
    setImage(dataUri);
    setIsCameraActive(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleDetect = () => {
    const textInput = (
      document.getElementById("ingredients") as HTMLTextAreaElement
    ).value;
    onDetect(image, textInput);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Food Allergy Detector</h1>
      {isCameraActive ? (
        <CameraPhoto
          onTakePhoto={handleCapture}
          idealFacingMode={FACING_MODES.ENVIRONMENT}
        />
      ) : (
        <div>
          {image && (
            <img src={image} alt="Captured" className="mb-4 w-full rounded" />
          )}
          <button
            type="button"
            className="w-full bg-green-500 text-white py-2 rounded mb-2"
            onClick={() => setIsCameraActive(true)}
          >
            Open Camera
          </button>
          <input
            type="file"
            accept="image/*"
            className="w-full mb-4"
            onChange={handleFileUpload}
          />
        </div>
      )}
      <textarea
        id="ingredients"
        className="w-full h-32 border rounded p-2"
        placeholder="Enter ingredients here..."
      />
      <button
        type="button"
        className="mt-4 w-full bg-blue-500 text-white py-2 rounded"
        onClick={handleDetect}
      >
        Detect Allergens
      </button>
    </div>
  );
};

export default MobileDetector;
