import mongoose from "mongoose";

const Blog = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true},
  coverImage: { type: String, required: true },
  category: { type: String,required: true },
  userId: { type: String, required: true  },
});


export const UploadNewBlog = mongoose.model("Blog", Blog);
