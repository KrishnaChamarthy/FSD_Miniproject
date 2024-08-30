import express from "express";
import { getStudentInfo, loginStudent } from "../controllers/studentController.js";

const studentRouter = express.Router();

studentRouter.post("/login", loginStudent);
studentRouter.get("/info", getStudentInfo);

export default studentRouter;