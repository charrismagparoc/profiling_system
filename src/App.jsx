// src/App.jsx
import { useState } from "react";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import "./index.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");
  const [toastMsg, setToastMsg] = useState(null);

  const showToast = (msg, type = "s") => {
    setToastMsg({ msg, type });
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActivePage("dashboard");
  };

  if (!isLoggedIn) return <Login onLogin={() => setIsLoggedIn(true)} />;

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":   return <Dashboard />;
      default:            return <Dashboard />;
    }
  };

  return (
    <div className="app-layout">
      <Navbar activePage={activePage} onNavigate={setActivePage} onLogout={handleLogout} />
      <div className="app-main">{renderPage()}</div>

      {toastMsg && (
        <div className={`toast ${toastMsg.type === "s" ? "toast-s" : "toast-e"}`}>
          {toastMsg.type === "s" ? "✅" : "🗑️"} {toastMsg.msg}
        </div>
      )}
    </div>
  );
}
export default App;