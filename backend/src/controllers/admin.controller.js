import Student from "../models/student.models.js";
import Course from "../models/course.models.js";
import Faculty from "../models/faculty.models.js";

// Create a new student
export const createStudent = async (studentData) => {
  const student = new Student(studentData);
  await student.save();
  return student;
};

// Retrieve all students
export const getStudents = async () => {
  const students = await Student.find();
  return students;
};

// Create a new faculty
export const createFaculty = async (facultyData) => {
  const faculty = new Faculty(facultyData);
  await faculty.save();
  return faculty;
};

// Retrieve all faculty
export const getFaculties = async () => {
  const faculties = await Faculty.find().populate("courses");
  return faculties;
};

// Create a new course
export const createCourse = async (courseData) => {
  const { code, semester } = courseData;
  const existingCourse = await Course.findOne({ code, semester });

  if (existingCourse) {
    throw new Error("Course already exists in this semester");
  }

  const course = new Course(courseData);
  await course.save();
  return course;
};

// Retrieve all new course
export const getCourses = async () => {
  const courses = await Course.find()
    .populate("faculty")
    .populate("announcements")
    .populate("assignments")
    .populate("quizzes");
  return courses;
};

// Assign a faculty to a course, and vice versa, by ID
export const assignFacultyToCourse = async (courseID, facultyID) => {
  const course = await Course.findById(courseID);
  const faculty = await Faculty.findById(facultyID);

  if (!course || !faculty) {
    throw new Error("Course or Faculty not found");
  }

  course.faculty = facultyID;
  faculty.courses.push(courseID);

  await course.save();
  await faculty.save();

  return { course, faculty };
};

export const enrollStudentsInCourses = async (studentIds, courseIds) => {
  // TODO - check if studentIds and courseIds are valid
  const students = await Student.find({ _id: { $in: studentIds } });
  const courses = await Course.find({ _id: { $in: courseIds } });

  for (const student of students) {
    for (const course of courses) {
      student.enrolledCourses.push({
        course: course._id,
        semester: course.semester,
      });
      course.students.push(student._id);
    }
    await student.save();
  }

  await Course.updateMany(
    { _id: { $in: courseIds } },
    { $push: { students: { $each: studentIds } } }
  );

  return { students, courses };
};
