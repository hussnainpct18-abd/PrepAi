import axios from "axios";

    const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
    });

    export async function generateInterview({jobDescription,selfDescription,file}){
    try {

        const formdata=new FormData();
        formdata.append("jobDescription",jobDescription);
        formdata.append("selfDescription",selfDescription);
        if(file){
            formdata.append("resume",file);
        }

        const response = await api.post("/api/interview/generate",formdata,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        })
        return response.data.report;
    }
     catch (e) {
        console.log(e);
    }
    }; 

    export async function getInterviewById(interviewId){
        try{

            // Use this method when at backend there will not be the the route like this '/:interviewId'
            // const response=api.get('/api/interview/:interviewId',{
            //     params:{
            //         interviewId
            //     }
            // })

            const response= await api.get(`/api/interview/${interviewId}`);

            if(response.status===200){
                return response.report;
            }
        }catch(e){
            console.log(e);
        }
    }

    export async function getAllInterviewReports(){
        try{
            const response=await api.get('/api/interview/reports')

            if(response.status===200){
                return response.interviewReports;
            }
        }catch(e){console.log(e);}
    }



