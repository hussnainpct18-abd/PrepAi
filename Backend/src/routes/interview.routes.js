const express=require("express");
const authToken = require("../middlewares/auth.middlewares");
const { interviewReportGenerator } = require("../controllers/interview.controller");
const upload = require("../middlewares/file.middleware");

const interviewRouter=express.Router();

interviewRouter.post('/',authToken,upload.single("resume"),interviewReportGenerator)



module.exports=interviewRouter