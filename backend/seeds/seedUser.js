import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import User from "../models/User.js";

export const seedUsers = async () => {
  await connectDB();

  const users = [
    {
      email: "john.doe@example.com",
      password: "password123", // This will be hashed automatically
      age: 28,
      weight: 75,
      height: 180,
      bmi: 23.1,
      address: "123 Fitness St, Workout City, CA",
      routines: [], // Add valid routine IDs if available
    },
    {
      email: "jane.smith@example.com",
      password: "password456", // This will be hashed automatically
      age: 32,
      weight: 68,
      height: 165,
      bmi: 24.9,
      address: "456 Health Ave, Gymtown, TX",
      routines: [], // Add valid routine IDs if available
    },
  ];

  try {
    await User.insertMany(users);
    console.log("User data has been added successfully.");
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close();
  }
};
