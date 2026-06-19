const express = require("express");
const report = require("../models/IncidentModel");
const router = express.Router();

// 📌 1. Complaints by Category
router.get("/by-category", async (req, res) => {
  try {
    const data = await Report.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } }
    ]);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 2. Complaints by Pincode
router.get("/by-pincode", async (req, res) => {
  try {
    const data = await Report.aggregate([
      { $group: { _id: "$pincode", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 3. Complaints by Status
router.get("/by-status", async (req, res) => {
  try {
    const data = await Report.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 4. Trend over Time (last 30 days)
router.get("/trend", async (req, res) => {
  try {
    const data = await Report.aggregate([
      {
        $group: {
          _id: {
            day: { $dayOfMonth: "$createdAt" },
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } }
    ]);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports= router;
