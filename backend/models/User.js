import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import e from "express";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  routines: [{ type: mongoose.Schema.Types.ObjectId, ref: "Routine" }],
});

// Password hashing middleware
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export default mongoose.model("User", UserSchema);
