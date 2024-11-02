import express from "express";
import cors from "cors";
import path from "path";
import { connectDB } from "./config/db.js";
import studentRouter from "./routes/studentRoute.js";
import "dotenv/config.js"
import courseRouter from "./routes/courseRoute.js";
import attendanceRouter from "./routes/attendanceRoute.js";
import marksRouter from "./routes/marksRoute.js"
import circularsRouter from "./routes/circularsRoute.js"
import facultyRouter from "./routes/facultyRoute.js";
import timetableRouter from "./routes/timetableRoute.js";
import assignmentRouter from "./routes/assignmentRoute.js";
import adminRouter from "./routes/adminRoute.js"

const app = express();
const port = 4000;

app.use(express.json())
app.use(cors());

connectDB();

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/api/student", studentRouter);
app.use("/api/course", courseRouter);
app.use("/api/attendance", attendanceRouter);
app.use("/api/marks", marksRouter);
app.use("/api/circulars", circularsRouter);
app.use("/api/faculty", facultyRouter);
app.use("/api/timetable", timetableRouter);
app.use("/api/assignment", assignmentRouter);
app.use("/api/admin", adminRouter);

app.get("/", (req, res) => {
    res.send("API Working");
})

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
})