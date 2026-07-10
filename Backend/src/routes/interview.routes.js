const express=require("express");
const authToken = require("../middlewares/auth.middlewares");
const { interviewReportGenerator, getInterviewReportById, getAllInterviewReports } = require("../controllers/interview.controller");
const upload = require("../middlewares/file.middleware");

const interviewRouter=express.Router();

// route to GEnerate the interview Report

interviewRouter.post('/generate',authToken,upload.single("resume"),interviewReportGenerator);

// Get all interview reports — MUST come before /:interviewId so it doesn't get caught by the param route
interviewRouter.get('/reports',authToken,getAllInterviewReports);

// Interview report by Id
interviewRouter.get('/:interviewId',authToken,getInterviewReportById);




module.exports=interviewRouter