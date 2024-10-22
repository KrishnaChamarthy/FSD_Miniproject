import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    course_code: { type: String, required: true },
    assignment_title: { type: String, required: true },
    assignment_description: { type: String },
    due_date: {type: Date},
    submissions: [
      {
        student_PRN: { type: String },
        submission: { type: String },
        submission_date: {type: Date}
      },
    ],
  },
  { minimize: false }
);

const assignmentModel =
  mongoose.model.assignment || mongoose.model("assignment", assignmentSchema);
export default assignmentModel;
