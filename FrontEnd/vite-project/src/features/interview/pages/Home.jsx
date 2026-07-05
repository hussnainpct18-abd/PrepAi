import { useState, useRef } from "react";
import "../styles/styles.css";
import {useAuth} from "../../auth/hooks/useAuth.js";


export default function Home() {

 const { loading,handleInterviewReport } =useAuth();



  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const MAX_JD = 5000;
  const canGenerate =
    jobDescription.trim().length > 0 &&
    (file || selfDescription.trim().length > 0);
  const missingProfile =
    jobDescription.trim().length > 0 && !file && !selfDescription.trim();

  const handleFile = (f) => {
    if (f && (f.type === "application/pdf")) {
      setFile(f);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    handleFile(f);
  };

  const handleGenerate = () => {
    if (!canGenerate) return;

    handleInterviewReport(jobDescription,selfDescription,file);
    // hook up your API call here
    alert("Generating your interview strategy...");
  };

  if (loading){
    return (<main>Loading......</main>)
  }

  return (
    <>
      {/* <style>{styles}</style> */}
      <div className="page">
        {/* NAV */}
        <nav className="nav">
          <div className="nav-logo">
            Prep<span>AI</span>
          </div>
        </nav>

        {/* HERO */}
        <section className="hero">
          <div className="ai-badge">
            <span className="ai-badge-dot" />
            AI-Powered Strategy Generation • Approx. 60s
          </div>
          <h1>
            Create Your Custom <span>Interview Plan</span>
          </h1>
          <p>
            Let our AI analyze the job requirements and your unique profile to
            build a winning strategy.
          </p>
        </section>

        {/* MAIN GRID */}
        <div className="main-grid">
          {/* LEFT — Job Description */}
          <div
            className="left-card"
            style={{ backgroundColor: "#13131a !important" }}
          >
            <div className="card-header">
              <div className="card-label">
                <span className="card-label-dot" />
                Target Job Description
              </div>
              <button
                className="card-action-link"
                onClick={() => setJobDescription("")}
              >
                Paste
              </button>
            </div>
            <textarea
              className="jd-textarea"
              placeholder={`Paste the full job description here...\ne.g. "Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design..."`}
              value={jobDescription}
              onChange={(e) =>
                setJobDescription(e.target.value.slice(0, MAX_JD))
              }
            />
            <div className="char-count">
              {jobDescription.length} / {MAX_JD} chars
            </div>
          </div>

          {/* RIGHT — Profile */}
          <div className=" right-card">
            {/* Upload */}
            <div>
              <div className="upload-label-row" style={{ marginBottom: 10 }}>
                <span className="upload-label">Your Profile</span>
              </div>
              <div className="upload-label-row" style={{ marginBottom: 10 }}>
                <span style={{ fontSize: 13, color: "#7e7e94" }}>
                  Upload Resume
                </span>
                {file && (
                  <button
                    className="upload-download-link"
                    onClick={() => setFile(null)}
                  >
                    Remove
                  </button>
                )}
              </div>

              {file ? (
                <div className="file-selected">
                  <span className="file-selected-dot" />
                  {file.name}
                </div>
              ) : (
                <div
                  className={`upload-zone${dragOver ? " drag-over" : ""}`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFile(e.target.files[0])}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <svg
                    className="upload-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                    />
                  </svg>
                  <div className="upload-text">
                    <strong>Click to upload or drag & drop</strong>
                  </div>
                  <div className="upload-subtext">PDF (Max 3MB)</div>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="upload-divider">
              <div className="upload-divider-line" />
              <span className="upload-divider-text">OR</span>
              <div className="upload-divider-line" />
            </div>

            {/* Self Description */}
            <div>
              <div className="self-label" style={{ marginBottom: 10 }}>
                Quick Self-Description
              </div>
              <textarea
                className="self-textarea"
                placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                value={selfDescription}
                onChange={(e) => setSelfDescription(e.target.value)}
              />
            </div>

            {/* Warning */}
            {missingProfile && (
              <div className="warning-banner">
                <svg
                  className="warning-icon"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                Either a{" "}
                <strong style={{ color: "#e0485a", margin: "0 3px" }}>
                  Resume
                </strong>{" "}
                or a
                <strong style={{ color: "#e0485a", margin: "0 3px" }}>
                  Self Description
                </strong>{" "}
                is required to generate a personalized plan.
              </div>
            )}
          </div>
        </div>
        {/* CTA */}
        <div className="cta-row">
          <button
            className="cta-btn"
            onClick={handleGenerate}
            disabled={!canGenerate}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
              />
            </svg>
            Generate My Interview Strategy
          </button>
        </div>

        {/* FOOTER */}
        <footer className="footer">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Help Center</a>
        </footer>
      </div>
    </>
  );
}
