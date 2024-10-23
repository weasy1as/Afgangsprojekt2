// Function to apply settings
const applySettings = (settings) => {
  const { font, lineHeight, bgColor, textColor } = settings;
  executeScript(font, lineHeight, bgColor, textColor);
};

// Function to execute script on the active tab
const executeScript = (font, lineHeight, bgColor, textbgColorInput) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    let tab = tabs[0];

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
  });
};

// Fetch user settings from the backend
const fetchUserSettings = async (userId) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/settings/${userId}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch user settings");
    }

    const settings = await response.json();
    const userSettings = settings.settings;

    // Call function to display the settings on the page
    displaySettings(userSettings);
  } catch (error) {
    console.error("Error fetching settings:", error);
  }
};

// Function to dynamically display the settings in the list
const displaySettings = (settingsArray) => {
  const settingsList = document.getElementById("settingsList");
  settingsList.innerHTML = "";

  settingsArray.forEach((setting, index) => {
    const listItem = document.createElement("li");

    listItem.innerHTML = `
        <div>
          <span class="setting-label">Preset Name: ${setting.name}</span>
        </div>
      `;

    // Add click event listener to apply the selected setting
    listItem.addEventListener("click", () => {
      applySettings(setting);
    });

    settingsList.appendChild(listItem);
  });
};

// Load settings when the page is ready
document.addEventListener("DOMContentLoaded", () => {
  const userId = 2020;
  fetchUserSettings(userId);
});
