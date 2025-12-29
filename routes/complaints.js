const express = require("express");
const router = express.Router();
const Complaint = require("../models/Complaint");

// ADMIN DASHBOARD STATS
router.get("/admin/dashboard", async (req, res) => {
  try {
    const total = await Complaint.countDocuments();
    const pending = await Complaint.countDocuments({ status: "Pending" });
    const resolved = await Complaint.countDocuments({ status: "Resolved" });
    const rejected = await Complaint.countDocuments({ status: "Rejected" });

    res.json({
      total,
      pending,
      resolved,
      rejected
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
