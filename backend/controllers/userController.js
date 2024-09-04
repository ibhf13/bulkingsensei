import { registerUserSchema, loginUserSchema } from "../validation/user.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";
import fs from "fs";

export const registerUser = async (req, res) => {
  try {
    const { error } = registerUserSchema.validate(req.body);
    if (error) return res.status(400).json({ msg: error.details[0].message });

    const { email, password } = req.body;

    console.log("Attempting to register user:", email); // Log the email

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    user = new User({ email, password });
    await user.save();

    console.log("User registered successfully:", email); // Log success

    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (err) {
    console.error("Error in registerUser:", err); // Detailed error logging
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt:", { email, password });

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Compare passwords (assuming you're not using bcrypt for now)
    if (password !== user.password) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Send back the user ID
    res.json({ userId: user._id.toString(), email: user.email });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

export const getUserInfo = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select(
      "-password -photoData -photoContentType"
    );

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    console.log("User info retrieved:", user);

    res.json(user);
  } catch (err) {
    console.error("Error in getUserInfo:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.userId;
    const updateData = req.body;

    // Remove any undefined or null values
    Object.keys(updateData).forEach((key) =>
      updateData[key] && typeof updateData[key] === "object"
        ? Object.keys(updateData[key]).forEach(
            (subKey) =>
              updateData[key][subKey] == null && delete updateData[key][subKey]
          )
        : updateData[key] == null && delete updateData[key]
    );

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // make sure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // limit file size to 5MB
  },
});

export const uploadPhoto = [
  upload.single("photo"), // 'photo' should match the field name in your form data
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ msg: "No file uploaded" });
      }

      console.log("Uploaded file:", req.file);

      const userId = req.userId;
      const photoPath = `/uploads/${req.file.filename}`; // Use the filename given by multer

      console.log("Photo path to be saved:", photoPath);

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          photoUrl: photoPath,
          // Remove these if you're not storing the file in the database
          // photoData: req.file.buffer,
          // photoContentType: req.file.mimetype
        },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ msg: "User not found" });
      }

      console.log("Updated user:", updatedUser);

      res.json({
        msg: "Photo uploaded successfully",
        photoUrl: photoPath,
      });
    } catch (err) {
      console.error("Error in uploadPhoto:", err);
      res.status(500).json({ msg: "Server error", error: err.message });
    }
  },
];

export const getPhoto = async (req, res) => {
  try {
    const userId = req.query.userId || req.userId;
    const user = await User.findById(userId);

    if (!user || !user.photoData) {
      return res.status(404).json({ msg: "Photo not found" });
    }

    res.set("Content-Type", user.photoContentType);
    res.send(user.photoData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
