const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const complaintsSchema = new Schema(
  {
    reporterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    Category: String,
    Latitude: String,
    Longitude: String,
    Address: String,
    Images: [String],
    Description: String,
    Status: { type: String, default: "pending" },
    Attachment: { type: String, default: "0" },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Complaint", complaintsSchema);
