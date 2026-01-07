import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import Category from "./src/models/Category.js";
import connectDB from "./src/config/database.js";
dotenv.config();

const PREDEFINED_CATEGORIES = [
  "Food",
  "Transportation",
  "Entertainment",
  "Bills",
  "Healthcare",
  "Shopping",
  "Other"
];

const seedCategories = async () => {
  try {

    await connectDB();

    for (const catName of PREDEFINED_CATEGORIES) {
      const exists = await Category.findOne({ name: catName, userId: null });

      if (!exists) {
        await Category.create({
          name: catName,
          userId: null,
          icon: "default-icon"
        });
        console.log(`Added category: ${catName}`.green.inverse);
      } else {
        console.log(`Category already exists: ${catName}`.yellow);
      }
    }

    console.log("Seeding Completed!".cyan.underline);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

seedCategories();