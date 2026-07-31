require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const supabase = require("./config/supabase");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

// Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 CivicEye Backend Running Successfully",
  });
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