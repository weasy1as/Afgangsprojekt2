const executeScript = (font, lineHeight, bgColor, textbgColorInput) => {
  return async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (font, lineHeight, bgColor, textbgColorInput) => {
        const elements = document.querySelectorAll("p, span, a, h1");

        elements.forEach((el) => {
          el.style.color = textbgColorInput;

          if (el.tagName === "P" || el.tagName === "A") {
            el.style.fontSize = font;
            el.style.lineHeight = lineHeight;
          }
        });

        document.body.style.backgroundColor = bgColor;

        const divs = document.querySelectorAll("div");
        divs.forEach((d) => {
          d.style.backgroundColor = bgColor;
        });

        const articles = document.querySelectorAll("article");
        articles.forEach((a) => {
          a.style.backgroundColor = bgColor;
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
  const resetBtn = document.getElementById("resetBtn");

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

  resetBtn.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: () => {
          const elements = document.querySelectorAll("p, span, a, h1");

          elements.forEach((el) => {
            el.style.color = "";
            el.style.fontSize = "";
            el.style.lineHeight = "";
          });

          document.body.style.backgroundColor = "";

          const divs = document.querySelectorAll("div");
          divs.forEach((d) => {
            d.style.backgroundColor = "";
          });

          const articles = document.querySelectorAll("article");
          articles.forEach((a) => {
            a.style.backgroundColor = "";
          });
        },
      });
    });
  });
});
