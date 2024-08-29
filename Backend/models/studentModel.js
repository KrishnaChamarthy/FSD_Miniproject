import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({

}, {minimize:false});

const studentModel = mongoose.model.student || mongoose.model("student", studentSchema);
export default studentModel;