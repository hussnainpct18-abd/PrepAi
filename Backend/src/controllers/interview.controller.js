
const pdfParser = require('pdf-parse');
const generateReport = require('../services/ai.services');
const reportModel=require('../models/report.model')

async function interviewReportGenerator(req,res) {

    const { jobDescription, selfDescription } = req.body;

    const pdfData = await pdfParser(req.file.buffer);
    const textContent = pdfData.text;
    
    const interviewReportByAI=await generateReport({
        resume:textContent.text,
        jobDescription:jobDescription,
        selfDescription:selfDescription
    })

    const interviewReport=await reportModel.create({
        user:req.user.id,
        resume:textContent.text,
        jobDescription:jobDescription,
        selfDescription:selfDescription,
        ...interviewReportByAI

    })

    res.status(201).json({
        message:"Interview report created successfully",
        interviewReport
    })
}

module.exports = {
    interviewReportGenerator
}