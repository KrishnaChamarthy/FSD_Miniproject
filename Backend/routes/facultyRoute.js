import express from "express";
import { loginFaculty, registerFaculty } from "../controllers/facultyController.js";


const facultyRouter = express.Router();

facultyRouter.post("/login", loginFaculty);
facultyRouter.post("/register", registerFaculty);

export default facultyRouter;