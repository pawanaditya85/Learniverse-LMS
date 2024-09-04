import express from "express";
import { getAllUsers } from "../controllers/user.controller.js";

export const handleGetAllUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while fetching users" });
  }
};

const router = express.Router();

router.get("/", handleGetAllUsers);

export default router;
