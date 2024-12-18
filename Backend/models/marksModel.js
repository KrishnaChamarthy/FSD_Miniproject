import mongoose, { mongo } from "mongoose";

const marksSchema = new mongoose.Schema({
    student_PRN: { type: String, required: true },
    course_code: { type: String, required: true },
    semester: { type: String, required: true }, 
    internalMarks: { type: Number, required: true },
    externalMarks: { type: Number, required: true },
}, {minimize: false});

const marksModel = mongoose.model.marks || mongoose.model("marks", marksSchema);
export default marksModel;