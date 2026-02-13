// src/components/InsightToggle.jsx
import { useState } from "react";
function InsightToggle({ title, insights }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="insight-box">
      <div className="insight-hdr">
        <span><span className="insight-dot" /><span className="insight-ttl">{title}</span></span>
        <button
          className={`chip ${open ? "on" : ""}`}
          onClick={() => setOpen(!open)}
        >
          {open ? "Hide ↑" : "Show ↓"}
        </button>
      </div>
      {open && (
        <ul className="insight-list">
          {insights.map((ins, i) => (
            <li key={i} className="insight-li">
              <span className="i-bullet">◆</span>{ins}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default InsightToggle;