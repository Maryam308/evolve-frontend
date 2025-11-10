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
        <div className="logo-icon">⚡</div>
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
