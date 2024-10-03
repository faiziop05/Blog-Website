import { registerUserModel } from "../models/registerUser.js";
export const getUserInfoByToken = async (req, res) => {
  try {
    const { id } = req.user; // User info from token
    const data = await registerUserModel.findOne({ _id: id });
    if (!data) {
      return res.status(400).json({ message: "User not found" });
    }

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};
