import express from "express";
import { addCircular, circularList, addToRead } from "../controllers/circularsController.js";

const circularsRouter = express.Router();

circularsRouter.post("/add", addCircular);
circularsRouter.get("/list", circularList);
circularsRouter.post("/read", addToRead);

export default circularsRouter;