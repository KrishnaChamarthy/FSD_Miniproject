import facultyModel from "../models/facultyModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const loginFaculty = async (req, res) => {
    const {email, password} = req.body;
    try {
        const faculty = await facultyModel.findOne({email});

        if (!faculty){
            return res.json({
                success:false,
                message: "Faculty already exists"
            });
        }

        const isMatch = await bcrypt.compare(password, faculty.password);

        if (!isMatch){
            return res.json({
                success:false,
                message:"Invalid credentials"
            })
        }

        const token = createToken(faculty._id);
        res.json({
            success:true,
            token
        });
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message: "Error"
        })
    }
}

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET);
}

const registerFaculty = async (req, res) => {
    const {faculty_id, password, first_name, last_name, email } = req.body;

    if (!faculty_id || !password || !first_name || !last_name || !email){
        return res.json({
            success:false,
            message: "All fields are required"
        });
    }

    try {
        const exists = await facultyModel.findOne({faculty_id});
        if (exists){
            return res.json({
                success:false,
                message:"Faculty already exists"
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

        const newFaculty = new facultyModel({
            faculty_id,
            password: hashedPassword,
            first_name,
            last_name,
            email
        });

        const faculty = await newFaculty.save();
        const token = createToken(faculty._id);
        res.json({
            success: true,
            token
        });

    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"Error"
        })
    }
}

export  {loginFaculty, registerFaculty}