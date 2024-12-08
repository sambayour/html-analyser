import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import FileUploader from "../../../src/components/FileUploader.vue";

describe("FileUploader", () => {
  it("renders the default upload text", () => {
    const wrapper = mount(FileUploader);
    expect(wrapper.text()).toContain(
      "Upload an HTML file here to analyze its accessibility"
    );
  });

  it("emits file-uploaded event when file is selected", async () => {
    const wrapper = mount(FileUploader);

    const mockFile = new File(["test content"], "test.html", {
      type: "text/html",
    });

    const fileInput = wrapper.find('input[type="file"]');

    const mockFileList = {
      length: 1,
      item: (index: number) => (index === 0 ? mockFile : null),
      0: mockFile,
    };

    Object.defineProperty(fileInput.element, "files", {
      value: mockFileList,
    });

    await fileInput.trigger("change");

    expect(wrapper.emitted("file-uploaded")).toBeTruthy();
    expect(wrapper.emitted("file-uploaded")?.[0][0]).toBe(mockFile);
  });
});
