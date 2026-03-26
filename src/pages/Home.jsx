import "./Home.css";

export default function Home({ navigate }) {
  return (
    <div className="home">
      <nav className="navbar">
        <span className="logo">⛅ WeatherSnap</span>
        <div className="nav-links">
          <button onClick={() => navigate("login")}>Login</button>
          <button className="btn-primary" onClick={() => navigate("register")}>Sign Up</button>
        </div>
      </nav>

      <div className="hero">
        <h1>Know Your Weather,<br />Wherever You Are.</h1>
        <p>Search any city. Get instant conditions. Save your history.</p>
        <div className="search-bar">
          <input type="text" placeholder="Enter a city... e.g. Newark, NJ" disabled />
          <button disabled>Search</button>
        </div>
        <span className="search-note">Sign in to search and save your history</span>
      </div>

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
          <p>Your data is protected with hashed passwords and email verification.</p>
        </div>
      </div>

      <footer>
        <p>WeatherSnap · IT 340 Project · Youssef Sadek</p>
      </footer>
    </div>
  );
}
