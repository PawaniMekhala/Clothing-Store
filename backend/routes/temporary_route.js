import express from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary,
  params: { folder: 'test_uploads', allowed_formats: ['jpg', 'jpeg', 'png'] },
});

const upload = multer({ storage });

router.post('/test-upload', upload.single('profilePicture'), (req, res) => {
  console.log("req.file:", JSON.stringify(req.file, null, 2));
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  res.json({ message: "Upload success", file: req.file });
});

export default router;
