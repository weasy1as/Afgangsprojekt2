// routes/settingsRoutes.js
const express = require("express");
const {
  getUserSettings,
  saveUserSettings,
} = require("../controller/settingsController");

const router = express.Router();

// Define routes
router.get("/:userId", getUserSettings); // Route to get user settings
router.post("/:userId", saveUserSettings); // Route to save or update settings

module.exports = router;
