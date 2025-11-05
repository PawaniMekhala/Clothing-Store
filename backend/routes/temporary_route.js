import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js"; // adjust path if needed
import fs from "fs";

const router = express.Router();

// configure multer to store file temporarily
const upload = multer({ dest: "uploads/" });

// POST route: test Cloudinary image upload
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    // upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "test_uploads", // optional folder name
    });

    // remove temp file from server
    fs.unlinkSync(req.file.path);

    // send Cloudinary response
    res.json({
      success: true,
      message: "Image uploaded successfully",
      imageUrl: result.secure_url,
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    res.status(500).json({
      success: false,
      message: "Image upload failed",
      error: error.message,
    });
  }
});

export default router;
