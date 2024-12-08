import express from "express";
import multer from "multer";
import { AccessibilityAnalyzer } from "../services/accessibilityAnalyzer";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

const analyzer = new AccessibilityAnalyzer();

export const analyzeRoute = (app: express.Application) => {
  app.post(
    "/analyze",
    upload.single("file"),
    (req: express.Request, res: express.Response): any => {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      try {
        const htmlContent = req.file.buffer.toString("utf-8");
        const result = analyzer.analyzeHTML(htmlContent);

        res.json({
          ...result,
          fileName: req.file.originalname,
        });
      } catch (error) {
        console.error(`Analysis error: ${error}`);
        res.status(500).json({
          error: "Failed to analyze file",
          details: error instanceof Error ? error.message : "Unknown error",
        });
      }
    }
  );
};
