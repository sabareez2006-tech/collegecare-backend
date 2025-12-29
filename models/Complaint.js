const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  complaintId: Number,
  studentName: String,
  category: String,
  description: String,
  status: String
});

module.exports = mongoose.model("Complaint", complaintSchema);
