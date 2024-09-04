import express from "express";
import {
  getCoursesTaughtByFaculty,
  getFaculty,
  updateDepartment,
} from "../controllers/faculty.controller.js";

export const handleGetFaculty = async (req, res) => {
  try {
    const { facultyID } = req.params;
    const faculty = await getFaculty(facultyID);
    res.status(200).json(faculty);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: `An error occurred while fetching the courses taught by facultyID : ${facultyID}`,
    });
  }
};

export const handleGetCoursesTaughtByFaculty = async (req, res) => {
  try {
    const { facultyID } = req.params;
    const courses = await getCoursesTaughtByFaculty(facultyID);
    res.status(200).json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: `An error occurred while fetching the courses taught by facultyID : ${facultyID}`,
    });
  }
};

export const handleUpdateDepartment = async (req, res) => {
  try {
    const { facultyID } = req.params;
    const { department } = req.body;
    const faculty = await updateDepartment(facultyID, department);
    res.status(200).json(faculty);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: `An error occurred while fetching the courses taught by facultyID : ${facultyID}`,
    });
  }
};

const router = express.Router();

router.get("/:facultyID", handleGetFaculty);
router.get("/:facultyID/courses", handleGetCoursesTaughtByFaculty);
router.put("/:facultyID/department", handleUpdateDepartment);

export default router;
