const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  complaintId: {
    type: Number,
    unique: true   // ⭐ ensures auto-increment IDs stay unique
  },
  studentName: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: "Pending"  // ⭐ auto set status
  }
});

module.exports = mongoose.model("Complaint", complaintSchema);
