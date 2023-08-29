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
    image: String,
  },
  { timestamps: true }
);
module.exports = mongoose.model("Complaint", complaintsSchema);
