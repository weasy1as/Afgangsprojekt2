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

var userId = null;
function getInfo(callback) {
  chrome.identity.getProfileUserInfo(
    { accountStatus: "ANY" },
    function (userInfo) {
      const email = userInfo.email || "Email not available";
      userId = userInfo.id || "ID not available";
      console.log("email: " + email + " id: " + userId);
      if (callback) callback(userId);
    }
  );
}

// Usage
getInfo((userId) => {
  console.log("User ID:", userId);
  // You can use userId here
});

//Database
const saveUserSettings = async (
  userId,
  name,
  font,
  lineHeight,
  bgColor,
  textColor
) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/settings/${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          font,
          lineHeight,
          bgColor,
          textColor,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to save user settings");
    }

    const result = await response.json();
    console.log("Settings saved:", result);
  } catch (error) {
    console.error("Error saving settings:", error);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const fontSizeInput = document.getElementById("fontSize");
  const lineHeightInput = document.getElementById("lineHeight");
  const bgColorInput = document.getElementById("bgColor");
  const textbgColorInput = document.getElementById("textbgColor");
  const nameInput = document.getElementById("name");

  const applyBtn = document.getElementById("applyBtn");
  const resetBtn = document.getElementById("resetBtn");
  const popupSave = document.getElementById("popup-save");
  const saveBtn = document.getElementById("saveBtn");

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

  saveBtn.addEventListener("click", () => {
    document.getElementById("setName").style.display = "flex";
  });

  popupSave.addEventListener("click", () => {
    document.getElementById("setName").style.display = "none";
    const fontSize = `${fontSizeInput.value}px`;
    const lineHeight = lineHeightInput.value;
    const bgColor = bgColorInput.value;
    const textcolor = textbgColorInput.value;
    const PresetName = nameInput.value;

    saveUserSettings(
      userId,
      PresetName,
      fontSize,
      lineHeight,
      bgColor,
      textcolor
    );
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
