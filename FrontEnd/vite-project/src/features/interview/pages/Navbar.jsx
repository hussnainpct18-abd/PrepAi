import React from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from "../../auth/hooks/useAuth.js";
import { useInterview } from "../hook/useInterview.js";

const Navbar = () => {
    const navigate = useNavigate();
    const { handleLogout } = useAuth();
    const { handleGetAllReports } = useInterview();
    const allReports = async () => {
        const result = await handleGetAllReports();
        if (result) {
            navigate('/history');
        }
    }
    const Logout = async () => {
        const result = await handleLogout();
        if (result) {
            navigate("/login");
        }
    }
    return (
        <nav className="nav flex justify-between items-center">
            <div className="nav-logo">
                Prep<span>AI</span>
            </div>

            <style>{`
    .nav-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 20px;
      border-radius: 10px;
      font-weight: 600;
      font-size: 0.9rem;
      border: none;
      cursor: pointer;
      transition: transform 0.15s ease, box-shadow 0.2s ease, background 0.2s ease;
    }

    .nav-btn-primary {
      background: linear-gradient(135deg, #ff6f4a, #e0485a);
      color: white;
      box-shadow: 0 4px 14px rgba(224, 72, 90, 0.3);
    }

    .nav-btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(224, 72, 90, 0.45);
    }

    .nav-btn-secondary {
      background: rgba(255, 255, 255, 0.05);
      color: #f0f0f0;
      border: 1px solid rgba(224, 72, 90, 0.4);
    }

    .nav-btn-secondary:hover {
      background: #0d0d0f;
      border-color: #e0485a;
      transform: translateY(-2px);
    }
  `}</style>

            <div className="flex justify-around items-center gap-5">
                <Link to={"/history"}>
                    <button onClick={allReports} className="nav-btn nav-btn-primary">
                        📋 View Interview History
                    </button>
                </Link>

                <button onClick={Logout} className="nav-btn nav-btn-secondary">
                    🚪 Logout
                </button>
            </div>
        </nav>
    )
}

export default Navbar