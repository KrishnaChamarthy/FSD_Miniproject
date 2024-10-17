import marksModel from "../models/marksModel.js";

const addMarks = async (req, res) => {
    const marksList = req.body; 

    try {
        const bulkOps = marksList.map((mark) => ({
            updateOne: {
                filter: {
                    student_PRN: mark.student_PRN,
                    course_code: mark.course_code,
                    semester: mark.semester,
                },
                update: {
                    $set: {
                        externalMarks: mark.externalMarks,
                        internalMarks: mark.internalMarks,
                    },
                },
                upsert: true,
            },
        }));

        const result = await marksModel.bulkWrite(bulkOps);

        res.json({
            success: true,
            message: "Marks saved successfully",
            data: result,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error saving marks",
        });
    }
};


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