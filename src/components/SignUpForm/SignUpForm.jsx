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
<<<<<<< HEAD
<<<<<<< HEAD
    <main>
      <h1>Sign Up</h1>
      <p>{message}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='username'>Username:</label>
          <input
            type='text'
            id='username'
            value={username}
            name='username'
            onChange={handleChange}
            required
          />
=======
=======
>>>>>>> 04412e1e4da9d03cbc691c25010c67d7dbe6be37
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleClose}>
          ×
        </button>

        <div className="modal-header">
          <div className="logo-container">
            <div className="logo-icon">
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
                className="lucide lucide-sparkles-icon lucide-sparkles"
              >
                <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
                <path d="M20 2v4" />
                <path d="M22 4h-4" />
                <circle cx="4" cy="20" r="2" />
              </svg>
            </div>
            <span className="logo-text">Evolve</span>
          </div>

          <h2 className="modal-title">Welcome to Evolve!</h2>
<<<<<<< HEAD
>>>>>>> 2fe9bda1c419a618c39a8605383b7a60467c3e53
=======
>>>>>>> 04412e1e4da9d03cbc691c25010c67d7dbe6be37
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
