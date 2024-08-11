import Routine from "../models/Routine.js";
import { routineSchema } from "../validation/routine.js";

export const createRoutine = async (req, res) => {
  const { error } = routineSchema.validate(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  const { name, exercises } = req.body;

  try {
    const routine = new Routine({
      userId: req.user.userId,
      name,
      exercises,
    });

    await routine.save();
    res.json(routine);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const updateRoutine = async (req, res) => {
  const { error } = routineSchema.validate(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  const { name, exercises } = req.body;

  try {
    let routine = await Routine.findById(req.params.id);
    if (!routine) return res.status(404).json({ msg: "Routine not found" });

    if (routine.userId.toString() !== req.user.userId) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    routine.name = name || routine.name;
    routine.exercises = exercises || routine.exercises;

    await routine.save();
    res.json(routine);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const getAllRoutines = async (req, res) => {
  try {
    const routines = await Routine.find({ userId: req.user.userId });
    res.json(routines);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const deleteRoutine = async (req, res) => {
  try {
    let routine = await Routine.findById(req.params.id);
    if (!routine) return res.status(404).json({ msg: "Routine not found" });

    // Ensure the routine belongs to the user
    if (routine.userId.toString() !== req.user.userId) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    await routine.remove();
    res.json({ msg: "Routine removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
