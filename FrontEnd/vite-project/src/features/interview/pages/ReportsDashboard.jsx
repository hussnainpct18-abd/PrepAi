import { useEffect } from "react";
import { useInterview } from "../hook/useInterview";
import { useNavigate } from "react-router";
import "../styles/styles.css"; // Ensure you use the styles

export default function ReportsDashboard() {
  const { allReports, handleGetAllReports, loading } = useInterview();
  const navigate = useNavigate();

  useEffect(() => {
    handleGetAllReports();
  }, []);

  if (loading) {
    return (
      <div className="page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'white' }}>
        <h2>Loading your reports...</h2>
      </div>
    );
  }

  return (
    <div className="page" style={{ minHeight: '100vh', padding: '40px' }}>
      <nav className="nav" style={{ marginBottom: '40px' }}>
        <div className="nav-logo" onClick={() => navigate('/home')} style={{ cursor: 'pointer' }}>
          Prep<span>AI</span>
        </div>
        <button className="cta-btn" onClick={() => navigate('/home')} style={{ width: 'auto', padding: '10px 20px', margin: 0 }}>
          Generate New
        </button>
      </nav>

      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ color: 'white', marginBottom: '10px', fontSize: '2.5rem' }}>Your Interview Reports</h1>
        <p style={{ color: '#7e7e94', marginBottom: '40px' }}>Review your past AI-generated interview strategies and performance.</p>
        
        {allReports && allReports.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {allReports.map((report) => (
              <div 
                key={report._id} 
                className="plan-card"
                style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                onClick={() => navigate(`/interview/${report._id}`)}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h3>{report.title || 'Interview Report'}</h3>
                  <div className="score-value" style={{ fontSize: '1rem', padding: '5px 10px', background: 'rgba(74, 222, 128, 0.1)', color: '#4ade80', borderRadius: '12px' }}>
                    {report.score || 0}% Match
                  </div>
                </div>
                <p style={{ color: '#7e7e94', fontSize: '0.9rem', marginTop: '10px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {report.jobDescription || 'No job description provided.'}
                </p>
                <div style={{ marginTop: '20px', color: '#9d9dfa', fontSize: '0.9rem', fontWeight: 500 }}>
                  View Full Report →
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="report-shell" style={{ textAlign: 'center', padding: '60px 20px' }}>
            <h3 style={{ color: 'white', marginBottom: '15px' }}>No reports found</h3>
            <p style={{ color: '#7e7e94', marginBottom: '30px' }}>You haven't generated any interview strategies yet.</p>
            <button className="cta-btn" onClick={() => navigate('/home')} style={{ width: 'auto', display: 'inline-flex', padding: '15px 30px' }}>
              Create Your First Strategy
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
