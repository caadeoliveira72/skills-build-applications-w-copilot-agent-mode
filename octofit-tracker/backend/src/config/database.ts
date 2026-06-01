import mongoose from "mongoose";

export const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/octofit_db";

export async function connectDatabase(): Promise<void> {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  await mongoose.connect(MONGO_URI);
  console.log(`Connected to MongoDB database: octofit_db`);
}
