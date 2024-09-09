import timetableModel from "../models/timetableModel.js";

const addPeriod = async (req, res) => {
    const period = new timetableModel({
        course_code: req.body.course_code,
        day_of_week: req.body.day_of_week,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        type: req.body.type
    });
    try {
        period.save();
        res.json({
            success:true,
            message:"Period saved successfully"
        });
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"Error"
        });
    }
}

const removePeriod = async (req, res) => {
    const { course_code, day_of_week, type } = req.body; 
    try {
        const deletedPeriod = await timetableModel.findOneAndDelete({ 
            course_code: course_code, 
            day_of_week: day_of_week, 
            type: type 
        });

        if (!deletedPeriod) {
            return res.json({
                success: false,
                message: "Period not found"
            });
        }
        
        res.json({
            success: true,
            message: "Period removed successfully"
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error removing period"
        });
    }
}


const updatePeriod = async (req, res) => {
    const { course_code, day_of_week, type, start_time, end_time } = req.body; // Fields to identify and update the period
    try {
        const updatedPeriod = await timetableModel.findOneAndUpdate(
            { 
                course_code: course_code, 
                day_of_week: day_of_week, 
                type: type 
            },
            { 
                start_time: start_time, 
                end_time: end_time 
            },
            { new: true } 
        );

        if (!updatedPeriod) {
            return res.json({
                success: false,
                message: "Period not found"
            });
        }

        res.json({
            success: true,
            message: "Period updated successfully",
            data: updatedPeriod
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error updating period"
        });
    }
}

const getTimetable = async (req, res) => {
    try {
        const timetable = await timetableModel.find({})
        res.json({
            success: true,
            data: timetable
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error retrieving time table"
        })
    }
}


export {addPeriod, updatePeriod, removePeriod, getTimetable};