import { ColorClass, ScoreDescription, SeverityEnum } from "../types";

export const getScoreColor = (score: number) => {
  if (score >= 90) return ColorClass.TextGreen;
  if (score >= 70) return ColorClass.TextYellow;
  return ColorClass.TextRed;
};

export const getScoreDescription = (score: number) => {
  if (score >= 90) return ScoreDescription.Excellent;
  if (score >= 70) return ScoreDescription.NeedsImprovement;
  return ScoreDescription.SignificantBarriers;
};

export const getIssueClass = (severity: SeverityEnum) => {
  return {
    [ColorClass.BgRedLight]: severity === SeverityEnum.High,
    [ColorClass.BgYellowLight]: severity === SeverityEnum.Medium,
    [ColorClass.BgBlueLight]: severity === SeverityEnum.Low,
  };
};

export const getBadgeClass = (severity: SeverityEnum) => {
  return {
    [ColorClass.BgRedDark]: severity === SeverityEnum.High,
    [ColorClass.BgYellowDark]: severity === SeverityEnum.Medium,
    [ColorClass.BgBlueDark]: severity === SeverityEnum.Low,
  };
};
