import express from "express";
import { addAttendance, getAttendance, updateAttendance } from "../controllers/attendanceController";

const attendanceRouter = express.Router();

attendanceRouter.post("/add", addAttendance);
attendanceRouter.post("/update", updateAttendance);
attendanceRouter.get("/info", getAttendance);

export default attendanceRouter;