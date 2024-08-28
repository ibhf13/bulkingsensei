import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      // @ts-ignore
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully.");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

// Muscle Type model
const MuscleTypeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: false },
});

const MuscleType = mongoose.model("MuscleType", MuscleTypeSchema);

// Exercise model
const ExerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  gifUrl: { type: String, required: true },
  defaultSets: { type: Number, required: true },
  defaultReps: { type: Number, required: true },
  weight: { type: Number, required: false },
  muscleType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MuscleType",
    required: true,
  },
});

const Exercise = mongoose.model("Exercise", ExerciseSchema);

const seedDatabase = async () => {
  await connectDB();

  // First, let's create muscle types
  const muscleTypes = [
    { name: "Chest", description: "Exercises for chest muscles" },
    { name: "Back", description: "Exercises for back muscles" },
    { name: "Legs", description: "Exercises for leg muscles" },
    { name: "Shoulders", description: "Exercises for shoulder muscles" },
    { name: "Biceps", description: "Exercises for bicep muscles" },
    { name: "Triceps", description: "Exercises for tricep muscles" },
    { name: "Abs", description: "Exercises for abdominal muscles" },
    { name: "Cardio", description: "Cardiovascular exercises" },
  ];

  let muscleTypeIds;

  try {
    await MuscleType.deleteMany({});
    const createdMuscleTypes = await MuscleType.insertMany(muscleTypes);
    muscleTypeIds = createdMuscleTypes.reduce((acc, muscleType) => {
      acc[muscleType.name] = muscleType._id;
      return acc;
    }, {});

    console.log("Muscle types have been added successfully.");
  } catch (err) {
    console.error("Error adding muscle types:", err);
    mongoose.connection.close();
    return;
  }

  const exercises = [
    // Chest exercises
    {
      name: "Bench Press",
      description:
        "Lying on a bench, lower a weighted barbell to chest level, then push it back up.",
      gifUrl: "url_to_bench_press_gif",
      defaultSets: 3,
      defaultReps: 10,
      weight: 50,
      muscleType: muscleTypeIds["Chest"],
    },
    {
      name: "Push-ups",
      description:
        "Standard bodyweight exercise. Lower your body to the ground and push back up.",
      gifUrl: "url_to_pushups_gif",
      defaultSets: 3,
      defaultReps: 15,
      muscleType: muscleTypeIds["Chest"],
    },
    // Back exercises
    {
      name: "Pull-ups",
      description:
        "Hang from a bar and pull your body up until your chin is over the bar.",
      gifUrl: "url_to_pullups_gif",
      defaultSets: 3,
      defaultReps: 8,
      muscleType: muscleTypeIds["Back"],
    },
    {
      name: "Deadlift",
      description:
        "Lift a weighted barbell off the ground to hip level, then lower it back down.",
      gifUrl: "url_to_deadlift_gif",
      defaultSets: 3,
      defaultReps: 6,
      weight: 100,
      muscleType: muscleTypeIds["Back"],
    },
    // Leg exercises
    {
      name: "Squats",
      description:
        "Lower your body as if sitting back into a chair, then stand back up.",
      gifUrl: "url_to_squats_gif",
      defaultSets: 3,
      defaultReps: 10,
      weight: 80,
      muscleType: muscleTypeIds["Legs"],
    },
    {
      name: "Lunges",
      description:
        "Step forward and lower your body until both knees are bent at 90-degree angles.",
      gifUrl: "url_to_lunges_gif",
      defaultSets: 3,
      defaultReps: 12,
      weight: 20,
      muscleType: muscleTypeIds["Legs"],
    },
    // Shoulder exercises
    {
      name: "Shoulder Press",
      description:
        "Push a weighted barbell or dumbbells overhead from shoulder level.",
      gifUrl: "url_to_shoulder_press_gif",
      defaultSets: 3,
      defaultReps: 10,
      weight: 25,
      muscleType: muscleTypeIds["Shoulders"],
    },
    {
      name: "Lateral Raise",
      description:
        "Raise dumbbells out to the sides until arms are parallel with the ground.",
      gifUrl: "url_to_lateral_raise_gif",
      defaultSets: 3,
      defaultReps: 12,
      weight: 5,
      muscleType: muscleTypeIds["Shoulders"],
    },
    // Bicep exercises
    {
      name: "Bicep Curl",
      description:
        "Curl a dumbbell or barbell from a hanging position to shoulder level.",
      gifUrl: "url_to_bicep_curl_gif",
      defaultSets: 3,
      defaultReps: 10,
      weight: 15,
      muscleType: muscleTypeIds["Biceps"],
    },
    {
      name: "Hammer Curl",
      description:
        "Similar to a bicep curl, but with palms facing each other throughout the movement.",
      gifUrl: "url_to_hammer_curl_gif",
      defaultSets: 3,
      defaultReps: 10,
      weight: 15,
      muscleType: muscleTypeIds["Biceps"],
    },
    // Tricep exercises
    {
      name: "Tricep Dips",
      description: "Lower and raise your body using parallel bars or a bench.",
      gifUrl: "url_to_tricep_dips_gif",
      defaultSets: 3,
      defaultReps: 12,
      muscleType: muscleTypeIds["Triceps"],
    },
    {
      name: "Tricep Pushdown",
      description:
        "Push a cable attachment down from chest level to thigh level.",
      gifUrl: "url_to_tricep_pushdown_gif",
      defaultSets: 3,
      defaultReps: 10,
      weight: 25,
      muscleType: muscleTypeIds["Triceps"],
    },
    // Abs exercises
    {
      name: "Crunches",
      description:
        "Lie on your back and lift your shoulders off the ground, engaging your core.",
      gifUrl: "url_to_crunches_gif",
      defaultSets: 3,
      defaultReps: 15,
      muscleType: muscleTypeIds["Abs"],
    },
    {
      name: "Plank",
      description: "Hold a push-up position with your body in a straight line.",
      gifUrl: "url_to_plank_gif",
      defaultSets: 3,
      defaultReps: 60, // seconds
      muscleType: muscleTypeIds["Abs"],
    },
    // Cardio exercises
    {
      name: "Running",
      description: "Continuous running at a steady pace.",
      gifUrl: "url_to_running_gif",
      defaultSets: 1,
      defaultReps: 30, // 30 minutes
      muscleType: muscleTypeIds["Cardio"],
    },
    {
      name: "Jump Rope",
      description: "Jumping over a rope swung beneath your feet.",
      gifUrl: "url_to_jump_rope_gif",
      defaultSets: 3,
      defaultReps: 100, // 100 skips per set
      muscleType: muscleTypeIds["Cardio"],
    },
  ];

  try {
    await Exercise.deleteMany({});
    await Exercise.insertMany(exercises);
    console.log("Exercise data has been added successfully.");
  } catch (err) {
    console.error("Error adding exercises:", err);
  } finally {
    mongoose.connection.close();
  }
};

// Run the seed function
seedDatabase().then(() => console.log("Seeding completed."));
