import studentModel from '../models/studentModel.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const loginStudent = async(req, res) => {
    const {email, password} = req.body;
    try{
        const student = await studentModel.findOne({email});

        if (!student){
            return res.json({
                success:false,
                message: "Student does not exist"
            });
        }

        const isMatch = await bcrypt.compare(password, student.password);

        if (!isMatch){
            return res.json({
                success:false,
                message: "Invalid credentials"
            })
        }

        const token = createToken(student._id);
        res.json({
            success:true,
            token
        });
    } catch(err){
        console.log(err);
        res.json({
            success:false,
            message:"Error"
        })
    }
}

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET);
}

const registerStudent = async (req, res) => {
    const { student_PRN, password, first_name, last_name, email, phone, dob } = req.body;

    if (!student_PRN || !password || !first_name || !last_name || !email || !phone || !dob) {
        return res.json({
            success: false,
            message: "All fields are required"
        });
    }

    const dobDate = new Date(dob);
    if (isNaN(dobDate.getTime())) {
        return res.json({
            success: false,
            message: "Invalid date of birth format"
        });
    }

    const currentYear = new Date().getFullYear();
    const dobYear = dobDate.getFullYear();

    if (dobYear < 1900 || dobYear > currentYear) {
        return res.json({
            success: false,
            message: "Date of birth is out of a valid range"
        });
    }

    try {
        const exists = await studentModel.findOne({ student_PRN });
        if (exists) {
            return res.json({
                success: false,
                message: "Student already exists"
            });
        }

        if (password.length < 8) {
            return res.json({
                success: false,
                message: "Please enter a strong password"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newStudent = new studentModel({
            student_PRN,
            password: hashedPassword,
            first_name,
            last_name,
            email,
            phone,
            dob: dobDate  
        });

        const student = await newStudent.save();
        const token = createToken(student._id);
        res.json({
            success: true,
            token
        });

    } catch (err) {
        console.log(err);
        res.json({
            success: false,
            message: "Error"
        });
    }
}


const getStudentInfo = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const studentId = decodedToken.id;

        const student = await studentModel.findById(studentId).select('-password'); // Exclude password from the response
        if (!student) {
            return res.status(404).json({
                success: false,
                message: "student not found"
            });
        }

        res.json({
            success: true,
            data: student
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}

export {loginStudent, getStudentInfo, registerStudent};