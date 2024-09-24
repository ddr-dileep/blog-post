import mongoose from "mongoose";

export default async function databaseConnection() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!, {
      dbName: process.env.MONGODB_DBNAME,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:");
    process.exit(1);
  }
}
