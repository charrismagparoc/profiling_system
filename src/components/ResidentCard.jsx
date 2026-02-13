// src/components/ResidentCard.jsx
function ResidentCard({ resident, onView, onEdit, onHistory, onDelete }) {
  const initials = resident.name.split(" ").map(n => n[0]).join("").slice(0, 2);
  const riskCls = resident.riskLevel === "High" ? "rb-high" : resident.riskLevel === "Medium" ? "rb-medium" : "rb-low";
  const stsCls = resident.status === "Active" ? "ss-active" : "ss-followup";
  return (
    <article className="res-card">
      <div className="res-card-top">
        <div className="res-av">{initials}</div>
        <div>
          <div className="res-name">{resident.name}</div>
          <div className="res-detail">{resident.age}y · {resident.sex} · {resident.purok}</div>
          <span className={`res-status ${stsCls}`}>{resident.status}</span>
        </div>
      </div>
      <div className="res-scores">
        <div className="score-row">
          <span className="score-lbl">Engagement</span>
          <div className="sbar-wrap"><div className="sbar sbar-e" style={{ width: `${resident.engagementScore}%` }} /></div>
          <span className="score-num">{resident.engagementScore}</span>
        </div>
        <div className="score-row">
          <span className="score-lbl">Vulnerability</span>
          <div className="sbar-wrap"><div className="sbar sbar-v" style={{ width: `${resident.vulnerabilityScore}%` }} /></div>
          <span className="score-num">{resident.vulnerabilityScore}</span>
        </div>
      </div>
      <div className="res-footer">
        <span className="seg-tag">{resident.segment}</span>
        <span className={`risk-badge ${riskCls}`}>{resident.riskLevel} Risk</span>
      </div>
      <div className="res-btns">
        <button className="btn btn-primary btn-sm" onClick={() => onView(resident)}>👁 View</button>
        <button className="btn btn-ghost btn-sm" onClick={() => onEdit(resident)}>✏️ Edit</button>
        <button className="btn btn-ghost btn-sm" onClick={() => onHistory(resident)}>📜 History</button>
        <button className="btn btn-danger btn-sm" onClick={() => onDelete(resident)}>🗑</button>
      </div>
    </article>
  );
}
export default ResidentCard;