const mongoose = require("mongoose");

const SettingsSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  settings: [
    {
      font: { type: String, default: "16px" },
      lineHeight: { type: String, default: "1.5" },
      bgColor: { type: String, default: "#ffffff" },
      textColor: { type: String, default: "#000000" },
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("Settings", SettingsSchema);
