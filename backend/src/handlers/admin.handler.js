import express from "express";
import {
  createStudent,
  getStudents,
  createFaculty,
  getFaculties,
  createCourse,
  getCourses,
  assignFacultyToCourse,
  enrollStudentsInCourses,
} from "../controllers/admin.controller.js";

export const handleCreateStudent = async (req, res) => {
  try {
    const student = await createStudent(req.body);
    res.status(201).json(student);
  } catch (err) {
    console.error(err.message);
    if (err.name === "ValidationError") {
      res.status(400).json({ error: err.message });
    } else {
      res
        .status(500)
        .json({ error: "An error occurred while creating the student" });
    }
  }
};

export const handleGetStudents = async (req, res) => {
  try {
    const students = await getStudents();
    res.status(200).json(students);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the students" });
  }
};

export const handleCreateFaculty = async (req, res) => {
  try {
    const faculty = await createFaculty(req.body);
    res.status(201).json(faculty);
  } catch (err) {
    console.error(err.message);
    if (err.name === "ValidationError") {
      res.status(400).json({ error: err.message });
    } else {
      res
        .status(500)
        .json({ error: "An error occurred while creating the faculty" });
    }
  }
};

export const handleGetFaculty = async (req, res) => {
  try {
    const faculty = await getFaculties();
    res.status(200).json(faculty);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the faculty" });
  }
};

export const handleCreateCourse = async (req, res) => {
  try {
    console.log(req.body);
    const course = await createCourse(req.body);
    res.status(201).json(course);
  } catch (err) {
    console.error(err.message);
    if (err.name === "ValidationError") {
      res.status(400).json({ error: err.message });
    } else if (err.code === 11000) {
      res.status(400).json({ msg: "Course already exists in this semester" });
    } else {
      res.status(500).json({ error: `An error occurred : ${err.message}` });
    }
  }
};

export const handleGetCourses = async (req, res) => {
  try {
    const courses = await getCourses();
    res.status(200).json(courses);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the courses" });
  }
};

export const handleAssignFacultyToCourse = async (req, res) => {
  try {
    const { courseID, facultyID } = req.params;
    const course = await assignFacultyToCourse(courseID, facultyID);
    res.status(200).json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "An error occurred while assigning the faculty to the course",
    });
  }
};

export const handleEnrollStudentsInCourses = async (req, res) => {
  try {
    const { studentIds, courseIds } = req.body;
    const result = await enrollStudentsInCourses(studentIds, courseIds);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while enrolling students in courses" });
  }
};

const router = express.Router();

router.post("/student", handleCreateStudent);
router.get("/students", handleGetStudents);
router.post("/faculty", handleCreateFaculty);
router.get("/faculties", handleGetFaculty);
router.post("/course", handleCreateCourse);
router.get("/courses", handleGetCourses);
router.post(
  "/course/:courseID/faculty/:facultyID",
  handleAssignFacultyToCourse
);
router.post("/enroll", handleEnrollStudentsInCourses);

export default router;
