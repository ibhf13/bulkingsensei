import Exercise from "../models/Exercise.js";

export const getAllExercises = async (req, res) => {
  try {
    const exercises = await Exercise.find();
    // res.json(exercises);
    res.json({
      message: `Hello!`,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const getExerciseById = async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    if (!exercise) return res.status(404).json({ msg: "Exercise not found" });

    res.json(exercise);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
