// pages/index.tsx
"use client";

import { useState, useEffect } from "react";
import MobileDetector from "./Components/mobileDetector";
import DesktopDetector from "./Components/desktopDetector";
import { detectAllergens } from "./api/api";

const Home: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDetect = async (image: string | null, text: string) => {
    try {
      const formData = new FormData();
      if (image) formData.append("image", image);
      if (text) formData.append("text", text);

      const result = await detectAllergens(formData);
      alert(`Allergens Detected: ${result.allergens.join(", ")}`);
    } catch (error: any) {
      alert(error.message || "An error occurred while detecting allergens.");
    }
  };

  return isMobile ? (
    <MobileDetector onDetect={handleDetect} />
  ) : (
    <DesktopDetector onDetect={handleDetect} />
  );
};

export default Home;
