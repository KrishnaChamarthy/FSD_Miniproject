import adminModel from "../models/adminModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await adminModel.findOne({ email });

    if (!admin) {
      return res.json({
        success: false,
        message: "Admin Not Found",
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = createToken(admin._id);
    res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error",
    });
  }
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const registerAdmin = async (req, res) => {
  const { admin_id, email, password } = req.body;

  if (!admin_id || !email || !password) {
    res.json({
      success: false,
      message: "All fields are required",
    });
  }
  try {
    const exists = await adminModel.findOne({ admin_id });
    if (exists) {
      return res.json({
        success: false,
        message: "Admin already exists",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = new adminModel({
      admin_id,
      email,
      password: hashedPassword,
    });

    const admin = await newAdmin.save();
    const token = createToken(admin._id);
    res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error",
    });
  }
};

const getAdminInfo = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const adminId = decodedToken.id;

    const admin = await adminModel.findById(adminId).select("-password");
    if (!admin) {
      return res.json({
        success: false,
        message: "admin not found",
      });
    }

    res.json({
      success: true,
      data: admin,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error",
    });
  }
};

export { loginAdmin, registerAdmin, getAdminInfo };
