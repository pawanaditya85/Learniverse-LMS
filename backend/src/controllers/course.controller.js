import Course from "../models/course.models.js";
import Assignment from "../models/assignment.model.js";
import Quiz from "../models/quiz.model.js";

export const getCourse = async (courseID) => {
  const course = await Course.findById(courseID)
    .populate("faculty")
    .populate("announcements")
    .populate("assignments")
    .populate("quizzes");
  return course;
};

export const postAnnouncement = async (courseID, title, description) => {
  const course = await Course.findById(courseID);
  if (!course) {
    throw new Error("Course not found");
  }

  const newAnnouncement = {
    title,
    description,
  };

  course.announcements.push(newAnnouncement);
  await course.save();
  return course;
};

export const getAnnouncements = async (courseID) => {
  const course = await Course.findById(courseID);
  if (!course) {
    throw new Error("Course not found");
  }
  return course.announcements;
};

export const getEnrolledStudents = async (courseID) => {
  const course = await Course.findById(courseID).populate("students");
  if (!course) {
    throw new Error("Course not found");
  }
  return course.students;
};

export const getUpdatedPublished = async (courseID) => {
  const course = await Course.findById(courseID).populate("students");
  if (!course) {
    throw new Error("Course not found");
  }
  return course.students;
};

export const putIsPublished = async (courseID, isPublished) => {
  const course = await Course.findById(courseID);
  if (!course) {
    throw new Error("Course not found");
  }
  course.isPublished = isPublished;
  await course.save();
  return course;
};

export const addAssignment = async (courseID, assignmentData) => {
  try {
    const course = await Course.findById(courseID);
    if (!course) {
      throw new Error("Course not found");
    }

    const assignment = new Assignment(assignmentData);
    assignment.course = courseID;
    // Create a submission for each student
    for (const student of course.students) {
      assignment.submissions.push({ student: student._id });
    }

    // Save the assignment
    await assignment.save();

    // Then push the assignment to the course's assignments array
    course.assignments.push(assignment);
    await course.save();

    return course.assignments;
  } catch (error) {
    throw error;
  }
};

export const getAssignments = async (courseID) => {
  const course = await Course.findById(courseID).populate("assignments");
  if (!course) {
    throw new Error("Course not found");
  }

  return course.assignments;
};

export const addQuiz = async (courseID, quizData) => {
  try {
    const course = await Course.findById(courseID);
    if (!course) {
      throw new Error("Course not found");
    }

    const quiz = new Quiz(quizData);
    quiz.course = courseID;
    // Create a submission for each student
    for (const student of course.students) {
      quiz.submissions.push({ student: student._id });
    }

    // Save the assignment
    await quiz.save();

    course.quizzes.push(quiz);
    await course.save();

    return course.quizzes;
  } catch (error) {
    throw error;
  }
};

export const getQuizzes = async (courseID) => {
  const course = await Course.findById(courseID).populate("quizzes");
  if (!course) {
    throw new Error("Course not found");
  }
  return course.quizzes;
};

export const putAssignmentGrade = async (assignmentID, studentID, grade) => {
  const assignment = await Assignment.findById(assignmentID);
  if (!assignment) {
    throw new Error("Assignment not found");
  }

  const submission = assignment.submissions.find(
    (sub) => sub.student.toString() === studentID
  );
  if (!submission) {
    throw new Error("Submission not found");
  }

  submission.grade = grade;
  submission.status = "Graded";
  await assignment.save();

  console.log(assignment.submissions);

  return assignment;
};

export const putQuizGrade = async (quizID, studentID, grade) => {
  const quiz = await Quiz.findById(quizID);
  if (!quiz) {
    throw new Error("Quiz not found");
  }

  const submission = quiz.submissions.find(
    (sub) => sub.student.toString() === studentID
  );
  if (!submission) {
    throw new Error("Submission not found");
  }

  submission.grade = grade;
  submission.status = "Graded";
  await quiz.save();

  return quiz;
};

export const updateSyllabus = async (courseID, syllabus) => {
  try {
    const course = await Course.findById(courseID);
    if (!course) {
      throw new Error("Course not found");
    }

    course.syllabus = syllabus;
    await course.save();

    return course;
  } catch (error) {
    throw error;
  }
};
