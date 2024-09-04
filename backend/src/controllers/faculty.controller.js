import Faculty from "../models/faculty.models.js";

export const getCoursesTaughtByFaculty = async (facultyID) => {
  console.log("getCoursesTaughtByFaculty controller");
  const faculty = await Faculty.findById(facultyID).populate("courses");
  console.log(faculty);
  return faculty.courses;
};

export const getFaculty = async (facultyID) => {
  const faculty = await Faculty.findById(facultyID).populate("courses");
  return faculty;
};

export const updateDepartment = async (facultyID, department) => {
  const faculty = await Faculty.findById(facultyID);
  faculty.department = department;
  await faculty.save();

  return faculty;
};
