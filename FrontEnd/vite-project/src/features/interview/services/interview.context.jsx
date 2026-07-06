import {Context, createContext, useState} from 'react'


export const InterviewContext = createContext();

export const InterviewProvider = ({children})=>{

    const [loading, setLoading] = useState(true);
    const [report, setReport] = useState(null);
    const [allReports, setAllReports] = useState(null);


    return (
        <InterviewContext.Provider value= {{loading,setLoading,report,setReport,allReports,setAllReports}}>
            {children}
        </InterviewContext.Provider>
    )
}
