import mongoose from "mongoose";

const timetableSchema = new mongoose.Schema({
    course_code: {type: String, required: true},
    day_of_week: { 
        type: String, 
        required: true, 
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] 
      },
    start_time: {type:String, required: true},
    end_time: {type:String, required: true},
    type: {type:String, required:true},

}, {minimize:false});

const timetableModel = mongoose.model.timetable || mongoose.model("timetable", timetableSchema);

export default timetableModel;