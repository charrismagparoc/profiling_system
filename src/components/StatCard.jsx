// src/components/StatCard.jsx
function StatCard({ icon, label, value, change, color }) {
  const isUp = change && change.startsWith("+");
  const isDown = change && change.startsWith("-");
  return (
    <article className="stat-card">
      <div className="stat-ico" style={{ color }}>{icon}</div>
      <div>
        <div className="stat-lbl">{label}</div>
        <div className="stat-val" style={{ color }}>{value}</div>
        {change && (
          <div className="stat-chg" style={{ color: isUp ? "#20c070" : isDown ? "#f07830" : undefined }}>
            {change}
          </div>
        )}
      </div>
    </article>
  );
}
export default StatCard;