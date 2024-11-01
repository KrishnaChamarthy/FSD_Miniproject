import assignmentModel from "../models/assignmentModel.js";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});

const upload = multer({ storage });


const createAssignment = async (req, res) => {
  try {
    const assignment = new assignmentModel({
      course_code: req.body.course_code,
      assignment_title: req.body.assignment_title,
      assignment_description: req.body.assignment_description,
      due_date: req.body.due_date,
    });
    await assignment.save();
    res.json({
      success: true,
      message: "Assignment Issued Successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error",
    });
  }
};

const listAssignments = async (req, res) => {
  try {
    const { course_code } = req.query;
    const query = course_code ? { course_code } : {};
    const assignments = await assignmentModel.find(query)
      
    res.json({
      success: true,
      data: assignments,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error",
    });
  }
};

const submitAssignment = async (req, res) => {
  upload.single("submission")(req, res, async (err) => {
    if (err) {
      console.error("File upload error:", err);
      return res.json({
        success: false,
        message: "File upload error",
      });
    }

    try {
      const { course_code, assignment_title, student_PRN, submission_date } = req.body;
      const filePath = req.file ? req.file.path : null; 

      const updatedAssignment = await assignmentModel.findOneAndUpdate(
        { course_code, assignment_title },
        {
          $push: {
            submissions: {
              student_PRN,
              submission: filePath,
              submission_date,
            },
          },
        },
        { new: true }
      );

      if (!updatedAssignment) {
        return res.json({
          success: false,
          message: "Assignment Not Found",
        });
      }

      return res.json({
        success: true,
        message: "Submission Saved",
      });
    } catch (error) {
      console.error("Error submitting assignment:", error);
      return res.json({
        success: false,
        message: "Error",
      });
    }
  });
};


const deleteAssignment = async (req, res) => {
  try {
    const { course_code, assignment_title } = req.query;
    const deletedAssignment = await assignmentModel.findOneAndDelete({
      course_code,
      assignment_title,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: true,
      message: "Error",
    });
  }
};

export {
  createAssignment,
  deleteAssignment,
  submitAssignment,
  listAssignments,
};
