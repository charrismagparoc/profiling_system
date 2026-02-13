// src/components/ResidentProfile.jsx — Full 360° Profile View
import { useState } from "react";

const TABS = ["Personal Info", "Family", "Health", "Employment", "Documents", "Programs", "Assistance", "Events"];

function ResidentProfile({ resident, onClose, onEdit, onDelete }) {
  const [tab, setTab] = useState("Personal Info");

  const initials = resident.name.split(" ").map(n => n[0]).join("").slice(0, 2);
  const riskCls = resident.riskLevel === "High" ? "rb-high" : resident.riskLevel === "Medium" ? "rb-medium" : "rb-low";

  return (
    <div className="profile-overlay" onClick={onClose}>
      <div className="profile-modal" onClick={e => e.stopPropagation()}>

        {/* 1. Profile Header — Action Buttons */}
        <div className="profile-hdr">
          <div className="profile-hdr-left">
            <div className="profile-av">{initials}</div>
            <div>
              <div className="profile-name">{resident.name}</div>
              <div className="profile-meta">
                {resident.sex}, {resident.age} years old · {resident.purok} · {resident.role}
              </div>
              <div className="profile-id">ID: {resident.residentId} · HH: {resident.householdId}</div>
            </div>
          </div>
          <div className="profile-actions">
            <button className="btn btn-ghost btn-sm" onClick={() => onEdit(resident)}>✏️ Edit</button>
            <button className="btn btn-ghost btn-sm" onClick={() => alert(`History for ${resident.name}`)}>📜 History</button>
            <button className="btn btn-danger btn-sm" onClick={() => onDelete(resident)}>🗑 Delete</button>
            <button className="btn btn-ghost btn-sm" onClick={onClose}>✕</button>
          </div>
        </div>

        {/* 2. Quick Stats Cards */}
        <div className="profile-quick-stats">
          <div className="pqs-item">
            <div className="pqs-label">Last Interaction</div>
            <div className="pqs-val" style={{ fontSize: ".82rem" }}>
              {resident.lastInteraction}<br />
              <span style={{ fontSize: ".68rem", color: "var(--text3)" }}>{resident.lastInteractionType}</span>
            </div>
          </div>
          <div className="pqs-item">
            <div className="pqs-label">Engagement Score</div>
            <div className="pqs-val" style={{ color: "var(--accent)" }}>
              {resident.engagementScore}/100
              <span style={{ fontSize: ".68rem", color: "var(--text3)", display: "block" }}>
                {resident.engagementScore >= 80 ? "Highly Active" : resident.engagementScore >= 50 ? "Moderately Active" : "Low Activity"}
              </span>
            </div>
          </div>
          <div className="pqs-item">
            <div className="pqs-label">Vulnerability Score</div>
            <div className="pqs-val" style={{ color: resident.vulnerabilityScore >= 70 ? "var(--red)" : resident.vulnerabilityScore >= 45 ? "var(--yellow)" : "var(--green)" }}>
              {resident.vulnerabilityScore}/100
              <span style={{ fontSize: ".68rem", color: "var(--text3)", display: "block" }}>{resident.riskLevel} Risk</span>
            </div>
          </div>
          <div className="pqs-item">
            <div className="pqs-label">Segment</div>
            <div className="pqs-val" style={{ fontSize: ".78rem" }}>{resident.segment}</div>
          </div>
        </div>

        {/* 3. Timeline Widget */}
        <div className="profile-timeline">
          <div className="timeline-title">📊 Timeline (Last 12 Months)</div>
          <div className="timeline-list">
            {resident.timeline && resident.timeline.length > 0 ? resident.timeline.map((tl, i) => (
              <div key={i} className="tl-row">
                <span className="tl-month">{tl.month}</span>
                <div className="tl-events">
                  {tl.events.map((ev, j) => <span key={j} className="tl-tag">{ev}</span>)}
                </div>
              </div>
            )) : (
              <div style={{ fontSize: ".78rem", color: "var(--text3)" }}>No timeline events recorded.</div>
            )}
          </div>
        </div>

        {/* 4. Tabbed Interface */}
        <div className="profile-tabs-nav">
          {TABS.map(t => (
            <button key={t} className={`profile-tab-btn ${tab === t ? "active" : ""}`} onClick={() => setTab(t)}>
              {t}
            </button>
          ))}
        </div>

        <div className="profile-tab-body">
          {tab === "Personal Info" && (
            <div className="tab-grid">
              {[
                ["Full Name", resident.name],
                ["Resident ID", resident.residentId],
                ["Age", `${resident.age} years old`],
                ["Sex", resident.sex],
                ["Birthdate", resident.birthdate],
                ["Civil Status", resident.civilStatus],
                ["Purok", resident.purok],
                ["Address", resident.address],
                ["Contact", resident.contactNumber || "—"],
                ["Email", resident.email || "—"],
                ["PhilSys ID", resident.philsysId || "—"],
                ["Voter Status", resident.voterStatus],
              ].map(([lbl, val]) => (
                <div key={lbl} className="tab-field">
                  <div className="tf-label">{lbl}</div>
                  <div className="tf-val">{val}</div>
                </div>
              ))}
            </div>
          )}

          {tab === "Family" && (
            <>
              {resident.family && resident.family.length > 0 ? (
                <table className="family-table">
                  <thead>
                    <tr>
                      <th>Name</th><th>Relation</th><th>Age/Sex</th>
                      <th>Occupation</th><th>Income</th><th>Health</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resident.family.map((m, i) => (
                      <tr key={i}>
                        <td>{m.name}</td>
                        <td><span className="risk-badge rb-low">{m.relation}</span></td>
                        <td>{m.age}/{m.sex}</td>
                        <td>{m.occupation}</td>
                        <td>{m.income > 0 ? `₱${m.income.toLocaleString()}` : "—"}</td>
                        <td>{m.health}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div style={{ fontSize: ".82rem", color: "var(--text3)" }}>No family members recorded for this resident.</div>
              )}
            </>
          )}

          {tab === "Health" && (
            <div className="tab-grid">
              {[
                ["Blood Type", resident.health?.bloodType || "—"],
                ["BMI", resident.health?.bmi || "—"],
                ["Chronic Conditions", resident.health?.conditions || "None"],
                ["Current Medications", resident.health?.medications || "None"],
                ["Last Clinic Visit", resident.health?.lastVisit || "—"],
              ].map(([lbl, val]) => (
                <div key={lbl} className="tab-field">
                  <div className="tf-label">{lbl}</div>
                  <div className="tf-val">{val}</div>
                </div>
              ))}
            </div>
          )}

          {tab === "Employment" && (
            <div className="tab-grid">
              {[
                ["Occupation", resident.occupation],
                ["Monthly Income", `₱${resident.income.toLocaleString()}`],
                ["Education", resident.education],
                ["Employment Status", resident.income > 0 ? "Employed" : "Unemployed/Student"],
              ].map(([lbl, val]) => (
                <div key={lbl} className="tab-field">
                  <div className="tf-label">{lbl}</div>
                  <div className="tf-val">{val}</div>
                </div>
              ))}
            </div>
          )}

          {tab === "Documents" && (
            <div className="doc-list">
              {resident.documents && resident.documents.length > 0 ? resident.documents.map((d, i) => (
                <div key={i} className="doc-row">
                  <div>
                    <div className="doc-type">{d.type}</div>
                    <div className="doc-date">Issued: {d.issued}</div>
                  </div>
                  <span className={`doc-status ${d.status === "Valid" ? "ds-valid" : "ds-expired"}`}>{d.status}</span>
                </div>
              )) : <div style={{ fontSize: ".82rem", color: "var(--text3)" }}>No documents on record.</div>}
            </div>
          )}

          {tab === "Programs" && (
            <div className="doc-list">
              {resident.programs && resident.programs.length > 0 ? resident.programs.map((p, i) => (
                <div key={i} className="doc-row">
                  <div className="doc-type">{p}</div>
                  <span className="doc-status ds-valid">Active</span>
                </div>
              )) : <div style={{ fontSize: ".82rem", color: "var(--text3)" }}>Not enrolled in any programs.</div>}
            </div>
          )}

          {tab === "Assistance" && (
            <div className="doc-list">
              {resident.assistance && resident.assistance.length > 0 ? resident.assistance.map((a, i) => (
                <div key={i} className="doc-row">
                  <div>
                    <div className="doc-type">{a.program}</div>
                    <div className="doc-date">{a.date}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontWeight: 700, color: "var(--green)" }}>₱{a.amount.toLocaleString()}</div>
                    <span className="doc-status ds-valid">{a.status}</span>
                  </div>
                </div>
              )) : <div style={{ fontSize: ".82rem", color: "var(--text3)" }}>No assistance received on record.</div>}
            </div>
          )}

          {tab === "Events" && (
            <div className="timeline-list">
              {resident.timeline && resident.timeline.flatMap(t => t.events.map(ev => ({ month: t.month, ev }))).map((item, i) => (
                <div key={i} className="tl-row">
                  <span className="tl-month">{item.month}</span>
                  <div className="tl-events"><span className="tl-tag">{item.ev}</span></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default ResidentProfile;