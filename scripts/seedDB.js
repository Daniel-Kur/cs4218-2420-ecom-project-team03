import mongoose from "mongoose";
import dotenv from "dotenv";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";

dotenv.config();

const MONGO_URI = "mongodb+srv://admin:admin@cluster0.3nndz.mongodb.net/";

const seedUsers = async (count = 10000) => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    const users = [];

    for (let i = 0; i < count; i++) {
      const password = await bcrypt.hash("password123", 10);
      users.push({
        name: faker.person.fullName(),
        email: `user${i}@example.com`,
        password,
        phone: faker.phone.number("08##########"),
        address: faker.location.city(),
        answer: "blue",
      });      
    }

    await userModel.insertMany(users);
    console.log(`${count} users seeded successfully!`);

    mongoose.disconnect();
  } catch (err) {
    console.error("Seeding failed:", err);
    mongoose.disconnect();
  }
};

seedUsers();
