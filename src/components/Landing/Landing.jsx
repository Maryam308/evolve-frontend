import { Link } from "react-router-dom";
import "./Landing.css";

const Landing = () => {
  return (
    <main className="landing-container">
      <div className="hero-section">
        <h1 className="hero-title">
          Document Your Journey,
          <br />
          <span className="gradient-text">Celebrate Your Growth</span>
        </h1>

        <p className="hero-subtitle">
          A private space to track achievements, learn from challenges, and
          reflect on your personal evolution over time.
        </p>

        <Link to="/sign-up" className="cta-button">
          Start Your Archive
        </Link>
      </div>

      <div className="features-section">
        <div className="feature-card">
          <div className="icon-wrapper icon-teal">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
              <path d="M4 22h16" />
              <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
              <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
              <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
            </svg>
          </div>
          <h3 className="feature-title">Track Achievements</h3>
          <p className="feature-description">
            Log your wins, document how you got there, and celebrate what worked
            well.
          </p>
        </div>

        <div className="feature-card">
          <div className="icon-wrapper icon-pink">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
            </svg>
          </div>
          <h3 className="feature-title">Track Achievements</h3>
          <p className="feature-description">
            Log your wins, document how you got there, and celebrate what worked
            well.
          </p>
        </div>

        <div className="feature-card">
          <div className="icon-wrapper icon-purple">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
              <polyline points="16 7 22 7 22 13" />
            </svg>
          </div>
          <h3 className="feature-title">Track Achievements</h3>
          <p className="feature-description">
            Log your wins, document how you got there, and celebrate what worked
            well.
          </p>
        </div>
      </div>

      <footer className="landing-footer">
        © All Rights Reserved - Evolve 2025
      </footer>
    </main>
  );
};

export default Landing;
