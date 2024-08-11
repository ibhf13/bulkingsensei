import dotenv from "dotenv";
import mongoose from "mongoose";
import Routine from "../models/Routine.js";
import connectDB from "../config/db.js";

export const seedRoutines = async () => {
  await connectDB();

  const routines = [
    {
      userId: "60d5ec49d4f60c001dfba3b7", // Replace with a valid user ID
      name: "Morning Chest Routine",
      exercises: [
        {
          exerciseId: "60d5ec49d4f60c001dfba3b8", // Replace with a valid exercise ID
          sets: 4,
          reps: 12,
          weight: 60,
        },
        {
          exerciseId: "60d5ec49d4f60c001dfba3b9", // Replace with a valid exercise ID
          sets: 3,
          reps: 10,
          weight: 50,
        },
      ],
    },
    {
      userId: "60d5ec49d4f60c001dfba3b7", // Replace with a valid user ID
      name: "Evening Leg Routine",
      exercises: [
        {
          exerciseId: "60d5ec49d4f60c001dfba3c0", // Replace with a valid exercise ID
          sets: 5,
          reps: 10,
          weight: 100,
        },
        {
          exerciseId: "60d5ec49d4f60c001dfba3c1", // Replace with a valid exercise ID
          sets: 4,
          reps: 12,
          weight: 80,
        },
      ],
    },
  ];

  try {
    await Routine.insertMany(routines);
    console.log("Routine data has been added successfully.");
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close();
  }
};
