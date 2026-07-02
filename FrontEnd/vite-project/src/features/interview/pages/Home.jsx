import { useState, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Sora:wght@600;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: #0d0d0f;
    color: #e2e2e8;
    font-family: 'Inter', sans-serif;
    min-height: 100vh;
  }

  .page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: #0d0d0f;
  }

  /* NAV */
  .nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 48px;
    border-bottom: 1px solid #1e1e24;
  }
  .nav-logo {
    font-family: 'Sora', sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: #fff;
    letter-spacing: -0.3px;
  }
  .nav-logo span { color: #e0485a; }

  /* HERO */
  .hero {
    text-align: center;
    padding: 64px 24px 48px;
  }
  .hero h1 {
    font-family: 'Sora', sans-serif;
    font-size: clamp(28px, 5vw, 48px);
    font-weight: 700;
    color: #fff;
    line-height: 1.15;
    letter-spacing: -0.8px;
    margin-bottom: 16px;
  }
  .hero h1 span { color: #e0485a; }
  .hero p {
    font-size: 15px;
    color: #7e7e94;
    max-width: 480px;
    margin: 0 auto;
    line-height: 1.6;
  }

  /* MAIN GRID */
  .main-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    max-width: 960px;
    margin: 0 auto;
    padding: 0 24px 48px;
    width: 100%;
  }

  /* CARDS */
  .card {
    background: #13131a;
    border: 1px solid #1e1e2e;
    border-radius: 16px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .card-label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    font-weight: 600;
    color: #e2e2e8;
    letter-spacing: 0.2px;
  }
  .card-label-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #e0485a;
    flex-shrink: 0;
  }
  .card-action-link {
    font-size: 12px;
    color: #7e7e94;
    cursor: pointer;
    text-decoration: underline;
    background: none;
    border: none;
    font-family: inherit;
  }
  .card-action-link:hover { color: #e0485a; }

  /* TEXTAREA */
  .jd-textarea {
    background: #0d0d0f;
    border: 1px solid #1e1e2e;
    border-radius: 10px;
    color: #9898b0;
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    line-height: 1.6;
    padding: 14px;
    resize: none;
    height: 220px;
    width: 100%;
    outline: none;
    transition: border-color 0.2s;
  }
  .jd-textarea:focus { border-color: #e0485a44; }
  .jd-textarea::placeholder { color: #3e3e52; }

  .char-count {
    font-size: 11px;
    color: #3e3e52;
    text-align: right;
    margin-top: -8px;
  }

  /* RIGHT CARD stacked layout */
  .right-card {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  /* UPLOAD ZONE */
  .upload-label-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .upload-label {
    font-size: 13px;
    font-weight: 600;
    color: #e2e2e8;
  }
  .upload-download-link {
    font-size: 12px;
    color: #7e7e94;
    text-decoration: underline;
    cursor: pointer;
    background: none;
    border: none;
    font-family: inherit;
  }

  .upload-zone {
    background: #0d0d0f;
    border: 1.5px dashed #2a2a3a;
    border-radius: 12px;
    padding: 32px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s;
    position: relative;
  }
  .upload-zone:hover, .upload-zone.drag-over {
    border-color: #e0485a66;
    background: #1a0d10;
  }
  .upload-zone input {
    position: absolute;
    inset: 0;
    opacity: 0;
    cursor: pointer;
    width: 100%;
    height: 100%;
  }
  .upload-icon {
    width: 36px;
    height: 36px;
    color: #e0485a;
  }
  .upload-text {
    font-size: 13px;
    color: #9898b0;
    text-align: center;
    line-height: 1.5;
  }
  .upload-text strong { color: #e2e2e8; }
  .upload-subtext {
    font-size: 11px;
    color: #3e3e52;
  }
  .upload-divider {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .upload-divider-line {
    flex: 1;
    height: 1px;
    background: #1e1e2e;
  }
  .upload-divider-text {
    font-size: 11px;
    color: #3e3e52;
  }
  .file-selected {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #1a1a24;
    border-radius: 8px;
    padding: 8px 12px;
    font-size: 12px;
    color: #9898b0;
  }
  .file-selected-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #4ade80;
    flex-shrink: 0;
  }

  /* SELF DESCRIPTION */
  .self-label {
    font-size: 13px;
    font-weight: 600;
    color: #e2e2e8;
  }
  .self-textarea {
    background: #0d0d0f;
    border: 1px solid #1e1e2e;
    border-radius: 10px;
    color: #9898b0;
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    line-height: 1.6;
    padding: 12px 14px;
    resize: none;
    height: 90px;
    width: 100%;
    outline: none;
    transition: border-color 0.2s;
  }
  .self-textarea:focus { border-color: #e0485a44; }
  .self-textarea::placeholder { color: #3e3e52; }

  /* WARNING BANNER */
  .warning-banner {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    background: #1a0f0d;
    border: 1px solid #3a1a1a;
    border-radius: 10px;
    padding: 12px 14px;
    font-size: 12px;
    color: #c07070;
    line-height: 1.5;
  }
  .warning-icon { flex-shrink: 0; margin-top: 1px; }

  /* CTA */
  .cta-row {
    display: flex;
    justify-content: flex-end;
    padding: 0 24px 32px;
    max-width: 960px;
    margin: 0 auto;
    width: 100%;
  }
  .cta-btn {
    display: flex;
    align-items: center;
    gap: 10px;
    background: linear-gradient(135deg, #e0485a, #b83048);
    color: #fff;
    font-family: 'Sora', sans-serif;
    font-size: 15px;
    font-weight: 600;
    padding: 14px 28px;
    border-radius: 50px;
    border: none;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.15s;
    letter-spacing: -0.2px;
    box-shadow: 0 4px 24px #e0485a33;
  }
  .cta-btn:hover { opacity: 0.9; transform: translateY(-1px); }
  .cta-btn:active { transform: translateY(0); }
  .cta-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
  .cta-btn svg { width: 18px; height: 18px; }

  /* FOOTER */
  .footer {
    margin-top: auto;
    border-top: 1px solid #1e1e24;
    padding: 18px 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 28px;
  }
  .footer a {
    font-size: 12px;
    color: #3e3e52;
    text-decoration: none;
  }
  .footer a:hover { color: #7e7e94; }

  /* BADGE */
  .ai-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #1a1a24;
    border: 1px solid #2a2a3a;
    border-radius: 20px;
    padding: 5px 12px;
    font-size: 11px;
    color: #7e7e94;
    margin-bottom: 16px;
  }
  .ai-badge-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #e0485a;
    animation: pulse 2s infinite;
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }

  @media (max-width: 680px) {
    .main-grid { grid-template-columns: 1fr; }
    .nav { padding: 16px 20px; }
    .cta-row { padding: 0 20px 28px; }
    .footer { padding: 16px 20px; gap: 16px; }
  }
`;

export default function Home() {
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const MAX_JD = 5000;
  const canGenerate = jobDescription.trim().length > 0 && (file || selfDescription.trim().length > 0);
  const missingProfile = jobDescription.trim().length > 0 && !file && !selfDescription.trim();

  const handleFile = (f) => {
    if (f && (f.type === "application/pdf" || f.name.endsWith(".docx"))) {
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
    // hook up your API call here
    alert("Generating your interview strategy...");
  };

  return (
    <>
      <style>{styles}</style>
      <div className="page">

        {/* NAV */}
        <nav className="nav">
          <div className="nav-logo">Prep<span>AI</span></div>
        </nav>

        {/* HERO */}
        <section className="hero">
          <div className="ai-badge">
            <span className="ai-badge-dot" />
            AI-Powered Strategy Generation • Approx. 60s
          </div>
          <h1>Create Your Custom <span>Interview Plan</span></h1>
          <p>Let our AI analyze the job requirements and your unique profile to build a winning strategy.</p>
        </section>

        {/* MAIN GRID */}
        <div className="main-grid">

          {/* LEFT — Job Description */}
          <div className="card">
            <div className="card-header">
              <div className="card-label">
                <span className="card-label-dot" />
                Target Job Description
              </div>
              <button className="card-action-link" onClick={() => setJobDescription("")}>
                Paste
              </button>
            </div>
            <textarea
              className="jd-textarea"
              placeholder={`Paste the full job description here...\ne.g. "Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design..."`}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value.slice(0, MAX_JD))}
            />
            <div className="char-count">{jobDescription.length} / {MAX_JD} chars</div>
          </div>

          {/* RIGHT — Profile */}
          <div className="card right-card">

            {/* Upload */}
            <div>
              <div className="upload-label-row" style={{ marginBottom: 10 }}>
                <span className="upload-label">Your Profile</span>
              </div>
              <div className="upload-label-row" style={{ marginBottom: 10 }}>
                <span style={{ fontSize: 13, color: "#7e7e94" }}>Upload Resume</span>
                {file && (
                  <button className="upload-download-link" onClick={() => setFile(null)}>Remove</button>
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
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
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
                  <svg className="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
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
              <div className="self-label" style={{ marginBottom: 10 }}>Quick Self-Description</div>
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
                <svg className="warning-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                Either a <strong style={{ color: "#e0485a", margin: "0 3px" }}>Resume</strong> or a
                <strong style={{ color: "#e0485a", margin: "0 3px" }}>Self Description</strong> is required to generate a personalized plan.
              </div>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="cta-row">
          <button className="cta-btn" onClick={handleGenerate} disabled={!canGenerate}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
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