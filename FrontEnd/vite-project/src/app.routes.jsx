import { createBrowserRouter } from 'react-router';
import Login from './features/auth/pages/Login';
import Register from './features/auth/pages/Register';
import Protected from './features/auth/components/Protected';
import Home from './features/interview/pages/Home';
import Interview from './features/interview/pages/Interview';
import ReportsDashboard from './features/interview/pages/ReportsDashboard';
import { Navigate } from 'react-router';
export const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    // {
    //     path: '/',
    //     element: <Protected></Protected>
    // },
    {
        path: '/home',
        element: <Protected><Home /></Protected>
    },
    {
        path: '/interview',
        element: <Navigate to="/" replace />
    },
    {
        path: '/interview/:interviewId',
        element: <Protected><Interview /></Protected>
    }, {
        path: "/logout",
        element: <Navigate to="/login" replace />
    },
    {
        path: '/history',
        element: <Protected><ReportsDashboard /></Protected>
    },

])