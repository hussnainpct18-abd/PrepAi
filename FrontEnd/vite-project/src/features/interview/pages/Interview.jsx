import { useContext, useState } from 'react';
import '../styles/styles.css';
import { InterviewContext } from '../services/interview.context';


export default function Interview() {
  const context = useContext(InterviewContext);
  const { report } = context;

  const interviewData = {
    score: report?.score ?? 0,
    title: report?.title ?? "",
    technicalQuestion: report?.technicalQuestion ?? [],
    behaviouralQuestion: report?.behaviouralQuestion ?? [],
    skillGaps: report?.skillGaps ?? [],
    preparationPlan: report?.preparationPlan ?? []
  };

  const [activeView, setActiveView] = useState('full');
  const progressOffset = 141.3 - (141.3 * interviewData.score) / 100;

  const renderMainContent = () => {
    if (activeView === 'behavioral') {
      return (
        <div className="report-shell">
          <div className="report-header">
            <p className="report-kicker">Interview report</p>
            <h1>{interviewData.title}</h1>
            <p className="report-subtext">Behavioral interview questions and expectations.</p>
          </div>

          <section className="report-section">
            <h2>Behavioural Questions</h2>
            <div className="question-list">
              {interviewData.behaviouralQuestion.map((item, index) => (
                <article key={index} className="question-card">
                  <h3>{item.question}</h3>
                  <p className="question-intentions">{item.intentions}</p>
                  <p className="question-answer">{item.answer}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      );
    }



    if (activeView === 'plan') {
      return (
        <div className="report-shell">
          <div className="report-header">
            <p className="report-kicker">Interview report</p>
            <h1>{interviewData.title}</h1>
            <p className="report-subtext">A focused preparation roadmap for the next interview stage.</p>
          </div>

          <section className="report-section">
            <h2>Preparation Plan</h2>
            <div className="plan-list">
              {interviewData.preparationPlan.map((plan) => (
                <article key={plan.day} className="plan-card">
                  <div className="plan-day">Day {plan.day}</div>
                  <h3>{plan.focus}</h3>
                  <ul>
                    {plan.tasks.map((task, taskIndex) => (
                      <li key={taskIndex}>{task}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        </div>
      );
    }

    if (activeView === 'full') {
      return (
        <div className="report-shell">
          <div className="report-header">
            <p className="report-kicker">Interview report</p>
            <h1>{interviewData.title}</h1>
            <p className="report-subtext">Complete overview of the candidate interview report and preparation summary.</p>
          </div>

          <section className="report-section">
            <h2>Match Score</h2>
            <div className="full-report-card">
              <p>The candidate has a strong overall match score of {interviewData.score}% for this role.</p>
            </div>
          </section>

          <section className="report-section">
            <h2>Technical Questions</h2>
            <div className="question-list">
              {interviewData.technicalQuestion.map((item, index) => (
                <article key={index} className="question-card">
                  <h3>{item.question}</h3>
                  <p className="question-intentions">{item.intentions}</p>
                  <p className="question-answer">{item.answer}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="report-section">
            <h2>Behavioural Questions</h2>
            <div className="question-list">
              {interviewData.behaviouralQuestion.map((item, index) => (
                <article key={index} className="question-card">
                  <h3>{item.question}</h3>
                  <p className="question-intentions">{item.intentions}</p>
                  <p className="question-answer">{item.answer}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="report-section">
            <h2>Skill Gaps</h2>
            <div className="skill-gaps-container full-report-gaps">
              {interviewData.skillGaps.map((gap, index) => (
                <div key={index} className={`skill-badge severity-${gap.severity}`}>
                  {gap.skill}
                </div>
              ))}
            </div>
          </section>

          <section className="report-section">
            <h2>Preparation Plan</h2>
            <div className="plan-list">
              {interviewData.preparationPlan.map((plan) => (
                <article key={plan.day} className="plan-card">
                  <div className="plan-day">Day {plan.day}</div>
                  <h3>{plan.focus}</h3>
                  <ul>
                    {plan.tasks.map((task, taskIndex) => (
                      <li key={taskIndex}>{task}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        </div>
      );
    }

    return (
      <div className="report-shell">
        <div className="report-header">
          <p className="report-kicker">Interview report</p>
          <h1>{interviewData.title}</h1>
          <p className="report-subtext">A dummy report generated from your schema to preview the layout and content structure.</p>
        </div>

        <section className="report-section">
          <h2>Technical Questions</h2>
          <div className="question-list">
            {interviewData.technicalQuestion.map((item, index) => (
              <article key={index} className="question-card">
                <h3>{item.question}</h3>
                <p className="question-intentions">{item.intentions}</p>
                <p className="question-answer">{item.answer}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    );
  };

  return (
    <div className="interview-container">
      <aside className="left-sidebar">
        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeView === 'full' ? 'active' : ''}`}
            onClick={() => setActiveView('full')}
          >
            Whole Report
          </button>
          <button
            className={`nav-item ${activeView === 'technical' ? 'active' : ''}`}
            onClick={() => setActiveView('technical')}
          >
            Technical questions
          </button>
          <button
            className={`nav-item ${activeView === 'behavioral' ? 'active' : ''}`}
            onClick={() => setActiveView('behavioral')}
          >
            Behavioral questions
          </button>
          <button
            className={`nav-item ${activeView === 'plan' ? 'active' : ''}`}
            onClick={() => setActiveView('plan')}
          >
            Road Map
          </button>

        </nav>
      </aside>

      <main className="main-content">
        {renderMainContent()}
      </main>

      <aside className="right-sidebar">
        <div className="match-score-section">
          <div className="match-score-header">Match Score</div>
          <div className="match-score-container">
            <div className="circular-progress">
              <svg className="progress-ring" viewBox="0 0 100 100">
                <circle className="progress-ring-bg" cx="50" cy="50" r="45" />
                <circle
                  className="progress-ring-fill"
                  cx="50"
                  cy="50"
                  r="45"
                  style={{ strokeDashoffset: progressOffset }}
                />
              </svg>
              <div className="score-value">{interviewData.score}%</div>
            </div>
          </div>
        </div>

        <div className="section-divider"></div>

        <div className="skill-gaps-section">
          <div className="skill-gaps-header">Skill Gaps</div>
          <div className="skill-gaps-container">
            {interviewData.skillGaps.map((gap, index) => (
              <div key={index} className={`skill-badge severity-${gap.severity}`}>
                {gap.skill}
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
