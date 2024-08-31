import attendanceModel from "../models/attendanceModel.js"

const addAttendance = async (req, res) => {
    const attendance = new attendanceModel({
        student_PRN: req.body.student_PRN,
        course_code: req.body.course_code,
        date: req.body.date,
        status: req.body.status,
        remaks: req.body.remarks
    });

    try {
        await attendance.save();
        res.json({
            success:true,
            message:"Attendance Saved"
        });
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"Error"
        });
    }
}