import mongoose from "mongoose";
import bcrypt from "bcrypt";
const registerUser = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

registerUser.methods.isPasswordValid = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const registerUserModel = mongoose.model("User", registerUser);
