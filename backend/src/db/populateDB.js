import mongoose from "mongoose";
import User from "../models/user.models.js";
import Course from "../models/course.models.js";
import Faculty from "../models/faculty.models.js";
import Student from "../models/student.models.js";
import Assignment from "../models/assignment.model.js";
import Quiz from "../models/quiz.model.js";

async function populateDB() {
  // Connect to the database
  await mongoose.connect(
    "mongodb+srv://divyamlocal:divyamlocal@kinetic-202.nf0n2w3.mongodb.net/?retryWrites=true&w=majority&appName=kinetic-202"
  );

  // Delete any existing data
  await User.deleteMany({});
  await Course.deleteMany({});
  await Faculty.deleteMany({});
  await Student.deleteMany({});
  await Assignment.deleteMany({});
  await Quiz.deleteMany({});

  // Create some dummy users
  // for (let i = 0; i < 10; i++) {
  //   const user = new User({
  //     name: `User ${i + 1}`,
  //     email: `user${i + 1}@example.com`,
  //   });
  //   await user.save();
  // }

  // // Create some dummy faculties
  // const faculties = [];
  // for (let i = 0; i < 5; i++) {
  //   const faculty = new Faculty({
  //     name: `Faculty ${i + 1}`,
  //     email: `faculty${i + 1}@example.com`,
  //     department: `Department ${i + 1}`,
  //   });
  //   await faculty.save();
  //   faculties.push(faculty);
  // }

  // // Create some dummy courses
  // const courses = [];
  // for (let i = 0; i < 10; i++) {
  //   const course = new Course({
  //     code: `CSE00${i}`,
  //     name: `Course ${i + 1}`,
  //     description: `This is a description for Course ${i + 1}.`,
  //     semester: `spring${(2015) + i}`,
  //     isPublished: true,
  //     faculty: faculties[i % faculties.length]._id,
  //     syllabus: `This is a syllabus for Course ${i + 1}.`,
  //   });
  //   await course.save();
  //   courses.push(course);
  // }

  // // Create some dummy students
  // for (let i = 0; i < 20; i++) {
  //   const student = new Student({
  //     name: `Student ${i + 1}`,
  //     email: `student${i + 1}@example.com`,
  //     notifications: i % 2 === 0,
  //     enrolledCourses: courses.map(course => ({
  //       course: course._id,
  //       semester: course.semester,
  //       grade: Math.floor(Math.random() * 41) + 60,
  //     })),
  //   });
  //   await student.save();
  // }

  console.log("Database has been populated with dummy data.");
}

populateDB().catch(console.error);
