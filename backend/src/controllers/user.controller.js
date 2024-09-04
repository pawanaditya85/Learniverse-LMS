import User from "../models/user.models.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    console.log(users);
    return users;
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while fetching users" });
  }
};
