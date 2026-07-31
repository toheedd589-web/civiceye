const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { getProfile } = require("../controllers/userController");

console.log("authMiddleware:", typeof authMiddleware);
console.log("getProfile:", typeof getProfile);

router.get("/profile", authMiddleware, getProfile);

module.exports = router;