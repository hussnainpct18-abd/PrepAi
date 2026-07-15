import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router';
import PageTransitionLoader from '../pages/Transition.jsx';



const Protected = ({ children }) => {
    const { loading, user } = useAuth();

    if (loading) {
        return (<PageTransitionLoader/>)
    }

    if (!user) {
        return (<Navigate to={"/Login"} />)
    }
    return children
}

export default Protected