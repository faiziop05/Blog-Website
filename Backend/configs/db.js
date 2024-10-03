import mongoose from "mongoose";
const dbUrl = "mongodb://localhost:27017/Blog";
export const database = () => {
  mongoose
    .connect(dbUrl, {
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("MongoDB connection error:", error));
};
