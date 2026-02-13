// src/components/Navbar.jsx
function Navbar({ activePage, onNavigate, onLogout }) {
  const nav = [
    { section: "Overview" },
    { id: "dashboard", label: "Dashboard", icon: "⬡" },
    { section: "Management" },
    { id: "residents", label: "Residents", icon: "◈" },
    { id: "households", label: "Households", icon: "🏠" },
    { id: "programs", label: "Programs", icon: "📌" },
    { id: "cases", label: "Cases", icon: "📋" },
    { section: "Analytics" },
    { id: "segments", label: "Segments", icon: "◉" },
    { id: "predictions", label: "ML Insights", icon: "◆" },
  ];

  return (
    <nav className="navbar">
      <div className="nb-brand">
        <div className="nb-icon">IR</div>
        <div>
          <div className="nb-title">IRPSS</div>
          <div className="nb-sub">Resident Intelligence</div>
        </div>
      </div>

      <ul className="nb-links">
        {nav.map((item, i) =>
          item.section ? (
            <li key={i}><div className="nb-section">{item.section}</div></li>
          ) : (
            <li key={item.id}>
              <button
                className={`nb-btn ${activePage === item.id ? "active" : ""}`}
                onClick={() => onNavigate(item.id)}
              >
                <span className="nb-icon-sm">{item.icon}</span>
                {item.label}
              </button>
            </li>
          )
        )}
      </ul>

      <div className="nb-footer">
        <div className="nb-user">
          <div className="nb-av">AD</div>
          <div>
            <div className="nb-uname">Admin</div>
            <div className="nb-urole">Barangay Hall</div>
          </div>
        </div>
        <button className="nb-logout" onClick={onLogout}>⏏ Sign Out</button>
      </div>
    </nav>
  );
}
export default Navbar;