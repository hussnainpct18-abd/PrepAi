import { useEffect } from "react";
import { useInterview } from "../hook/useInterview";
import { useNavigate } from "react-router";
import "../styles/styles.css";

function formatDate(dateString) {
  if (!dateString) return "Unknown date";
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function ReportsDashboard() {
  const { allReports, handleGetAllReports, loading } = useInterview();
  const navigate = useNavigate();

  // useEffect(() => {
  //   handleGetAllReports();
  // }, []);

  if (loading) {
    return (
      <div className="reports-page reports-loading">
        <div className="reports-loading-spinner" />
        <h2>Loading your reports...</h2>
      </div>
    );
  }

  const reports = allReports?.Reports ?? [];

  return (
    <div className="reports-page">
      <style>{`
        .reports-page {
          min-height: 100vh;
          padding: clamp(20px, 5vw, 40px);
          background: #08080a;
        }

        .reports-loading {
          display: flex;
          flex-direction: column;
          gap: 16px;
          justify-content: center;
          align-items: center;
          color: white;
        }

        .reports-loading-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(255, 111, 74, 0.2);
          border-top-color: #e0485a;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .reports-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: clamp(24px, 5vw, 40px);
        }

        .reports-nav-logo {
          cursor: pointer;
          font-size: 1.4rem;
          font-weight: 700;
          color: white;
        }

        .reports-nav-logo span {
          color: #e0485a;
        }

        .reports-container {
          max-width: 1100px;
          margin: 0 auto;
        }

        .reports-title {
          color: white;
          margin-bottom: 8px;
          font-size: clamp(1.7rem, 4vw, 2.5rem);
          font-weight: 700;
        }

        .reports-subtitle {
          color: #8a8a92;
          margin-bottom: clamp(24px, 5vw, 40px);
          font-size: clamp(0.9rem, 2vw, 1rem);
        }

        .reports-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(min(280px, 100%), 1fr));
          gap: 20px;
        }

        .report-card {
          cursor: pointer;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 22px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .report-card:hover {
          transform: translateY(-5px);
          border-color: rgba(255, 111, 74, 0.4);
          box-shadow: 0 12px 30px rgba(255, 111, 74, 0.12);
        }

        .report-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 10px;
        }

        .report-card-title {
          color: white;
          font-size: 1.05rem;
          font-weight: 600;
          line-height: 1.3;
        }

        .report-score-badge {
          flex-shrink: 0;
          font-size: 0.85rem;
          font-weight: 600;
          padding: 5px 10px;
          background: rgba(255, 111, 74, 0.12);
          color: #e0485a;
          border-radius: 12px;
          white-space: nowrap;
        }

        .report-card-desc {
          color: #8a8a92;
          font-size: 0.9rem;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .report-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
          padding-top: 14px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .report-card-date {
          color: #6b6b70;
          font-size: 0.8rem;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .report-card-link {
          color: #e0485a;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .reports-empty {
          text-align: center;
          padding: clamp(40px, 10vw, 60px) 20px;
          border: 1px dashed rgba(255, 255, 255, 0.1);
          border-radius: 16px;
        }

        .reports-empty h3 {
          color: white;
          margin-bottom: 12px;
        }

        .reports-empty p {
          color: #8a8a92;
          margin-bottom: 24px;
        }

        .reports-cta-btn {
          background: #e0485a;
          color: #08080a;
          border: none;
          font-weight: 600;
          border-radius: 10px;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.15s ease;
        }

        .reports-cta-btn:hover {
          background: #e0485a;
          transform: translateY(-1px);
        }
      `}</style>

      <nav className="nav reports-nav">
        <div className="nav-logo reports-nav-logo" onClick={() => navigate("/home")}>
          Prep<span>AI</span>
        </div>
        <button
          className="reports-cta-btn"
          style={{ padding: "10px 20px", color: "white" }}
          onClick={() => navigate("/home")}
        >
          Generate New
        </button>
      </nav>

      <div className="reports-container">
        <h1 className="reports-title">Your Interview Reports</h1>
        <p className="reports-subtitle">
          Review your past AI-generated interview strategies and performance.
        </p>

        {reports.length > 0 ? (
          <div className="reports-grid">
            {reports.map((report) => (
              <div
                key={report._id}
                className="report-card"
                onClick={() => navigate(`/interview/${report._id}`)}
              >
                <div className="report-card-header">
                  <h3 className="report-card-title">{report.title || "Interview Report"}</h3>
                  <div className="report-score-badge">{report.score || 0}% Match</div>
                </div>

                <p className="report-card-desc">
                  {report.jobDescription || "No job description provided."}
                </p>

                <div className="report-card-footer">
                  <span className="report-card-date">
                    🕒 {formatDate(report.createdAt)}
                  </span>
                  <span className="report-card-link">View Full Report →</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="reports-empty">
            <h3>No reports found</h3>
            <p>You haven't generated any interview strategies yet.</p>
            <button
              className="reports-cta-btn"
              style={{ padding: "15px 30px", fontSize: "1rem" }}
              onClick={() => navigate("/home")}
            >
              Create Your First Strategy
            </button>
          </div>
        )}
      </div>
    </div>
  );
}