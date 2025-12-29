const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// =========================
// MODELS
// =========================
const User = require("./models/User");
const Complaint = require("./models/Complaint");

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
// TEST ROUTE
// =========================
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// =========================
// LOGIN API
// =========================
app.post("/login", async (req, res) => {
  const { userId, password } = req.body;

  const user = await User.findOne({ userId, password });

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({
    message: "Login successful",
    role: user.role,
  });
});

// =========================
// GET ALL COMPLAINTS
// =========================
app.get("/complaints", async (req, res) => {
  const complaints = await Complaint.find();
  res.json(complaints);
});

// =========================
// UPDATE COMPLAINT STATUS (USING _id – FIXED)
// =========================
app.put("/complaints/:id", async (req, res) => {
  const { status } = req.body;

  const updatedComplaint = await Complaint.findByIdAndUpdate(
    req.params.id,          // MongoDB _id (string)
    { status: status },
    { new: true }
  );

  if (!updatedComplaint) {
    return res.status(404).json({ message: "Complaint not found" });
  }

  res.json({
    message: "Status updated successfully",
    updated: updatedComplaint,
  });
});

// =========================
// SERVER START
// =========================
const PORT = 8080;
// =========================
// CREATE NEW COMPLAINT (STUDENT)
// =========================
app.post("/complaints", async (req, res) => {
  const { studentName, category, description } = req.body;

  const newComplaint = new Complaint({
    complaintId: Math.floor(Math.random() * 100000),
    studentName,
    category,
    description,
    status: "Pending",
  });

  await newComplaint.save();

  res.json({
    message: "Complaint submitted successfully",
    complaint: newComplaint,
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
