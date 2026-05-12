import { useState } from "react";
import "./Auth.css";

export default function Login({ navigate, onOTP }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      const data = await response.json();
      console.log("Login response:", data);

      if (data.requiresOTP === true) {
        console.log("Navigating to OTP with userId:", data.userId);
        onOTP(data.userId);
        return;
      }

      if (!response.ok) {
        setError(data.message || "Login failed");
      }

    } catch (err) {
      console.log("Catch error:", err);
      setError("Cannot connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">⛅ WeatherSnap</div>
        <h2>Welcome back</h2>
        <p className="auth-sub">Sign in to your account</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input type="email" name="email" placeholder="you@email.com" value={form.email} onChange={handleChange} required />
          <label>Password</label>
          <input type="password" name="password" placeholder="••••••••" value={form.password} onChange={handleChange} required />
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account? <span onClick={() => navigate("register")}>Sign up</span>
        </p>
        <p className="auth-footer">
          <span onClick={() => navigate("home")}>← Back to Home</span>
        </p>
      </div>
    </div>
  );
}