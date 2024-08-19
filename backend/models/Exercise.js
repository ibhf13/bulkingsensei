import mongoose from "mongoose";

const ExerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  gifUrl: { type: String, required: true },
  defaultSets: { type: Number, required: true },
  defaultReps: { type: Number, required: true },
  weight: { type: Number, required: false },
});

export default mongoose.model("Exercise", ExerciseSchema);