import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";
import bcrypt from "bcrypt";

dotenv.config();

const seedUsers = [
  {
    email: "alkan@example.com",
    password: "password123",
    personalInfo: {
      age: 28,
      weight: 80,
      height: 180,
      bmi: 24.7,
    },
    address: {
      street: "Hauptstraße",
      houseNumber: "123",
      plz: "10115",
      city: "Berlin",
    },
    photoUrl: "https://example.com/photo1.jpg",
  },
  {
    email: "wolfgang@example.com",
    password: "password456",
    personalInfo: {
      age: 32,
      weight: 65,
      height: 165,
      bmi: 23.9,
    },
    address: {
      street: "Friedrichstraße",
      houseNumber: "45",
      plz: "20354",
      city: "Hamburg",
    },
    photoUrl: "https://example.com/photo2.jpg",
  },
  {
    email: "bob@example.com",
    password: "password789",
    personalInfo: {
      age: 24,
      weight: 75,
      height: 175,
      bmi: 24.5,
    },
    address: {
      street: "Königsallee",
      houseNumber: "67",
      plz: "40212",
      city: "Düsseldorf",
    },
    photoUrl: "https://example.com/photo3.jpg",
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    await User.deleteMany({});
    console.log("Deleted existing users");

    for (const userData of seedUsers) {
      // const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = new User({
        ...userData,
      });

      await user.save();
    }

    console.log("Seed data inserted successfully");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
