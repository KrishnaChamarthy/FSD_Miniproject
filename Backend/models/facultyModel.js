import mongoose from "mongoose";

const facultySchema = new mongoose.Schema(
    {
        faculty_id: {type: String, required: true},
        password: {type: String, required: true},
        first_name: {type: String, required: true},
        last_name: {type: String, required: true},
        email: {type: String, required: true},
        title: {type: String},
        department: {type: String},
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