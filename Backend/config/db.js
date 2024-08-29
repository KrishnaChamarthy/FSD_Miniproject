import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect("mongodb+srv://chamarthysr:Sep202004@main.vrdxx.mongodb.net/CollegeManagementSystem").then(() => console.log('DB Connected'));
}