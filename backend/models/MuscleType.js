import mongoose from "mongoose";

const MuscleTypeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: false },
});

export default mongoose.model("MuscleType", MuscleTypeSchema);
