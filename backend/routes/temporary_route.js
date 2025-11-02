// import express from 'express';
// import multer from 'multer';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import cloudinary from '../config/cloudinary.js';

// const router = express.Router();

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: { folder: 'test_uploads', allowed_formats: ['jpg', 'jpeg', 'png'] },
// });

// const upload = multer({ storage });

// router.post('/test-upload', upload.single('profilePicture'), (req, res) => {
//   console.log("req.file:", JSON.stringify(req.file, null, 2));
//   if (!req.file) return res.status(400).json({ message: "No file uploaded" });
//   res.json({ message: "Upload success", file: req.file });
// });

// export default router;

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
