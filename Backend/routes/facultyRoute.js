import express from "express";
import { getFacultyInfo, loginFaculty, registerFaculty, updateFaculty } from "../controllers/facultyController.js";


const facultyRouter = express.Router();

facultyRouter.post("/login", loginFaculty);
facultyRouter.post("/register", registerFaculty);
facultyRouter.get("/info", getFacultyInfo);
facultyRouter.post("/update", updateFaculty);

export default facultyRouter;