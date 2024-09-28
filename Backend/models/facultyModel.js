import mongoose from "mongoose";

const facultySchema = new mongoose.Schema(
    {
        faculty_PRN: {type: String, required: true},
        password: {type: String, required: true},
        first_name: {type: String, required: true},
        last_name: {type: String, required: true},
        email: {type: String, required: true},
        position: {type: String},
        department: {type: String},
        dob:  {type: Date},
        address: {type: String},
        courses_handled: [{type: Object, default:{}}],
        profile_picture: {type: String},
        status: {
            type: String,
            enum: ['Active', 'On Leave', 'Retired'], default: 'Active'
        }
    }, {minimize: false}
);


const facultyModel = mongoose.model.faculty || mongoose.model("faculty", facultySchema);

export default facultyModel;