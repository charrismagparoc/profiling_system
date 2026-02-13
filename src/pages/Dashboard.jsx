// src/pages/Dashboard.jsx
import StatCard from "../components/StatCard";
import PredictionCard from "../components/PredictionCard";
import InsightToggle from "../components/InsightToggle";
import { dashboardStats, mlPredictions, segments, cases } from "../data/residents";

function Dashboard() {
  const insights = [
    "47 residents in Purok 1-2 are predicted to need financial assistance next quarter.",
    "School dropout risk elevated for 12 youths in Purok 4 — recommend outreach immediately.",
    "3 families flagged for anomalous assistance claims — review pending.",
    "4Ps beneficiaries with case management show 90% child school attendance vs 70% without.",
    "Residents who completed vocational training increased income by 35% on average.",
    "23 senior citizens overdue for their quarterly health checkup.",
  ];

  return (
    <main className="page">
      {/* Header */}
      <div className="page-hdr">
        <div>
          <div className="page-title">Command Dashboard</div>
          <div className="page-sub">Barangay Intelligence Overview · Feb 12, 2026</div>
        </div>
        <div className="badge-live"><span className="dot-live" /> Live Data</div>
      </div>

      {/* Quick Stats Cards */}
      <section className="stats-grid">
        {dashboardStats.map((s, i) => (
          <StatCard key={i} icon={s.icon} label={s.label} value={s.value} change={s.change} color={s.color} />
        ))}
      </section>

      {/* ML Predictions */}
      <section className="sec">
        <div className="sec-title"><span>◆</span> Predictive Risk Alerts</div>
        <div className="pred-grid">
          {mlPredictions.map(p => (
            <PredictionCard key={p.id} label={p.label} result={p.result} confidence={p.confidence} purok={p.purok} severity={p.severity} />
          ))}
        </div>
      </section>

      {/* Segment Overview */}
      <section className="sec">
        <div className="sec-title"><span>◉</span> Resident Segments Summary</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {segments.map(seg => (
            <div key={seg.id} style={{ display: "flex", alignItems: "center", gap: "12px", background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: "var(--r)", padding: "11px 16px" }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: seg.color, display: "inline-block", flexShrink: 0 }} />
              <span style={{ fontSize: ".84rem", fontWeight: 500, flex: 1, minWidth: 220 }}>{seg.name}</span>
              <div style={{ flex: 2, height: 5, background: "var(--bg5)", borderRadius: 999, overflow: "hidden" }}>
                <div style={{ width: `${(seg.count / 213) * 100}%`, height: "100%", background: seg.color, borderRadius: 999 }} />
              </div>
              <span style={{ fontFamily: "var(--fh)", fontWeight: 700, minWidth: 36, textAlign: "right", fontSize: ".88rem" }}>{seg.count}</span>
              <span style={{ fontSize: ".7rem", color: "var(--text3)", minWidth: 70, textAlign: "right" }}>{seg.confidence}% conf.</span>
            </div>
          ))}
        </div>
      </section>

      {/* Active Cases Summary */}
      <section className="sec">
        <div className="sec-title"><span>◈</span> Active Cases</div>
        <div className="case-list">
          {cases.map(c => (
            <div key={c.id} className="case-card">
              <div>
                <div className="case-id">Case #{c.id}</div>
                <div className="case-type">{c.type}</div>
                <div className="case-meta">Resident: {c.resident} · Assigned: {c.assignedTo}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span className="risk-badge" style={{ background: c.priority === "High" ? "rgba(239,70,70,.12)" : "rgba(245,192,48,.12)", color: c.priority === "High" ? "var(--red)" : "var(--yellow)" }}>
                  {c.priority}
                </span>
                <span className={`doc-status ${c.status === "Resolved" ? "cs-resolved" : c.status === "In Progress" ? "cs-inprog" : "cs-open"}`}>
                  {c.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AI Recommendations Toggle */}
      <section className="sec">
        <div className="sec-title"><span>◈</span> AI Recommendations</div>
        <InsightToggle title="System-generated insights for this period" insights={insights} />
      </section>
    </main>
  );
}
export default Dashboard;