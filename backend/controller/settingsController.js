// controllers/settingsController.js
const Settings = require("../models/settings");

// Retrieve settings for a specific user
const getUserSettings = async (req, res) => {
  const { userId } = req.params;

  try {
    const userSettings = await Settings.findOne({ userId });

    if (!userSettings) {
      return res
        .status(404)
        .json({ message: "No settings found for this user" });
    }

    res.json(userSettings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Save or update settings for a specific user
const saveUserSettings = async (req, res) => {
  const { userId } = req.params;
  const { font, lineHeight, bgColor, textColor } = req.body;

  try {
    let userSettings = await Settings.findOne({ userId });

    if (!userSettings) {
      // If no settings exist for this user, create a new document
      userSettings = new Settings({
        userId,
        settings: [{ font, lineHeight, bgColor, textColor }],
      });
    } else {
      // Append new settings to the existing array of settings
      userSettings.settings.push({ font, lineHeight, bgColor, textColor });
    }

    await userSettings.save();
    res.status(200).json({ message: "Settings saved successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getUserSettings, saveUserSettings };
