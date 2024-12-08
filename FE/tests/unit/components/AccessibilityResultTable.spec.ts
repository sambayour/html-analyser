import { AccessibilityAnalysis, SeverityEnum } from "../../../src/types";
import AccessibilityResultTable from "../../../src/components/AccessibilityResultTable.vue";
import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

describe("AccessibilityResultTable", () => {
  const mockAnalysisResult: AccessibilityAnalysis = {
    score: 85,
    issues: [
      {
        type: "Missing Alt Text",
        severity: SeverityEnum.Medium,
        message: "Image is missing alternative text",
        element: '<img src="example.jpg">',
      },
      {
        type: "Low Contrast",
        severity: SeverityEnum.High,
        message: "Color contrast is insufficient",
        element: '<div style="color: #888; background: #fff">',
      },
    ],
  };

  it("renders the accessibility score", () => {
    const wrapper = mount(AccessibilityResultTable, {
      props: { analysisResult: mockAnalysisResult },
    });

    expect(wrapper.text()).toContain("85");
    expect(wrapper.text()).toContain("Needs Improvement");
  });

  it("renders issues in a table", () => {
    const wrapper = mount(AccessibilityResultTable, {
      props: { analysisResult: mockAnalysisResult },
    });

    const tableRows = wrapper.findAll("tbody tr");
    expect(tableRows.length).toBe(2);

    expect(tableRows[0].text()).toContain("Missing Alt Text");
    expect(tableRows[1].text()).toContain("Low Contrast");
  });

  it("displays no issues message when no issues exist", () => {
    const noIssuesResult: AccessibilityAnalysis = {
      score: 100,
      issues: [],
    };

    const wrapper = mount(AccessibilityResultTable, {
      props: { analysisResult: noIssuesResult },
    });

    expect(wrapper.text()).toContain("No accessibility issues detected");
  });
});
