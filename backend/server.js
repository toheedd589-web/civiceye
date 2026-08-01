require("dotenv").config();

const express = require("express");
const cors = require("cors");

const supabase = require("./config/supabase");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const complaintRoutes = require("./routes/complaintRoutes"); // NEW
const authMiddleware = require("./middleware/authMiddleware");
const officerRoutes = require("./routes/officerRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 CivicEye Backend Running Successfully",
  });
});

// =========================
// ROUTES
// =========================

// Authentication Routes
app.use("/api/auth", authRoutes);

// User Routes
app.use("/api/users", userRoutes);

// Complaint Routes (NEW)
app.use("/api/complaints", complaintRoutes);
app.use("/api/officer", officerRoutes);

// Protected Test Route
app.get("/api/profile", authMiddleware, (req, res) => {
  res.json({
    success: true,
    message: "Protected route accessed",
    user: req.user,
  });
});

// Supabase Test Route
app.get("/api/test", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .limit(1);

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    res.json({
      success: true,
      message: "Supabase Connected",
      data,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Debug Route
app.get("/debug", async (req, res) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .limit(1);

  res.json({
    data,
    error,
  });
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});