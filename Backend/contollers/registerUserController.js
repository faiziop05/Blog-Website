import { registerUserModel } from "../models/registerUser.js";
import jwt from 'jsonwebtoken';

export const SignUpUser = async (req, res) => {
  try {
    const { name, username, password } = req.body;
    const user = await registerUserModel.find({ email: username });
    if (user && user.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = new registerUserModel({
      name: name,
      email: username,
      password: password,
      role: "user",
    });
    await newUser.save();
    return res
      .status(200)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.log(error);
  }
};

export const SignInUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await registerUserModel.findOne({ email: username });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isValid = user.password==password;
    if (!isValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role }, // Include role in token payload
      process.env.JWT_SECRET,
    );
    return res.status(200).json({ token, role: user.role });
  } catch (error) {
    console.log(error);
  }
};
