// lib/geminiApi.ts
import axios from "axios";

const GEMINI_API_BASE_URL = "https://api.gemini.example.com"; // Replace with your API URL
const API_KEY = process.env.GEMINI_API_KEY || "your-api-key"; // Use environment variable for better security

interface AllergensResponse {
  allergens: string[];
}

export async function detectAllergens(
  formData: FormData
): Promise<AllergensResponse> {
  try {
    const response = await axios.post<AllergensResponse>(
      `${GEMINI_API_BASE_URL}/detect-allergens`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Error detecting allergens";
    console.error("Allergen detection failed:", errorMessage);
    throw new Error(errorMessage);
  }
}
