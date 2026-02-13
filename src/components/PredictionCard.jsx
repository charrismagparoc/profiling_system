// src/components/PredictionCard.jsx
function PredictionCard({ label, result, confidence, purok, severity }) {
  const cls = confidence >= 85 ? "conf-hi" : confidence >= 70 ? "conf-md" : "conf-lo";
  return (
    <section className="pred-card">
      <div className="pred-card-hdr">
        <span className="pred-lbl">{label}</span>
        <span className={`pred-sev ${severity === "high" ? "sev-high" : "sev-medium"}`}>
          {severity}
        </span>
      </div>
      <div className="pred-result">{result}</div>
      <div style={{ fontSize: ".72rem", color: "var(--text3)" }}>{purok}</div>
      <div className="pred-footer">
        <span className="conf-lbl">Confidence</span>
        <div className="conf-bar-wrap">
          <div className="conf-bar" style={{ width: `${confidence}%` }} />
        </div>
        <span className={`conf-val ${cls}`}>{confidence}%</span>
      </div>
    </section>
  );
}
export default PredictionCard;