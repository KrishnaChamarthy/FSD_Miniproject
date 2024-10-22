import express from "express";
import { createAssignment, listAssignments, deleteAssignment, submitAssignment } from "../controllers/assignmentController.js";

const assignmentRouter = express.Router();

assignmentRouter.post("/create",createAssignment);
assignmentRouter.post("/submit", submitAssignment);
assignmentRouter.get("/list", listAssignments);
assignmentRouter.post("/delete", deleteAssignment);

export default assignmentRouter;