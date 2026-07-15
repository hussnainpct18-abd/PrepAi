const pdfParser = require("pdf-parse");
const generateReport = require("../services/ai.services");
const reportModel = require("../models/report.model");

async function interviewReportGenerator(req, res) {
  try{
  const { jobDescription, selfDescription } = req.body;
  let resumeText = "";

  if (req.file) {
    // console.log(req.file);
    const pdfData = await pdfParser(req.file.buffer);
    resumeText = pdfData.text;
  }

  const interviewReportByAI = await generateReport({
    resume: resumeText,
    jobDescription: jobDescription,
    selfDescription: selfDescription,
  });

  const interviewReport = await reportModel.create({
    user: req.user.id,
    resume: resumeText,
    jobDescription: jobDescription,
    selfDescription: selfDescription,
    ...interviewReportByAI,
  });
  // console.log(interviewReportByAI);
  res.status(201).json({
    message: "Interview report created successfully",
    report:interviewReport,
  });
  }catch(e){
    console.log(e);
    res.status(500).json({ message: "Failed to generate interview report", error: e.message });
  }

}

async function getInterviewReportById(req, res) {
  try {
    const { interviewId } = req.params;

    const interviewReport = await reportModel.findById(interviewId);

    if (!interviewReport) {
      return res.status(404).json({
        message: "Interview Report Not found",
      });
    }

    return res.status(200).json({
      message: "Interview Report fetched Successfully",
      report: interviewReport,
    });
  } catch (e) {
    console.log(e);
  }
}

async function getAllInterviewReports(req, res) {

    try{
const userId = req.user.id;

  const interviewReports = await reportModel.find({ user: userId })
                                            .sort({createdAt:-1})

  if (!interviewReports) {
    return res.status(404).json({
      message: "No Interview Reports are Found",
    });
  }

  return res.status(200).json({
    message: "Interview Reports Fetched Successfully",
    Reports: interviewReports,
  });
    }catch(e){
        console.log(e);
    }
  
}

module.exports = {
  interviewReportGenerator,
  getInterviewReportById,
  getAllInterviewReports
};
