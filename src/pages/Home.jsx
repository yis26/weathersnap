import { useState, useEffect } from "react";
import "./Home.css";

export default function Home({ navigate }) {
  const [user, setUser] = useState(null);
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
      fetchHistory();
    }
  }, []);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/weather/history/me", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      if (response.ok) setHistory(data);
    } catch (err) {
      console.error("History fetch failed", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setWeather(null);
    setHistory([]);
  };

  const handleSearch = async (searchCity) => {
    const target = searchCity || city;
    if (!target.trim()) return;
    setError("");
    setLoading(true);
    setWeather(null);

    try {
      const token = localStorage.getItem("token");
      const headers = { "Content-Type": "application/json" };
      if (token) headers.Authorization = `Bearer ${token}`;

      const response = await fetch(`/api/weather/${target}`, { headers });
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "City not found");
      } else {
        setWeather(data);
        if (token) fetchHistory();
      }
    } catch (err) {
      setError("Cannot connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <nav className="navbar">
        <span className="logo">⛅ WeatherSnap</span>
        <div className="nav-links">
          {user ? (
            <>
              <span className="welcome-text">Welcome, {user.username}!</span>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <button onClick={() => navigate("login")}>Login</button>
              <button className="btn-primary" onClick={() => navigate("register")}>Sign Up</button>
            </>
          )}
        </div>
      </nav>

      <div className="hero">
        <h1>Know Your Weather,<br />Wherever You Are.</h1>
        <p>Search any city. Get instant conditions.</p>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Enter a city... e.g. Newark, NJ"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button onClick={() => handleSearch()} disabled={loading}>
            {loading ? "..." : "Search"}
          </button>
        </div>
        {!user && <span className="search-note">Sign in to save your search history</span>}
      </div>

      {error && <div className="weather-error">{error}</div>}

      {weather && (
        <div className="weather-card">
          <h2>{weather.city}, {weather.country}</h2>
          <div className="weather-main">
            <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt={weather.description} />
            <span className="weather-temp">{Math.round(weather.temp)}°F</span>
          </div>
          <p className="weather-desc">{weather.description}</p>
          <div className="weather-details">
            <div><span>Feels Like</span><strong>{Math.round(weather.feels_like)}°F</strong></div>
            <div><span>Humidity</span><strong>{weather.humidity}%</strong></div>
            <div><span>Wind</span><strong>{weather.wind} mph</strong></div>
          </div>
        </div>
      )}

      {user && history.length > 0 && (
        <div className="history-section">
          <h3>Recent Searches</h3>
          <div className="history-list">
            {history.map((item, i) => (
              <button key={i} className="history-item" onClick={() => handleSearch(item.city)}>
                🕐 {item.city}, {item.result?.country} — {Math.round(item.result?.temp)}°F
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="features">
        <div className="card">
          <span>🔍</span>
          <h3>City Search</h3>
          <p>Look up current weather for any city worldwide using live API data.</p>
        </div>
        <div className="card">
          <span>📋</span>
          <h3>Search History</h3>
          <p>Your recent searches are saved so you can quickly re-check cities.</p>
        </div>
        <div className="card">
          <span>🔒</span>
          <h3>Secure Account</h3>
          <p>Your data is protected with hashed passwords and JWT tokens.</p>
        </div>
      </div>

      <footer>
        <p>WeatherSnap · IT 340 Project · Youssef Sadek</p>
      </footer>
    </div>
  );
}