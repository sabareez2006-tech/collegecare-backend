const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// ROUTES
const complaintRoutes = require("./routes/complaints");

// MODELS
const User = require("./models/User");

// APP INIT
const app = express();
app.use(cors());
app.use(express.json());

// =========================
// ROUTES
// =========================
app.use("/complaints", complaintRoutes);

// =========================
// TEST ROUTE
// =========================
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// =========================
// LOGIN API
// =========================
app.post("/login", async (req, res) => {
  try {
    const { userId, password } = req.body;

    const user = await User.findOne({ userId, password });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      message: "Login successful",
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// =========================
// MONGODB CONNECTION
// =========================
const MONGO_URL =
  "mongodb+srv://dbms:dbms123@dbms-cluster.1zyaphn.mongodb.net/complaintDB?retryWrites=true&w=majority";

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err.message));

// =========================
// SERVER START
// =========================
const PORT = 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
