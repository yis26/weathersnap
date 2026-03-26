import { useState } from "react";
import "./Auth.css";

export default function Login({ navigate }) {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Login functionality coming in Milestone 2!");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">⛅ WeatherSnap</div>
        <h2>Welcome back</h2>
        <p className="auth-sub">Sign in to your account</p>

        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="you@email.com"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn-submit">Login</button>
        </form>

        <p className="auth-footer">
          Don't have an account?{" "}
          <span onClick={() => navigate("register")}>Sign up</span>
        </p>
        <p className="auth-footer">
          <span onClick={() => navigate("home")}>← Back to Home</span>
        </p>
      </div>
    </div>
  );
}
