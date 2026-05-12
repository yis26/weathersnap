import { useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Otp from "./pages/Otp";
import "./App.css";

export default function App() {
  const [page, setPage] = useState("home");
  const [userId, setUserId] = useState(null);

  const handleLogin = (id) => {
    setUserId(id);
    setPage("otp");
  };

  return (
    <div>
      {page === "home" && <Home navigate={setPage} />}
      {page === "login" && <Login navigate={setPage} onOTP={handleLogin} />}
      {page === "register" && <Register navigate={setPage} />}
      {page === "otp" && <Otp navigate={setPage} userId={userId} />}
    </div>
  );
}