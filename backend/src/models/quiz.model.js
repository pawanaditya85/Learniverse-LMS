import { mongoose } from 'mongoose';

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date },
  totalGrade: { type: Number, required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  submissions: [
    {
      student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
      submission: { type: String },
      grade: { type: Number, default: 0 },
      status: { type: String, enum: ['Pending', 'Graded'], default: 'Pending' },
    },
  ],
});

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;
