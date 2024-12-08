import { describe, it, expect, vi } from "vitest";
import axios from "axios";
import AccessibilityService from "../../../src/services/AccessibilityService";

describe("AccessibilityService", () => {
  it("calls the correct API endpoint with file", async () => {
    const mockPost = vi.spyOn(axios, "post").mockResolvedValue({
      data: {
        score: 90,
        issues: [],
      },
    });

    const mockFile = new File(["test content"], "test.html", {
      type: "text/html",
    });

    const result = await AccessibilityService.analyzeFile(mockFile);

    expect(mockPost).toHaveBeenCalledWith(
      expect.stringContaining("/analyze"),
      expect.any(FormData),
      expect.objectContaining({
        headers: { "Content-Type": "multipart/form-data" },
      })
    );

    expect(result.score).toBe(90);
  });

  it("throws an error when API call fails", async () => {
    vi.spyOn(axios, "post").mockRejectedValue(new Error("Network error"));

    const mockFile = new File(["test content"], "test.html", {
      type: "text/html",
    });

    await expect(AccessibilityService.analyzeFile(mockFile)).rejects.toThrow(
      "Failed to analyze file"
    );
  });
});
