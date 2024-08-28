import mongoose from "mongoose";

const TrainingHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now },
  exercises: [
    {
      exerciseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exercise",
        required: true,
      },
      sets: { type: Number, required: true },
      reps: { type: Number, required: true },
      weight: { type: Number },
      duration: {
        value: { type: Number },
        unit: { type: String, enum: ["seconds", "minutes"] },
      },
    },
  ],
});

export default mongoose.model("TrainingHistory", TrainingHistorySchema);
