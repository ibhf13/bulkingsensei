import dotenv from "dotenv";
import mongoose from "mongoose";
import Exercise from "../models/Exercise.js";
import connectDB from "../config/db.js";

export const seedExercises = async () => {
  await connectDB();

  const exercises = [
    // Chest exercises
    {
      name: "Bench Press",
      description: "Chest exercise",
      gifUrl: "url_to_gif",
      defaultSets: 3,
      defaultReps: 10,
      weight: 50, //kg
    },
    {
      name: "Push-ups",
      description: "Chest exercise",
      gifUrl: "url_to_gif",
      defaultSets: 3,
      defaultReps: 15,
    },
    {
      name: "Chest Fly",
      description: "Chest exercise",
      gifUrl: "url_to_gif",
      defaultSets: 3,
      defaultReps: 12,
      weight: 10,
    },
    {
      name: "Incline Bench Press",
      description: "Chest exercise",
      gifUrl: "url_to_gif",
      defaultSets: 3,
      defaultReps: 10,
      weight: 45,
    },

    // Back exercises
    {
      name: "Pull-ups",
      description: "Back exercise",
      gifUrl: "url_to_gif",
      defaultSets: 3,
      defaultReps: 8,
    },
    {
      name: "Deadlift",
      description: "Back exercise",
      gifUrl: "url_to_gif",
      defaultSets: 3,
      defaultReps: 6,
      weight: 100,
    },
    {
      name: "Bent-over Row",
      description: "Back exercise",
      gifUrl: "url_to_gif",
      defaultSets: 3,
      defaultReps: 10,
      weight: 40,
    },
    {
      name: "Lat Pulldown",
      description: "Back exercise",
      gifUrl: "url_to_gif",
      defaultSets: 3,
      defaultReps: 12,
      weight: 30,
    },

    // Leg exercises
    {
      name: "Squats",
      description: "Leg exercise",
      gifUrl: "url_to_gif",
      defaultSets: 3,
      defaultReps: 10,
      weight: 80,
    },
    {
      name: "Lunges",
      description: "Leg exercise",
      gifUrl: "url_to_gif",
      defaultSets: 3,
      defaultReps: 12,
      weight: 20,
    },
    {
      name: "Leg Press",
      description: "Leg exercise",
      gifUrl: "url_to_gif",
      defaultSets: 3,
      defaultReps: 10,
      weight: 200,
    },
    {
      name: "Deadlift",
      description: "Leg exercise",
      gifUrl: "url_to_gif",
      defaultSets: 3,
      defaultReps: 6,
      weight: 100,
    },

    // Shoulder exercises
    {
      name: "Shoulder Press",
      description: "Shoulder exercise",
      gifUrl: "url_to_gif",
      defaultSets: 3,
      defaultReps: 10,
      weight: 25,
    },
    {
      name: "Lateral Raise",
      description: "Shoulder exercise",
      gifUrl: "url_to_gif",
      defaultSets: 3,
      defaultReps: 12,
      weight: 5,
    },
    {
      name: "Front Raise",
      description: "Shoulder exercise",
      gifUrl: "url_to_gif",
      defaultSets: 3,
      defaultReps: 12,
      weight: 5,
    },
    {
      name: "Shrugs",
      description: "Shoulder exercise",
      gifUrl: "url_to_gif",
      defaultSets: 3,
      defaultReps: 10,
      weight: 30,
    },

    // Bicep exercises
    {
      name: "Bicep Curl",
      description: "Bicep exercise",
      gifUrl: "url_to_gif",
      defaultSets: 3,
      defaultReps: 10,
      weight: 15,
    },
    {
      name: "Hammer Curl",
      description: "Bicep exercise",
      gifUrl: "url_to_gif",
      defaultSets: 3,
      defaultReps: 10,
      weight: 15,
    },
    {
      name: "Concentration Curl",
      description: "Bicep exercise",
      gifUrl: "url_to_gif",
      defaultSets: 3,
      defaultReps: 12,
      weight: 10,
    },
    {
      name: "Cable Curl",
      description: "Bicep exercise",
      gifUrl: "url_to_gif",
      defaultSets: 3,
      defaultReps: 12,
      weight: 20,
    },

    // Tricep exercises
    {
      name: "Tricep Dips",
      description: "Tricep exercise",
      gifUrl: "url_to_gif",
      defaultSets: 3,
      defaultReps: 12,
    },
    {
      name: "Tricep Pushdown",
      description: "Tricep exercise",
      gifUrl: "url_to_gif",
      defaultSets: 3,
      defaultReps: 10,
      weight: 25,
    },
    {
      name: "Skull Crushers",
      description: "Tricep exercise",
      gifUrl: "url_to_gif",
      defaultSets: 3,
      defaultReps: 10,
      weight: 30,
    },
    {
      name: "Close-grip Bench Press",
      description: "Tricep exercise",
      gifUrl: "url_to_gif",
      defaultSets: 3,
      defaultReps: 10,
      weight: 50,
    },

    // Abs exercises
    {
      name: "Crunches",
      description: "Abs exercise",
      gifUrl: "url_to_gif",
      defaultSets: 3,
      defaultReps: 15,
    },
    {
      name: "Plank",
      description: "Abs exercise",
      gifUrl: "url_to_gif",
      defaultSets: 3,
      defaultReps: 60, // seconds
    },
    {
      name: "Leg Raises",
      description: "Abs exercise",
      gifUrl: "url_to_gif",
      defaultSets: 3,
      defaultReps: 12,
    },
    {
      name: "Russian Twists",
      description: "Abs exercise",
      gifUrl: "url_to_gif",
      defaultSets: 3,
      defaultReps: 20,
    },

    // Cardio exercises
    {
      name: "Running",
      description: "Cardio exercise",
      gifUrl: "url_to_gif",
      defaultSets: 1,
      defaultReps: 30, // 30 minutes
    },
    {
      name: "Cycling",
      description: "Cardio exercise",
      gifUrl: "url_to_gif",
      defaultSets: 1,
      defaultReps: 45, // 45 minutes
    },
    {
      name: "Jump Rope",
      description: "Cardio exercise",
      gifUrl: "url_to_gif",
      defaultSets: 3,
      defaultReps: 100, // 100 skips per set
    },
    {
      name: "Rowing",
      description: "Cardio exercise",
      gifUrl: "url_to_gif",
      defaultSets: 1,
      defaultReps: 20, // 20 minutes
    },
  ];

  try {
    await Exercise.insertMany(exercises);
    console.log("Exercise data has been added successfully.");
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close();
  }
};
