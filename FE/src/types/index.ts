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

export enum ColorClass {
  BgRedLight = "bg-red-50 border-red-200",
  BgYellowLight = "bg-yellow-50 border-yellow-200",
  BgBlueLight = "bg-blue-50 border-blue-200",
  BgRedDark = "bg-red-500 text-white",
  BgYellowDark = "bg-yellow-500 text-white",
  BgBlueDark = "bg-blue-500 text-white",
  TextGreen = "text-green-500",
  TextYellow = "text-yellow-500",
  TextRed = "text-red-500",
}
