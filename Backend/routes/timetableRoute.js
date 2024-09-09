import express from "express";
import {addPeriod, getTimetable, removePeriod, updatePeriod} from "../controllers/timetableController.js"

const timetableRouter = express.Router();

timetableRouter.post("/add", addPeriod);
timetableRouter.post("/remove", removePeriod);
timetableRouter.post("/update", updatePeriod);
timetableRouter.get("/get", getTimetable);

export default timetableRouter;