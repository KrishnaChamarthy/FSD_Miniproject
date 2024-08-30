import express from "express";
import { getStudentInfo, loginStudent, registerStudent } from "../controllers/studentController.js";

const studentRouter = express.Router();

studentRouter.post("/login", loginStudent);
studentRouter.post("/register", registerStudent);
studentRouter.get("/info", getStudentInfo);

export default studentRouter;