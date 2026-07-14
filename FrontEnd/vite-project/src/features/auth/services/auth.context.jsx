import { createContext, useEffect, useState } from "react";
import { getMe } from "../api/auth.api";
export const AuthContext = createContext();



export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(()=>{

        const checkUser=async()=>{
            const result=await getMe();
            if(result){
                setUser(result.user);
            }
            setLoading(false);
        }
        checkUser();

    },[])



    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    )
}