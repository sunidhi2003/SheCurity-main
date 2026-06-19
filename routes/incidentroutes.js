const express = require("express");
const router = express.Router();
const {
  addIncident,
  getAllIncidents,
  acknowledgeIncident,
} = require("../controllers/incidentController");

// @route   POST /api/incidents
// @desc    Add a new incident
// @access  Public (you can later secure it with auth middleware)
router.post("/", addIncident);

// @route   GET /api/incidents
// @desc    Get all incidents
// @access  Admin/Authorities
router.get("/", getAllIncidents);

// @route   PATCH /api/incidents/:id
// @desc    Mark an incident as acknowledged
// @access  Admin/Authorities
router.patch("/:id", acknowledgeIncident);

module.exports = router;
