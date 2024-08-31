import express from "express";
import { addCourse, removeCourse, listCourses } from "../controllers/courseContoller.js";

const courseRouter = express.Router();

courseRouter.post("/add", addCourse);
courseRouter.get("/list", listCourses);
courseRouter.post("/remove", removeCourse);

export default courseRouter