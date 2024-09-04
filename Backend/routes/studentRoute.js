import express from "express";
import { getStudentInfo, loginStudent, registerStudent, updateStudent } from "../controllers/studentController.js";

const studentRouter = express.Router();

studentRouter.post("/login", loginStudent);
studentRouter.post("/register", registerStudent);
studentRouter.get("/info", getStudentInfo);
studentRouter.post("/update", updateStudent)

export default studentRouter;