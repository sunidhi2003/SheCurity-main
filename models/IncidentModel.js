const mongoose = require("mongoose");

const IncidentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    pincodeOfIncident: {
      type: String,
    },
    report: {
      type: String,
    },
    isSeen: {
      type: Boolean,
      default: false,
    },
    mediaUrl: {
      type: String, // if you want to allow images/videos later
    },
  },
  { timestamps: true }
);

const Incident = mongoose.model("Incident", IncidentSchema);
module.exports = Incident;
