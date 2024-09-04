import { mongoose } from 'mongoose';
import { COURSE_CODE_PATTERN, SEMESTER_FORMAT_PATTERN } from '../constants.js';

const courseSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    uppercase: true,
    validate: {
      validator: (value) => COURSE_CODE_PATTERN.test(value),
      message:
        "Invalid course code format it should be Subject code followed by a 3-digit number (e.g., 'AB123','ABC123', 'ABCD1234')",
    },
  },
  name: { type: String, required: true },
  description: { type: String },
  semester: {
    type: String,
    required: true,
    validate: {
      validator: (value) => SEMESTER_FORMAT_PATTERN.test(value),
      message:
        "Invalid semester format it should be <Term><year> (e.g., 'spring2024', 'fall2024, 'summer2024', 'winter2024')",
    },
  },
  isPublished: { type: Boolean, default: false },
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Faculty',
    required: false,
  },
  syllabus: { type: String },
  announcements: [
    {
      title: { type: String, required: true },
      description: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
  assignments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' }],
  quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }],
});

// courseSchema.index({ code: 1, semester: 1 }, { unique: true }); TODO : Add index to course code and semester to ensure unique course in a semester

const Course = mongoose.model('Course', courseSchema);

export default Course;
