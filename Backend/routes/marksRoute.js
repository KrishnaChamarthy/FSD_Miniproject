import express from "express";
import { getMarks, addMarks, } from "../controllers/marksController.js";

const marksRouter = express.Router();

marksRouter.post("/add", addMarks);
marksRouter.get("/get", getMarks);

export default marksRouter;