import circularsModel from "../models/circularsModel.js"

const addCircular = async (req, res) => {
    const circular = new circularsModel({
        circular_id: req.body.circular_id,
        subject: req.body.subject,
        description: req.body.description || "",
        category: req.body.category,
        dateIssued: req.body.dateIssued
    });

    try {
        await circular.save();
        res.json({
            success: true,
            message: "Circular Issued"
        });
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"Error"
        });
    }
}

const circularList = async (req, res) => {
    try {
        const circulars = await circularsModel.find({});
        res.json({
            success: true,
            data: circulars
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error"
        })
    }
}

const addToRead = async (req, res) => {
    try {
        const { circular_id, student_PRN } = req.body;

        const circular = await circularsModel.findOneAndUpdate(
            { circular_id }, 
            { $addToSet: { read: student_PRN } }, 
            { new: true } 
        );

        res.json({
            success: true,
            message: "Student PRN added to read list",
            circular
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error"
        });
    }
};

export {addCircular, circularList, addToRead}