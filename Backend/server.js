import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import studentRouter from "./routes/studentRoute.js";

const app = express();
const port = 4000;

app.use(express.json())
app.use(cors());

connectDB();

app.use("/api/student", studentRouter);

app.get("/", (req, res) => {
    res.send("API Working");
})

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
})