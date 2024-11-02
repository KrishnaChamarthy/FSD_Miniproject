import express from "express";
import {getAdminInfo, loginAdmin, registerAdmin} from "../controllers/adminContoller.js"

const adminRouter = express.Router();

adminRouter.post("/login", loginAdmin);
adminRouter.post("/register", registerAdmin);
adminRouter.get("/info", getAdminInfo);

export default adminRouter;