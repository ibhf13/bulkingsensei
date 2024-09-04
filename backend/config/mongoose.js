import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let isConnected;

const connectMongooseDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = mongoose.connection.readyState === 1;
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("Error connecting to MongoDB", err);
    throw err;
  }
};

export default connectMongooseDB;
