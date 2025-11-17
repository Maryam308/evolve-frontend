import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import * as entryService from "../../services/entryService";
import "./Dashboard.css";
import Footer from "../Footer/Footer";

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

        // Filter entries for current user only
        const userEntries = fetchedEntries.filter(
          (entry) => entry.author._id === user._id || entry.author === user._id
        );

        setEntries(userEntries);

        // Calculate statistics based on user's entries only
        const achievements = userEntries.filter(
          (entry) => entry.entryType === "Achievement"
        ).length;

        const lessons = userEntries.filter(
          (entry) => entry.entryType === "Lesson"
        ).length;

        const reflections = userEntries.reduce(
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
    <>
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
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-trophy-icon lucide-trophy"
                >
                  <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978" />
                  <path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978" />
                  <path d="M18 9h1.5a1 1 0 0 0 0-5H18" />
                  <path d="M4 22h16" />
                  <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z" />
                  <path d="M6 9H4.5a1 1 0 0 1 0-5H6" />
                </svg>
              </div>
              <div className="stat-number">{stats.achievements}</div>
              <div className="stat-label">Achievements</div>
            </div>

            <div className="stat-card">
              <div className="stat-icon blue">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-book-open-icon lucide-book-open"
                >
                  <path d="M12 7v14" />
                  <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
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

      </main>
      <Footer />
    </>
  );
};

export default Dashboard;
