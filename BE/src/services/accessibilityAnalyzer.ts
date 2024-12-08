import { parse } from "node-html-parser";
import { AccessibilityIssue, AccessibilityRule, SeverityEnum } from "../types";

export class AccessibilityAnalyzer {
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
            severity: SeverityEnum.High,
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
              severity: SeverityEnum.Medium,
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
          severity: SeverityEnum.Low,
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
      [SeverityEnum.Low]: 1,
      [SeverityEnum.Medium]: 3,
      [SeverityEnum.High]: 5,
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
