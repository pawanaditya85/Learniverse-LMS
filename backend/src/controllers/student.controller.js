import Student from "../models/student.models.js";
import Course from "../models/course.models.js";

// Retrieve a list of courses enrolled by the student
export const getStudentCourses = async (req, res) => {
  try {
    console.log("getStudentCourses controller");
    const student = await Student.findById(req.params.studentId).populate(
      "enrolledCourses"
    );
    res.json(student.enrolledCourses);
  } catch (err) {
    res.status(500).json({ error: "An error occurred while fetching courses" });
  }
};

// Retrieve details of a specific enrolled course
export const getCourseDetails = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    res.json(course);
  } catch (err) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the course" });
  }
};

// Retrieve a list of published assignments for a course
export const getCourseAssignments = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    const assignments = course.content.filter(
      (item) => item.type === "Assignment"
    );
    res.json(assignments);
  } catch (err) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching assignments" });
  }
};

// Retrieve a list of published quizzes for a course
export const getCourseQuizzes = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    const quizzes = course.content.filter((item) => item.type === "Quiz");
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: "An error occurred while fetching quizzes" });
  }
};

// Retrieve the student's grade for a specific course
export const getCourseGrade = async (req, res) => {
  try {
    const { studentId, courseId } = req.params;
    const course = await Course.findById(courseId)
      .populate("assignments")
      .populate("quizzes");

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    let scoredGrade = 0;
    let totalGrade = 0;

    // Compute the total grade from assignments
    console.log("course");
    console.log(course);

    for (const assignment of course.assignments) {
      const submission = assignment.submissions.find(
        (sub) => sub.student.toString() === studentId && sub.status === "Graded"
      );
      totalGrade += assignment.totalGrade;
      if (submission) {
        console.log("submission Assignment");
        console.log(submission);
        scoredGrade += submission.grade;
      }
    }

    // Compute the total grade from quizzes
    for (const quiz of course.quizzes) {
      const submission = quiz.submissions.find(
        (sub) => sub.student.toString() === studentId && sub.status === "Graded"
      );
      totalGrade += quiz.totalGrade;
      if (submission) {
        console.log("submission quiz");
        console.log(submission);
        scoredGrade += submission.grade;
      }
    }

    res.json({ scoredGrade, totalGrade });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the grade" });
  }
};

// Retrieve or update the student's profile information
export const getStudentProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId);
    res.json(student.profile);
  } catch (err) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the profile" });
  }
};

export const updateStudentProfile = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.studentId,
      { profile: req.body },
      { new: true }
    );
    res.json(student.profile);
  } catch (err) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the profile" });
  }
};
