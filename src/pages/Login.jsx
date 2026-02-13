// src/pages/Login.jsx
import { useState } from "react";
import { ADMIN_CREDENTIALS } from "../data/residents";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      onLogin();
    } else {
      setError("Invalid username or password. Please try again.");
    }
  };

  return (
    <div className="login-wrap">
      <div className="login-card">
        <div className="login-logo">
          <div className="login-logo-icon">IR</div>
          <div className="login-logo-text">
            <h1>IRPSS</h1>
            <span>Intelligent Resident Profiling & Segmentation System</span>
          </div>
        </div>
        <div className="login-title">Admin Sign In</div>
        <div className="login-sub">Barangay Officials & Staff Access Only</div>

        {error && <div className="login-err">⚠️ {error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="login-field">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              autoComplete="username"
            />
          </div>
          <div className="login-field">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className="login-btn">Sign In to Dashboard</button>
        </form>

        <div className="login-hint">Demo credentials: admin / brgy2026</div>
      </div>
    </div>
  );
}
export default Login;