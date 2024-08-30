import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    student_PRN: { type: String, required: true },
    password: {type:String, required:true},
    first_name: { type: String, required: true },
    middle_name: { type: String },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: String },
    address: { type: String },
    program_enrolled: { type: String },
    semester: {type:Number},
    courses_enrolled: [{ type: Object, default:{}}],
    profile_picture: { type: String },
    documents: [{ type: String }],
    status: {
      type: String,
      enum: ["Active", "Inactive", "Graduated"],
      default: "Active",
    },
  },
  { minimize: false }
);

const studentModel =
  mongoose.model.student || mongoose.model("student", studentSchema);
export default studentModel;
