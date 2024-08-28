import dotenv from "dotenv";
import mongoose from "mongoose";
import TrainingHistory from "../models/TrainingHistory.js";
import User from "../models/User.js";
import Exercise from "../models/Exercise.js";
import connectDB from "../config/mongoose.js";

dotenv.config();

export const seedTrainingHistory = async () => {
  await connectDB();

  try {
    const users = await User.find().limit(2);
    const exercises = await Exercise.find().limit(4);

    if (users.length === 0 || exercises.length === 0) {
      console.error(
        "No users or exercises found. Please seed users and exercises first."
      );
      return;
    }

    console.log(
      `Found ${users.length} users and ${exercises.length} exercises.`
    );

    const trainingHistories = [];

    for (let i = 0; i < 10; i++) {
      const user = users[Math.floor(Math.random() * users.length)];
      const date = new Date();
      date.setDate(date.getDate() - i);

      const sessionExercises = exercises.map((exercise) => ({
        exerciseId: exercise._id,
        sets: Math.floor(Math.random() * 3) + 2,
        reps: Math.floor(Math.random() * 8) + 8,
        weight: Math.floor(Math.random() * 50) + 50,
      }));

      trainingHistories.push({
        userId: user._id,
        date: date,
        exercises: sessionExercises,
      });
    }

    await TrainingHistory.deleteMany({});
    console.log("Deleted existing training history data.");

    const insertedData = await TrainingHistory.insertMany(trainingHistories);
    console.log(`Inserted ${insertedData.length} training history records.`);
    console.log(
      "Sample inserted data:",
      JSON.stringify(insertedData[0], null, 2)
    );

    const count = await TrainingHistory.countDocuments();
    console.log(`Total training history records in database: ${count}`);
  } catch (err) {
    console.error("Error seeding training history:", err);
  } finally {
    mongoose.connection.close();
  }
};

seedTrainingHistory();
