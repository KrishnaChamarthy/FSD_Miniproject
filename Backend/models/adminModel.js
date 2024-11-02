import mongoose, { mongo } from "mongoose";

const adminSchema = new mongoose.Schema({
    admin_id: {type: String, required:true},
    email: {type: String, required:true},
    password: {type: String, required: true},
}, {minimize: false});

const adminModel = mongoose.model.admin || mongoose.model("admin", adminSchema);

export default adminModel;