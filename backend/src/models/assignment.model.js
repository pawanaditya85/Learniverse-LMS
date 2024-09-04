import { mongoose } from 'mongoose';

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date, required: true },
  totalGrade: { type: Number, required: true },
  Course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  submissions: [
    {
      student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
      submission: { type: String },
      grade: {
        type: Number,
        default: 0,
      },
      status: { type: String, enum: ['Pending', 'Graded'], default: 'Pending' },
    },
  ],
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

export default Assignment;
