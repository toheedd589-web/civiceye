const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

// Test Route
router.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Auth Route Working"
    });
});

// Register
router.post("/register", authController.register);

// Login
router.post("/login", authController.login);

module.exports = router;