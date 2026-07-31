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

// Register Route
router.post("/register", authController.register);

module.exports = router;