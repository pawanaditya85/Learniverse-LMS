import { mongoose } from 'mongoose';

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  profile: {
    bio: { type: String, default: '' },
    major: { type: String, default: '' },
    minor: { type: String, default: '' },
    interests: [{ type: String }],
    skills: [{ type: String }],
    projects: [{ type: String }],
  },
  notifications: { type: Boolean, default: true },
  enrolledCourses: [
    {
      course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
      semester: { type: String, required: true },
      grade: { type: Number, default: 0 },
    },
  ],
});

const Student = mongoose.model('Student', studentSchema);

export default Student;
