import express from "express";
import multer from "multer";
import { parse } from "node-html-parser";
import cors from "cors";

interface AccessibilityRule {
  name: string;
  check: (root: any) => AccessibilityIssue[];
}

interface AccessibilityIssue {
  type: string;
  message: string;
  severity: "low" | "medium" | "high";
  element?: string;
}

class AccessibilityAnalyzer {
  private rules: AccessibilityRule[] = [
    {
      name: "Missing Alt Text",
      check: (root) => {
        const images = root.querySelectorAll("img");
        return images
          .filter((img: any) => !img.getAttribute("alt"))
          .map((img: any) => ({
            type: "missing-alt",
            message: "Image is missing an alt attribute",
            severity: "high",
            element: img.outerHTML,
          }));
      },
    },
    {
      name: "Heading Level Hierarchy",
      check: (root) => {
        const headings = root.querySelectorAll("h1, h2, h3, h4, h5, h6");
        const issues: AccessibilityIssue[] = [];

        let lastLevel = 0;
        headings.forEach((heading: any) => {
          const currentLevel = parseInt(heading.tagName[1]);
          if (currentLevel > lastLevel + 1) {
            issues.push({
              type: "heading-hierarchy",
              message: `Skipped heading level from h${lastLevel} to h${currentLevel}`,
              severity: "medium",
              element: heading.outerHTML,
            });
          }
          lastLevel = currentLevel;
        });

        return issues;
      },
    },
    {
      name: "Semantic Structure",
      check: (root) => {
        const nonSemanticDivs = root
          .querySelectorAll("div")
          .filter(
            (div: any) =>
              !div.classList.length &&
              !div.getAttribute("role") &&
              div.textContent.trim() !== ""
          );

        return nonSemanticDivs.map((div: any) => ({
          type: "non-semantic",
          message: "Consider using semantic HTML instead of generic div",
          severity: "low",
          element: div.outerHTML,
        }));
      },
    },
  ];

  analyzeHTML(htmlContent: string): {
    score: number;
    issues: AccessibilityIssue[];
    totalIssues: number;
  } {
    const root = parse(htmlContent);

    const issues = this.rules.flatMap((rule) => rule.check(root));

    const severityWeights = {
      low: 1,
      medium: 3,
      high: 5,
    };

    const totalWeight = issues.reduce(
      (acc, issue) => acc + (severityWeights[issue.severity] || 0),
      0
    );

    const score = Math.max(0, 100 - totalWeight);

    return {
      score: Math.round(score),
      issues,
      totalIssues: issues.length,
    };
  }
}

const app = express();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

const analyzer = new AccessibilityAnalyzer();

app.use(cors());

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
      console.error("Analysis error:", error);
      res.status(500).json({
        error: "Failed to analyze file",
        details: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
);

const PORT = process.env.PORT || 3200;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
