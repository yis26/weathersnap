import { useState } from "react";
import "./Auth.css";

export default function Register({ navigate }) {
  const [form, setForm] = useState({ username: "", email: "", password: "", confirm: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      alert("Passwords do not match!");
      return;
    }
    alert("Registration functionality coming in Milestone 2!");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">⛅ WeatherSnap</div>
        <h2>Create an account</h2>
        <p className="auth-sub">Start checking weather instantly</p>

        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="yourname"
            value={form.username}
            onChange={handleChange}
            required
          />

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

          <label>Confirm Password</label>
          <input
            type="password"
            name="confirm"
            placeholder="••••••••"
            value={form.confirm}
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn-submit">Create Account</button>
        </form>

        <p className="auth-footer">
          Already have an account?{" "}
          <span onClick={() => navigate("login")}>Login</span>
        </p>
        <p className="auth-footer">
          <span onClick={() => navigate("home")}>← Back to Home</span>
        </p>
      </div>
    </div>
  );
}
