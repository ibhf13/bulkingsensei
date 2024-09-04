import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  personalInfo: {
    name: { type: String, default: "" },
    lastName: { type: String, default: "" },
    age: { type: Number, default: null },
    weight: { type: Number, default: null },
    height: { type: Number, default: null },
    bmi: { type: Number, default: null },
  },
  address: {
    street: { type: String, default: "" },
    houseNumber: { type: String, default: "" },
    plz: { type: String, default: "" },
    city: { type: String, default: "" },
  },
  photoUrl: { type: String, default: null },
  photoData: { type: Buffer },
  photoContentType: { type: String },
});

// Password hashing middleware
// UserSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

export default mongoose.model("User", UserSchema);
