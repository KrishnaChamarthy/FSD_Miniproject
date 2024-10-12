import marksModel from "../models/marksModel.js";

const addMarks = async (req, res) => {
    const marks = new marksModel({
        student_PRN: req.body.student_PRN,
        course_code: req.body.course_code,
        semester: req.body.semester,
        externalMarks: req.body.externalMarks,
        internalMarks: req.body.internalMarks
    });

    try {
        await marks.save();
        res.json({
            success:true,
            message:"Marks saved successfully"
        });
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message: "Error"
        });
    }
}

const getMarks = async (req, res) => {
    const {student_PRN} = req.query;

    try {
        const marksRecords = await marksModel.find({student_PRN});

        if (marksRecords.length > 0){
            res.json({
                success:true,
                message: "Marks records retrieved successfully",
                data: marksRecords
            });
        }
        else{
            res.json({
                success:false,
                message: "No marks records found for the given data"
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"Error"
        });
    }
}


export {addMarks, getMarks, }