import { useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";

export default function App() {
  const [page, setPage] = useState("home");

  return (
    <div>
      {page === "home" && <Home navigate={setPage} />}
      {page === "login" && <Login navigate={setPage} />}
      {page === "register" && <Register navigate={setPage} />}
    </div>
  );
}
