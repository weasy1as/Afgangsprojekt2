const express = require("express");
const {
  getUserSettings,
  saveUserSettings,
  deleteUserSetting,
} = require("../controller/settingsController");

const router = express.Router();

// routes
router.get("/:userId", getUserSettings);
router.post("/:userId", saveUserSettings);
router.delete("/:userId/:settingId", deleteUserSetting);

module.exports = router;
