const executeScript = (font, lineHeight, bgColor, textbgColorInput) => {
  return async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (font, lineHeight, bgColor, textbgColorInput) => {
        const paragraphs = document.querySelectorAll("p");
        const spans = document.querySelectorAll("span");

        paragraphs.forEach((p) => {
          p.style.fontSize = font;
          p.style.lineHeight = lineHeight;
          p.style.color = textbgColorInput;
        });

        spans.forEach((s) => {
          s.style.fontSize = font;
        });

        document.body.style.backgroundColor = bgColor;

        const divs = document.querySelectorAll("div");
        divs.forEach((d) => {
          d.style.backgroundColor = bgColor;
        });
      },
      args: [font, lineHeight, bgColor, textbgColorInput],
    });
  };
};

document.addEventListener("DOMContentLoaded", () => {
  const fontSizeInput = document.getElementById("fontSize");
  const lineHeightInput = document.getElementById("lineHeight");
  const bgColorInput = document.getElementById("bgColor");
  const textbgColorInput = document.getElementById("textbgColor");

  const applyBtn = document.getElementById("applyBtn");

  const fontSizeValue = document.getElementById("fontSizeValue");
  const lineHeightValue = document.getElementById("lineHeightValue");

  fontSizeInput.addEventListener("input", (event) => {
    fontSizeValue.textContent = event.target.value;
  });

  lineHeightInput.addEventListener("input", (event) => {
    lineHeightValue.textContent = event.target.value;
  });

  applyBtn.addEventListener("click", () => {
    const fontSize = `${fontSizeInput.value}px`;
    const lineHeight = lineHeightInput.value;
    const bgColor = bgColorInput.value;
    const textcolor = textbgColorInput.value;

    executeScript(fontSize, lineHeight, bgColor, textcolor)();
  });
});
