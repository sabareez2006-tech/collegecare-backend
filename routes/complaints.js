const express = require("express");
const router = express.Router();
const Complaint = require("../models/Complaint");

// =========================
// ADMIN DASHBOARD STATS
// =========================
router.get("/admin/dashboard", async (req, res) => {
  try {
    const total = await Complaint.countDocuments();
    const pending = await Complaint.countDocuments({ status: "Pending" });
    const resolved = await Complaint.countDocuments({ status: "Resolved" });
    const rejected = await Complaint.countDocuments({ status: "Rejected" });

    res.json({ total, pending, resolved, rejected });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// =========================
// GET ALL COMPLAINTS
// =========================
router.get("/", async (req, res) => {
  const complaints = await Complaint.find();
  res.json(complaints);
});

// =========================
// CREATE NEW COMPLAINT
// =========================
router.post("/", async (req, res) => {
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

// =========================
// UPDATE COMPLAINT STATUS
// =========================
router.put("/:id", async (req, res) => {
  const { status } = req.body;

  const updatedComplaint = await Complaint.findByIdAndUpdate(
    req.params.id,
    { status },
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

module.exports = router;
