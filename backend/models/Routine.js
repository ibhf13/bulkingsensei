import mongoose from "mongoose";

const RoutineSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  exercises: [
    {
      exerciseId: { type: mongoose.Schema.Types.ObjectId, ref: "Exercise" },
      sets: Number,
      reps: Number,
      weight: Number,
    },
  ],
});

export default mongoose.model("Routine", RoutineSchema);
