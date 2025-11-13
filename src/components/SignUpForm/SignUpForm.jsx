import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import * as authService from "../../services/authService";
import "./SignUpForm.css";

const SignUpForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConf: "",
  });

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    setMessage("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.password !== formData.passwordConf) {
        throw new Error("Passwords do not match");
      }
      const user = await authService.signup(formData);
      if (user.err) {
        throw new Error(user.err);
      }
      setUser(user);
      navigate("/");
    } catch (err) {
      updateMessage(err.message);
    }
  };

  const handleClose = () => {
    navigate("/");
  };

  const { username, password, passwordConf } = formData;

  const isFormInvalid = () => {
    return !(username && password && password === passwordConf);
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleClose}>
          ×
        </button>

        <div className="modal-header">
          <div className="logo-container">
            <div className="logo-icon">
            
            </div>
            <span className="logo-text">Evolve</span>
          </div>

          <h2 className="modal-title">Welcome to Evolve!</h2>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="****"
            />
          </div>

          <div className="form-group">
            <label htmlFor="passwordConf">Confirm Password</label>
            <input
              type="password"
              id="passwordConf"
              name="passwordConf"
              value={formData.passwordConf}
              onChange={handleChange}
              required
              placeholder="****"
            />
          </div>

          {message && <p className="error-message">{message}</p>}

          <button
            type="submit"
            className="submit-button"
            disabled={isFormInvalid()}
          >
            Sign Up
          </button>

          <p className="form-footer">
            Already have account?{" "}
            <Link to="/sign-in" className="form-link">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;