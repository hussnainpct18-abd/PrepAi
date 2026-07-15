import { useContext } from "react";
import { InterviewContext } from "../services/interview.context.jsx";
import { generateInterview, getInterviewById, getAllInterviewReports } from "../api/generate.js";

export const useInterview = () => {
  const context = useContext(InterviewContext);

  const { loading, setLoading, report, setReport, allReports, setAllReports } =
    context;

  const handleInterviewReport = async ({ jobDescription, selfDescription, file }) => {
    setLoading(true);
    try {
      const interviewReport = await generateInterview({
        jobDescription,
        selfDescription,
        file,
      });
      setReport(interviewReport);
      return interviewReport;
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handleGetReportById = async (interviewId) =>{
    setLoading(true);
    try{
        const report = await getInterviewById (interviewId);
        setReport(report);

    }catch(e){
        console.log(e);
    } finally {
        setLoading(false);
    }
  };


  const handleGetAllReports = async ()=>{
    setLoading(true);
    try{

        const reports = await getAllInterviewReports();
        setAllReports(reports);
        // console.log(reports);

    }catch(e){
        console.log(e);
    }finally{
        setLoading(false);
    }
  };

  return {loading ,report, allReports, handleInterviewReport, handleGetReportById, handleGetAllReports};

};
