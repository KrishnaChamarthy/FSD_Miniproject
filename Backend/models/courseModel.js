import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    course_code: { type: String, required: true },
    course_name: {type:String, required:true},
    credits: { type: Number, required: true },
    department: { type: String },
    semester: { type: Number, required: true }
  },
  { minimize: false }
);

const courseModel =
  mongoose.model.course || mongoose.model("course", courseSchema);
export default courseModel;