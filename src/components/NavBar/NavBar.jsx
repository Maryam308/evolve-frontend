import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import "./NavBar.css";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <div className="logo-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-sparkles-icon lucide-sparkles"
          >
            <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
            <path d="M20 2v4" />
            <path d="M22 4h-4" />
            <circle cx="4" cy="20" r="2" />
          </svg>
        </div>
        <span>Evolve</span>
      </Link>

      {user ? (
        <>
          <div className="nav-tabs">
            <Link
              to="/dashboard"
              className={`nav-tab ${
                location.pathname === "/dashboard" ? "active" : ""
              }`}
            >
              Home
            </Link>
            <Link
              to="/achievements"
              className={`nav-tab ${
                location.pathname === "/achievements" ? "active" : ""
              }`}
            >
              Achievements
            </Link>
            <Link
              to="/lessons"
              className={`nav-tab ${
                location.pathname === "/lessons" ? "active" : ""
              }`}
            >
              Lessons
            </Link>
          </div>

          <div className="nav-right">
            <span className="user-greeting">Hello {user.username}</span>
            <button onClick={handleSignOut} className="nav-button-primary">
              Sign out
            </button>
          </div>
        </>
      ) : (
        <div className="nav-buttons">
          <Link to="/sign-in" className="nav-button-secondary">
            Sign In
          </Link>
          <Link to="/sign-up" className="nav-button-primary">
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
