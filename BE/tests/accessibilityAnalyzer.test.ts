import request from "supertest";
import { AccessibilityAnalyzer } from "../src/services/accessibilityAnalyzer";
import app from "../src/index";
import fs from "fs";
import path from "path";

import { describe, it, expect, beforeEach } from "@jest/globals";

describe("Accessibility Analyzer", () => {
  let analyzer: AccessibilityAnalyzer;

  beforeEach(() => {
    analyzer = new AccessibilityAnalyzer();
  });

  describe("HTML Analysis", () => {
    it("should detect missing alt text", () => {
      const htmlContent = `
        <html>
          <body>
            <img src="test.jpg">
            <img src="test2.jpg" alt="">
            <img src="test3.jpg" alt="description">
          </body>
        </html>
      `;

      const result = analyzer.analyzeHTML(htmlContent);
      expect(result.issues.length).toBe(2);
      expect(result.issues[0].type).toBe("missing-alt");
      expect(result.issues[1].type).toBe("missing-alt");
    });

    it("should detect heading hierarchy issues", () => {
      const htmlContent = `
        <html>
          <body>
            <h1>Main Heading</h1>
            <h3>Skipped Heading</h3>
          </body>
        </html>
      `;

      const result = analyzer.analyzeHTML(htmlContent);
      expect(result.issues.length).toBe(1);
      expect(result.issues[0].type).toBe("heading-hierarchy");
    });

    it("should detect non-semantic divs", () => {
      const htmlContent = `
        <html>
          <body>
            <div>Some content</div>
            <section>Semantic content</section>
          </body>
        </html>
      `;

      const result = analyzer.analyzeHTML(htmlContent);
      expect(result.issues.length).toBe(1);
      expect(result.issues[0].type).toBe("non-semantic");
    });
  });

  describe("Analyze Route", () => {
    it("should return an error when no file is uploaded", async () => {
      const response = await request(app).post("/analyze");

      expect(response.status).toBe(400);
      expect(response.body.error).toBe("No file uploaded");
    });

    it("should analyze an uploaded HTML file", async () => {
      const testHtmlPath = path.join(__dirname, "test-files", "sample.html");

      const testFilesDir = path.join(__dirname, "test-files");
      if (!fs.existsSync(testFilesDir)) {
        fs.mkdirSync(testFilesDir);
      }

      if (!fs.existsSync(testHtmlPath)) {
        fs.writeFileSync(
          testHtmlPath,
          `
          <html>
            <body>
              <h1>Test Page</h1>
              <img src="test.jpg">
            </body>
          </html>
        `
        );
      }

      const response = await request(app)
        .post("/analyze")
        .attach("file", testHtmlPath);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("score");
      expect(response.body).toHaveProperty("issues");
      expect(response.body).toHaveProperty("totalIssues");
      expect(response.body).toHaveProperty("fileName");
    });
  });
});
