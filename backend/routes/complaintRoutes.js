const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createComplaint,
  getMyComplaints,
  getComplaintById,
  updateComplaint,
  deleteComplaint
} = require("../controllers/complaintController");

// =============================
// CREATE COMPLAINT
// POST /api/complaints
// =============================
router.post("/", authMiddleware, createComplaint);

// =============================
// GET MY COMPLAINTS
// GET /api/complaints
// =============================
router.get("/", authMiddleware, getMyComplaints);

// =============================
// GET SINGLE COMPLAINT
// GET /api/complaints/:id
// =============================
router.get("/:id", authMiddleware, getComplaintById);

// =============================
// UPDATE COMPLAINT
// PATCH /api/complaints/:id
// =============================
router.patch("/:id", authMiddleware, updateComplaint);

// =============================
// DELETE COMPLAINT
// DELETE /api/complaints/:id
// =============================
router.delete("/:id", authMiddleware, deleteComplaint);

module.exports = router;