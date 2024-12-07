import axios from "axios";
import { AccessibilityAnalysis } from "../types";

class AccessibilityService {
  private apiUrl: string;

  constructor() {
    this.apiUrl = import.meta.env.VITE_API_URL;
  }

  async analyzeFile(file: File): Promise<AccessibilityAnalysis> {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(`${this.apiUrl}/analyze`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      console.error("Upload error:", error);
      throw new Error("Failed to analyze file");
    }
  }
}

export default new AccessibilityService();
