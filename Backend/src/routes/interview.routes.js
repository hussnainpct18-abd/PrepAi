const express=require("express");
const authToken = require("../middlewares/auth.middlewares");
const { interviewReportGenerator, getInterviewReportById, getAllInterviewReports } = require("../controllers/interview.controller");
const upload = require("../middlewares/file.middleware");

const interviewRouter=express.Router();

// route to GEnerate the interview Report

interviewRouter.post('/',authToken,upload.single("resume"),interviewReportGenerator);

// Interview report by Id
interviewRouter.get('/:interviewId',authToken,getInterviewReportById);

// Get all inteview reports
interviewRouter.get('/reports',authToken,getAllInterviewReports);




module.exports=interviewRouter