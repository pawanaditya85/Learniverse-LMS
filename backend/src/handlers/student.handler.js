import express from "express";
import {
  getStudentCourses,
  getCourseDetails,
  getCourseAssignments,
  getCourseQuizzes,
  getCourseGrade,
  getStudentProfile,
  updateStudentProfile,
} from "../controllers/student.controller.js";

export const handleGetStudentCourses = async (req, res) => {
  try {
    console.log("handleGetStudentCourses handler");
    console.log(req.params);
    const courses = await getStudentCourses(req, res);
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while fetching courses" });
  }
};

export const handleGetCourseDetails = async (req, res) => {
  try {
    const course = await getCourseDetails(req, res);
    res.json(course);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the course" });
  }
};

export const handleGetCourseAssignments = async (req, res) => {
  try {
    const assignments = await getCourseAssignments(req, res);
    res.json(assignments);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching assignments" });
  }
};

export const handleGetCourseQuizzes = async (req, res) => {
  try {
    const quizzes = await getCourseQuizzes(req, res);
    res.json(quizzes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while fetching quizzes" });
  }
};

export const handleGetCourseGrade = async (req, res) => {
  try {
    const grade = await getCourseGrade(req, res);
    res.json(grade);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the grade" });
  }
};

export const handleGetStudentProfile = async (req, res) => {
  try {
    const profile = await getStudentProfile(req, res);
    res.json(profile);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the profile" });
  }
};

export const handleUpdateStudentProfile = async (req, res) => {
  try {
    const profile = await updateStudentProfile(req, res);
    res.json(profile);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while updating the profile" });
  }
};

const router = express.Router();

router.get("/:studentId/courses", handleGetStudentCourses);
router.get("/:studentId/courses/:courseId", handleGetCourseDetails);
router.get("/:studentId/courses/:courseId/assignments",handleGetCourseAssignments);
router.get("/:studentId/courses/:courseId/quizzes", handleGetCourseQuizzes);
router.get("/:studentId/courses/:courseId/grades", handleGetCourseGrade);
router.route("/:studentId/profile").get(handleGetStudentProfile).put(handleUpdateStudentProfile);

export default router;
