import mongoose from "mongoose";

const TrainingHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now },
  exercises: [
    {
      exerciseId: { type: mongoose.Schema.Types.ObjectId, ref: "Exercise" },
      sets: Number,
      reps: Number,
      weight: Number,
    },
  ],
});

export default mongoose.model("TrainingHistory", TrainingHistorySchema);
