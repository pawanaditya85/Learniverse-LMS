import express from "express";
import {
  getCourse,
  postAnnouncement,
  getAnnouncements,
  getEnrolledStudents,
  putIsPublished,
  addAssignment,
  getAssignments,
  addQuiz,
  getQuizzes,
  putAssignmentGrade,
  putQuizGrade,
  updateSyllabus,
} from "../controllers/course.controller.js";

export const handleGetCourse = async (req, res) => {
  try {
    const { courseID } = req.params;
    const course = await getCourse(courseID);
    res.status(200).json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "An error occurred while fetching the course with courseID",
    });
  }
};

export const handlePostAnnouncement = async (req, res) => {
  try {
    const { courseID } = req.params;
    const { title, description } = req.body;
    const course = await postAnnouncement(courseID, title, description);
    res.status(200).json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "An error occurred while posting the announcement",
    });
  }
};

export const handleGetAnnouncements = async (req, res) => {
  try {
    const { courseID } = req.params;
    const announcements = await getAnnouncements(courseID);
    res.status(200).json(announcements);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "An error occurred while fetching the course announcements",
    });
  }
};

export const handleGetEnrolledStudents = async (req, res) => {
  try {
    const { courseID } = req.params;
    const students = await getEnrolledStudents(courseID);
    res.status(200).json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "An error occurred while fetching the enrolled students",
    });
  }
};

export const handlePutIsPublished = async (req, res) => {
  try {
    const { courseID } = req.params;
    const { isPublished } = req.body;
    console.log(courseID, isPublished);
    const course = await putIsPublished(courseID, isPublished);
    res.status(200).json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "An error occurred while updating the course isPublished status",
    });
  }
};

export const handleAddAssignment = async (req, res) => {
  try {
    const { courseID } = req.params;
    const { title, description, dueDate, totalGrade } = req.body;
    const assignmentData = {
      title,
      description,
      dueDate,
      totalGrade,
    };
    const assignments = await addAssignment(courseID, assignmentData);
    res.status(200).json(assignments);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "An error occurred while adding the assignment to the course",
    });
  }
};

export const handleGetAssignments = async (req, res) => {
  try {
    const { courseID } = req.params;
    const assignments = await getAssignments(courseID);
    res.status(200).json(assignments);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "An error occurred while fetching the assignments of the course",
    });
  }
};

export const handleAddQuiz = async (req, res) => {
  try {
    const { courseID } = req.params;
    const { title, description, dueDate, totalGrade } = req.body;
    const quizData = {
      title,
      description,
      dueDate,
      totalGrade,
    };
    const quizzes = await addQuiz(courseID, quizData);
    res.status(200).json(quizzes);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "An error occurred while adding the quiz to the course",
    });
  }
};

export const handleGetQuizzes = async (req, res) => {
  try {
    const { courseID } = req.params;
    const quizzes = await getQuizzes(courseID);
    res.status(200).json(quizzes);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "An error occurred while fetching the quizzes of the course",
    });
  }
};

export const handlePutAssignmentGrade = async (req, res) => {
  try {
    const { grade } = req.body;
    const { assignmentID, studentID } = req.params;
    const assignment = await putAssignmentGrade(assignmentID, studentID, grade);
    res.status(200).json(assignment);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "An error occurred while updating grades for the assignment",
    });
  }
};

export const handlePutQuizGrade = async (req, res) => {
  try {
    const { grade } = req.body;
    const { quizID, studentID } = req.params;
    const quiz = await putQuizGrade(quizID, studentID, grade);
    res.status(200).json(quiz);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "An error occurred while updating grades for the quiz",
    });
  }
};

export const handleUpdateSyllabus = async (req, res) => {
  try {
    const { courseID } = req.params;
    const { syllabus } = req.body;
    const course = await updateSyllabus(courseID, syllabus);
    res.status(200).json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "An error occurred while updating the course syllabus",
    });
  }
};

const router = express.Router();

router.get("/:courseID", handleGetCourse);
router.post("/:courseID/announcement", handlePostAnnouncement);
router.get("/:courseID/announcements", handleGetAnnouncements);
router.get("/:courseID/students", handleGetEnrolledStudents);
router.put("/:courseID/isPublished", handlePutIsPublished);
router.put("/:courseID/assignment", handleAddAssignment);
router.get("/:courseID/assignments", handleGetAssignments);
router.put("/:courseID/quiz", handleAddQuiz);
router.get("/:courseID/quizzes", handleGetQuizzes);
router.put("/:courseID/syllabus", handleUpdateSyllabus);
router.put(
  "/grades/:studentID/assignment/:assignmentID",
  handlePutAssignmentGrade
);
router.put("/grades/:studentID/quiz/:quizID", handlePutQuizGrade);

// put grades to students
// get grades for students - overall grade for course

export default router;
