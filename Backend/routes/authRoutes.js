const express = require("express");
const router = express.Router();
const { registerAdmin, loginAdmin } = require("../controllers/authController");

// Register admin (only once, then comment out for security)
router.post("/register", registerAdmin);

// Login admin
router.post("/login", loginAdmin);

module.exports = router;
