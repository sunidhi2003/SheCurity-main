const Incident = require("../models/IncidentModel");
const notifyAuthority = require("../helpers/notifyAuthority");

// Add a new incident
const addIncident = async (req, res) => {
  try {
    const { name, email, category, address, pincodeOfIncident, report } = req.body;

    if (!name || !category || !address) {
      return res.status(400).json({ message: "⚠️ Please fill all required fields" });
    }

    const incident = await Incident.create({
      name,
      email,
      category,
      address,
      pincodeOfIncident,
      report,
    });
     // 🔹 Notify authority immediately
    notifyAuthority(incident);

    // 🔹 Emit real-time event via Socket.IO
    if (req.app.get("io")) {
      req.app.get("io").emit("new-incident", incident);
    }


    res.status(201).json({ message: "✅ Incident reported successfully", incident });
  } catch (error) {
    console.error("Error adding incident:", error);
    res.status(500).json({ message: "❌ Server error" });
  }
};


// Get all incidents
const getAllIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find().sort({ createdAt: -1 });
    res.json(incidents);
  } catch (error) {
    console.error("Error fetching incidents:", error);
    res.status(500).json({ message: "❌ Server error" });
  }
};

// Mark incident as acknowledged
const acknowledgeIncident = async (req, res) => {
  try {
    const { id } = req.params;
    const incident = await Incident.findById(id);

    if (!incident) {
      return res.status(404).json({ message: "Incident not found" });
    }

    incident.isSeen = true;
    await incident.save();

    res.json({ message: "✅ Incident acknowledged", incident });
  } catch (error) {
    console.error("Error acknowledging incident:", error);
    res.status(500).json({ message: "❌ Server error" });
  }
};

module.exports = { addIncident, getAllIncidents, acknowledgeIncident };
