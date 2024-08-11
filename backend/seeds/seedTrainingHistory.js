import dotenv from "dotenv";
import mongoose from "mongoose";
import TrainingHistory from "../models/TrainingHistory.js";
import connectDB from "../config/db.js";

export const seedTrainingHistory = async () => {
  await connectDB();

  const trainingHistories = [
    {
      userId: "60d5ec49d4f60c001dfba3b7", // Replace with a valid user ID
      date: new Date(),
      exercises: [
        {
          exerciseId: "60d5ec49d4f60c001dfba3b8", // Replace with a valid exercise ID
          sets: 3,
          reps: 12,
          weight: 60,
        },
        {
          exerciseId: "60d5ec49d4f60c001dfba3c1", // Replace with a valid exercise ID
          sets: 4,
          reps: 10,
          weight: 50,
        },
      ],
    },
    {
      userId: "60d5ec49d4f60c001dfba3b7", // Replace with a valid user ID
      date: new Date(),
      exercises: [
        {
          exerciseId: "60d5ec49d4f60c001dfba3c0", // Replace with a valid exercise ID
          sets: 4,
          reps: 8,
          weight: 100,
        },
        {
          exerciseId: "60d5ec49d4f60c001dfba3c1", // Replace with a valid exercise ID
          sets: 3,
          reps: 12,
          weight: 80,
        },
      ],
    },
  ];

  try {
    await TrainingHistory.insertMany(trainingHistories);
    console.log("Training history data has been added successfully.");
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close();
  }
};
