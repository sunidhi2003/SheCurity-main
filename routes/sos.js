const express = require("express");
const router = express.Router();

// SOS endpoint for logging emergency alerts
router.post("/alert", async (req, res) => {
  try {
    const { videoURL, battery, timestamp, location } = req.body;
    
    console.log("🚨 SOS Alert Received:", {
      videoURL,
      battery,
      timestamp,
      location
    });

    // Here you can add database logging or additional notification logic
    // For now, just acknowledge receipt
    
    res.status(200).json({
      success: true,
      message: "SOS alert received successfully"
    });
  } catch (error) {
    console.error("❌ SOS Alert Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to process SOS alert"
    });
  }
});

module.exports = router;
