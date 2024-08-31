import courseModel from "../models/courseModel.js";

const addCourse = async (req, res) => {
    const course = new courseModel({
        course_code: req.body.course_code,
        course_name: req.body.course_name,
        credits: req.body.credits,
        department: req.body.department,
        semester: req.body.semester
    });

    try {
        await course.save();
        res.json({
            success: true,
            message: "Course Added"
        });
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"Error"
        });
    }
}

const listCourses = async (req, res) =>{
    try {
        const courses = await courseModel.find({});
        res.json({
            success: true,
            data: courses
        })
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"Error"
        })
    }
}

const removeCourse = async (req, res) => {
    try {

        await courseModel.deleteOne({ course_code: req.body.course_code });
        res.json({
            success:true,
            message:"Course Removed"
        })
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"Error"
        })
    }
}

export {addCourse, listCourses, removeCourse}