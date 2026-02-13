// src/pages/Predictions.jsx
import PredictionCard from "../components/PredictionCard";
import InsightToggle from "../components/InsightToggle";
import { mlPredictions, residents } from "../data/residents";

function Predictions() {
  const anomalies = [
    { id: "a1", label: "Duplicate Assistance Claims", result: "3 Flagged", confidence: 94, purok: "System-wide", severity: "high" },
    { id: "a2", label: "Income–Benefit Mismatch", result: "2 Flagged", confidence: 89, purok: "Purok 3", severity: "high" },
    { id: "a3", label: "Inactive Program Enrollees", result: "7 Flagged", confidence: 91, purok: "All Puroks", severity: "medium" },
  ];

  const impactInsights = [
    "Residents who completed vocational training increased income by 35% on average.",
    "4Ps families with case management show 90% child school attendance vs 70% without.",
    "Elderly residents with assigned health workers visited clinic 2x more frequently.",
    "Feeding program + family support = 85% malnutrition resolution rate.",
    "Barangay clearance avg processing time reduced from 4 hrs to 1.5 hrs.",
    "Livelihood Training 2024: ROI 202% in first 6 months (₱250k → ₱504k/month new income).",
  ];

  const confCls = (s) => s >= 85 ? "conf-hi" : s >= 70 ? "conf-md" : "conf-lo";

  return (
    <main className="page">
      <div className="page-hdr">
        <div>
          <div className="page-title">ML Insights</div>
          <div className="page-sub">Simulated machine learning outputs · Frontend presentation only</div>
        </div>
        <span style={{ background: "rgba(155,110,240,.12)", color: "var(--purple)", border: "1px solid rgba(155,110,240,.25)", padding: "5px 12px", borderRadius: 999, fontSize: ".74rem", fontWeight: 600 }}>◆ ML Engine</span>
      </div>

      {/* Predictive Risk Alerts */}
      <section className="sec">
        <div className="sec-title"><span>◆</span> Predictive Risk Alerts</div>
        <div className="pred-grid">
          {mlPredictions.map(p => <PredictionCard key={p.id} {...p} />)}
        </div>
      </section>

      {/* Resident Risk Assessment Table */}
      <section className="sec">
        <div className="sec-title"><span>◈</span> Resident Risk Assessment</div>
        <div className="risk-table">
          <div className="rt-hdr">
            <span>Resident</span><span>Segment</span><span>Vulnerability</span><span>Risk</span><span>Confidence</span>
          </div>
          {residents.map(r => (
            <div key={r.id} className="rt-row">
              <span style={{ fontWeight: 600, fontSize: ".84rem" }}>{r.name}</span>
              <span style={{ fontSize: ".74rem", color: "var(--text2)" }}>{r.segment}</span>
              <span style={{ fontWeight: 600 }}>{r.vulnerabilityScore}/100</span>
              <span className={`risk-badge ${r.riskLevel === "High" ? "rb-high" : r.riskLevel === "Medium" ? "rb-medium" : "rb-low"}`}>{r.riskLevel}</span>
              <span className={`conf-val ${confCls(r.engagementScore)}`}>
                {r.engagementScore >= 85 ? "High" : r.engagementScore >= 70 ? "Medium" : "Low"} Confidence
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Anomaly Detection */}
      <section className="sec">
        <div className="sec-title"><span>⬡</span> Anomaly Detection</div>
        <div className="pred-grid">
          {anomalies.map(a => <PredictionCard key={a.id} {...a} />)}
        </div>
      </section>

      {/* Program Impact */}
      <section className="sec">
        <div className="sec-title"><span>◉</span> Program Impact Analysis</div>
        <InsightToggle title="AI-measured program effectiveness outcomes" insights={impactInsights} />
      </section>
    </main>
  );
}
export default Predictions;