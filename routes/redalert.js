const express = require("express");
const multer = require("multer");
const router = express.Router();

// Storage in memory (later you can push to AWS/Firebase)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload proof endpoint
router.post("/upload-proof", upload.single("file"), async (req, res) => {
  try {
    console.log("✅ File received:", req.file.originalname);

    // TODO: yaha file ko AWS S3 / Firebase / local folder me save karo
    // abhi ke liye just return success
    res.json({ success: true, message: "Proof uploaded!" });
  } catch (err) {
    console.error("❌ Upload failed:", err);
    res.status(500).json({ error: "Upload failed" });
  }
});

module.exports = router;
