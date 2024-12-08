export interface AccessibilityIssue {
  type: string;
  severity: SeverityEnum.High | SeverityEnum.Medium | SeverityEnum.Low;
  message: string;
  element?: string;
}
export enum SeverityEnum {
  Low = "low",
  Medium = "medium",
  High = "high",
}
export interface AccessibilityAnalysis {
  score: number;
  issues: AccessibilityIssue[];
}

export enum ScoreDescription {
  Excellent = "Excellent Accessibility",
  NeedsImprovement = "Needs Improvement",
  SignificantBarriers = "Significant Accessibility Barriers",
}

export interface AccessibilityRule {
  name: string;
  check: (root: any) => AccessibilityIssue[];
}
