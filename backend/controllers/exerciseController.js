import Exercise from "../models/Exercise.js";
import MuscleType from "../models/MuscleType.js";

export const getAllExercises = async (req, res) => {
  try {
    const exercises = await Exercise.find().populate("muscleType");
    res.json(exercises);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const getExerciseById = async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id).populate(
      "muscleType"
    );
    if (!exercise) return res.status(404).json({ msg: "Exercise not found" });
    res.json(exercise);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const getAllMuscleTypes = async (req, res) => {
  try {
    const muscleTypes = await MuscleType.find();
    res.json(muscleTypes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const getExercisesByMuscleType = async (req, res) => {
  try {
    const exercises = await Exercise.find({
      muscleType: req.params.muscleTypeId,
    }).populate("muscleType");
    res.json(exercises);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
