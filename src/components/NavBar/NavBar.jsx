import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import "./NavBar.css";

const NavBar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    // Remove saved auth token, clear user from context, and navigate to landing
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

      <div className="nav-buttons">
        {user ? (
          <div>
            <button onClick={handleSignOut} className="nav-button-secondary">
              Sign Out
            </button>
            <Link to="/entries" className="nav-button-secondary">
              Entries
            </Link>
          </div>
        ) : (
          <>
            <Link to="/sign-in" className="nav-button-secondary">
              Sign In
            </Link>
            <Link to="/sign-up" className="nav-button-primary">
              Get Started
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
