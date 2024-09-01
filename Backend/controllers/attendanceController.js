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

const updateAttendance = async (req, res) => {
    const { student_PRN, course_code, date, status, remarks } = req.body;

    try {
        const attendance = await attendanceModel.findOneAndUpdate(
            { student_PRN, course_code, date }, 
            { status, remarks }, 
            { new: true } 
        );

        if (attendance) {
            res.json({
                success: true,
                message: "Attendance Updated",
                data: attendance
            });
        } else {
            res.json({
                success: false,
                message: "Attendance not found"
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error updating attendance"
        });
    }
};

const getAttendance = async (req, res) => {
    const { student_PRN } = req.body;

    try {
        const attendanceRecords = await attendanceModel.find({ student_PRN });

        if (attendanceRecords.length > 0) {
            res.json({
                success: true,
                message: "Attendance records retrieved successfully",
                data: attendanceRecords
            });
        } else {
            res.json({
                success: false,
                message: "No attendance records found for this student"
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error retrieving attendance records"
        });
    }
};

export {addAttendance, updateAttendance, getAttendance}