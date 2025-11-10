import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import * as entryService from "../../services/entryService";
import "./Dashboard.css";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [entries, setEntries] = useState([]);
  const [stats, setStats] = useState({
    achievements: 0,
    lessons: 0,
    reflections: 0,
  });

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const fetchedEntries = await entryService.index();
        setEntries(fetchedEntries);

        // Calculate statistics
        const achievements = fetchedEntries.filter(
          (entry) => entry.category === "achievement"
        ).length;
        const lessons = fetchedEntries.filter(
          (entry) => entry.category === "lesson"
        ).length;
        const reflections = fetchedEntries.reduce(
          (total, entry) => total + (entry.reflections?.length || 0),
          0
        );

        setStats({ achievements, lessons, reflections });
      } catch (err) {
        console.log(err);
      }
    };

    if (user) fetchEntries();
  }, [user]);

  return (
    <main className="dashboard">
      <div className="dashboard-container">
        <div className="welcome-section">
          <h1 className="welcome-title">
            Welcome to <span className="highlight-purple">Evolve</span>
            <br />
            <span className="highlight-pink">your Growth Archive!</span>
          </h1>
          <p className="welcome-subtitle">
            Every journey begins with a single step. Start documenting your
            achievements, learning from challenges, and reflecting on your
            progress.
          </p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon teal">
              <svg
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
            <div className="stat-number">{stats.achievements}</div>
            <div className="stat-label">Achievements</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon blue">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
            </div>
            <div className="stat-number">{stats.lessons}</div>
            <div className="stat-label">Lessons</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon purple">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            </div>
            <div className="stat-number">{stats.reflections}</div>
            <div className="stat-label">Reflections</div>
          </div>
        </div>

        <div className="get-started-section">
          <h2 className="section-title">Get Started</h2>

          <div className="step-card">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3 className="step-title">Log Your Achievements</h3>
              <p className="step-description">
                Celebrate your wins, big or small. Document what worked and how
                you got there.
              </p>
            </div>
          </div>

          <div className="step-card">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3 className="step-title">Learn From Challenges</h3>
              <p className="step-description">
                Turn setbacks into growth opportunities. Record how you felt and
                what you'd do differently.
              </p>
            </div>
          </div>

          <div className="step-card">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3 className="step-title">Reflect & Update</h3>
              <p className="step-description">
                Revisit old entries and add new insights as you gain perspective
                over time.
              </p>
            </div>
          </div>
        </div>
      </div>

      <footer className="dashboard-footer">
        © All Rights Reserved - Evolve 2025
      </footer>
    </main>
  );
};

export default Dashboard;
