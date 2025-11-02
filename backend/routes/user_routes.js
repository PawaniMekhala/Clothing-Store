import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  logoutUser,
  updateProfileInfo,
  updateProfileImage,
  deleteProfileImage,
} from "../controllers/user_controller.js";
import auth from "../middleware/auth_middleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", auth, getProfile);
router.post("/logout", auth, logoutUser);
// Update address & phone (JSON body)
router.put("/profile", auth, updateProfileInfo);

// Update profile image (multipart/form-data with field 'profilePicture')
router.put(
  "/profile/image",
  auth,
  upload.single("profilePicture"),
  updateProfileImage
);

// DELETE profile image
router.delete("/profile/image", auth, deleteProfileImage);

export default router;
