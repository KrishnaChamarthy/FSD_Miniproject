import mongoose, { mongo } from "mongoose";

const attendanceSchema = new mongoose.Schema({
    student_PRN: {type:String, reqired:true},
    course_code: {type:String, reqired:true},
    date: { type: Date, required: true },
  status: { type: String, enum: ['Present', 'Absent', 'Late'], required: true },
  remarks: { type: String }
}, {minimize:false});

const attendanceModel = mongoose.model.attendance || mongoose.model("attendance", attendanceSchema);
export default attendanceModel;