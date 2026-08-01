const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  getDashboardStats,
  getAllComplaints,
  getMyAssignedComplaints,
  searchComplaints,
  filterComplaints,
  updateComplaintStatus,
  updateComplaintPriority,
  assignComplaint
} = require("../controllers/officerController");

// ======================================
// DASHBOARD
// GET /api/officer/dashboard
// ======================================
router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware("officer"),
  getDashboardStats
);

// ======================================
// SEARCH COMPLAINTS
// GET /api/officer/complaints/search?q=road
// ======================================
router.get(
  "/complaints/search",
  authMiddleware,
  roleMiddleware("officer"),
  searchComplaints
);

// ======================================
// FILTER COMPLAINTS
// GET /api/officer/complaints/filter
// ======================================
router.get(
  "/complaints/filter",
  authMiddleware,
  roleMiddleware("officer"),
  filterComplaints
);

// ======================================
// GET ALL COMPLAINTS
// GET /api/officer/complaints
// ======================================
router.get(
  "/complaints",
  authMiddleware,
  roleMiddleware("officer"),
  getAllComplaints
);

// ======================================
// GET MY ASSIGNED COMPLAINTS
// GET /api/officer/my-complaints
// ======================================
router.get(
  "/my-complaints",
  authMiddleware,
  roleMiddleware("officer"),
  getMyAssignedComplaints
);

// ======================================
// UPDATE STATUS
// PATCH /api/officer/complaints/:id/status
// ======================================
router.patch(
  "/complaints/:id/status",
  authMiddleware,
  roleMiddleware("officer"),
  updateComplaintStatus
);

// ======================================
// UPDATE PRIORITY
// PATCH /api/officer/complaints/:id/priority
// ======================================
router.patch(
  "/complaints/:id/priority",
  authMiddleware,
  roleMiddleware("officer"),
  updateComplaintPriority
);

// ======================================
// ASSIGN COMPLAINT
// PATCH /api/officer/complaints/:id/assign
// ======================================
router.patch(
  "/complaints/:id/assign",
  authMiddleware,
  roleMiddleware("officer"),
  assignComplaint
);

module.exports = router;