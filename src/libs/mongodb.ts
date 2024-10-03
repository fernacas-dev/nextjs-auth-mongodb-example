import mongoose from "mongoose";

const { MONGO_URI } = process.env;

if (!MONGO_URI) {
  console.log("Please define a MongoDB connection");
  process.exit(1);
}

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error}`);
    process.exit(1);
  }
};
