import mongoose from "mongoose";

const circularsSchema = new mongoose.Schema({
    circular_id: {type: String, required: true},
    subject: {type: String, required: true},
    description: {type:String},
    category: {type: String, required:true},
    dateIssued: {type: Date, required: true},
    read: [{ type: String }]
}, {minimize: false});

const circularsModel = mongoose.model.circulars || mongoose.model("circulars", circularsSchema);

export default circularsModel;