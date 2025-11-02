import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user_model.js";
import cloudinary from "../config/cloudinary.js";
import dotenv from "dotenv";
dotenv.config();

// Register
export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ where: { Email: email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      Password: hashedPassword,
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser.UserID, email: newUser.Email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" } // token valid for 7 days
    );

    // Send response with token
    res.status(201).json({
      message: "User Account created successfully",
      user: {
        id: newUser.UserID,
        email: newUser.Email,
        firstName: newUser.FirstName,
        lastName: newUser.LastName,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Step 1: Find user by email
    const user = await User.findOne({ where: { Email: email } });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found. Invalid email or password" });
    }

    // Step 2: Compare password
    const isPasswordValid = await bcrypt.compare(password, user.Password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Step 3: Generate JWT token
    const token = jwt.sign(
      { id: user.UserID, email: user.Email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Step 4: Send response with token
    res.json({
      message: "Login successful",
      user: {
        id: user.UserID,
        firstName: user.FirstName,
        lastName: user.LastName,
        email: user.Email,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Update profile info
export const updateProfileInfo = async (req, res) => {
  try {
    // prefer the authenticated user's id
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { address, phone } = req.body;

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update text fields
    user.Address = address ?? user.Address;
    user.Phone = phone ?? user.Phone;

    await user.save();

    // Proper logging for debugging
    console.log("Updated user data:", userId);

    res.json({
      message: "Profile info updated successfully",
      user: user.toJSON(),
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

// Update profile image
export const updateProfileImage = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!req.file || !req.file.path) {
      return res.status(400).json({
        message: "No file uploaded. Use field name 'profilePicture'.",
      });
    }

    // delete old image from Cloudinary (optional but recommended)
    if (user.ProfilePicture) {
      try {
        // Extract public_id from the URL (the filename before extension)
        const publicIdMatch = user.ProfilePicture.match(
          /\/profile_pictures\/([^/.]+)/
        );
        if (publicIdMatch) {
          const publicId = `profile_pictures/${publicIdMatch[1]}`;
          await cloudinary.uploader.destroy(publicId);
        }
      } catch (error) {
        console.warn("Failed to delete old Cloudinary image:", error.message);
      }
    }

    // multer-storage-cloudinary may put the URL in secure_url, path, or url
    const imageUrl = req.file.secure_url || req.file.path;
    if (!imageUrl) {
      return res.status(500).json({
        message: "Uploaded file missing URL from Cloudinary",
      });
    }

    user.ProfilePicture = imageUrl;
    await user.save();
    console.log("Updated user data:", imageUrl);

    return res.json({
      message: "Profile image updated Successfully!",
      imageUrl,
      user: user.toJSON(),
    });
  } catch (error) {
    console.error("Error in updateProfileImage:", error);
    return res.status(500).json({ message: error.message || "Server error" });
  }
};

// Get profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: [
        "UserID",
        "FirstName",
        "LastName",
        "Email",
        "Address",
        "Phone",
        "ProfilePicture",
      ],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "User profile fetched successfully",
      user: user.toJSON(),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete profile img
export const deleteProfileImage = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.ProfilePicture) {
      return res.status(400).json({ message: "No profile image to delete" });
    }

    // Try deleting from Cloudinary
    try {
      const match = user.ProfilePicture.match(/\/profile_pictures\/([^/.]+)/);
      if (match) {
        const publicId = `profile_pictures/${match[1]}`;
        await cloudinary.uploader.destroy(publicId);
        console.log("Deleted Cloudinary image:", publicId);
      } else {
        console.warn(
          "Cloudinary public_id not found in URL:",
          user.ProfilePicture
        );
      }
    } catch (error) {
      console.warn("Error deleting Cloudinary image:", error.message);
    }

    // Remove image reference from DB
    user.ProfilePicture = null;
    await user.save();

    return res.json({ message: "Profile image deleted successfully" });
  } catch (error) {
    console.error("Error in deleteProfileImage:", error);
    return res.status(500).json({ message: error.message || "Server error" });
  }
};

// Logout (handled on client by deleting token)
export const logoutUser = async (_req, res) => {
  res.json({ message: "Logout successful (remove token client-side)" });
};
