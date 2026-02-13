// src/pages/Households.jsx
import { residents } from "../data/residents";

function Households() {
  // Group residents by household
  const households = {};
  residents.forEach(r => {
    if (!r.householdId) return;
    if (!households[r.householdId]) households[r.householdId] = { id: r.householdId, members: [], alerts: [] };
    households[r.householdId].members.push(r);
  });

  // The Dela Cruz household detailed view (from txt)
  const delacruz = {
    id: "HH-1234", name: "Dela Cruz Family", address: "123 Main St, Purok 3",
    houseType: "Concrete | Owned | 80 sqm", income: 23000, perCapita: 4600,
    classification: "Near-Poor (just above 4Ps threshold)",
    members: [
      { name: "Juan Dela Cruz", role: "Head", age: 34, sex: "M", occupation: "Driver", income: 15000, health: "Hypertension | Last visit: 2 weeks ago" },
      { name: "Maria Dela Cruz", role: "Spouse", age: 32, sex: "F", occupation: "Vendor", income: 8000, health: "Healthy | Pregnant (5 months)" },
      { name: "Pedro Dela Cruz", role: "Child", age: 12, sex: "M", occupation: "Grade 6, Public School", income: 0, health: "Healthy", program: "Feeding Program" },
      { name: "Ana Dela Cruz", role: "Child", age: 8, sex: "F", occupation: "Grade 2, Public School", income: 0, health: "Malnourished (being monitored)" },
      { name: "Rosa Dela Cruz", role: "Parent", age: 70, sex: "F", occupation: "Retired", income: 3000, health: "Diabetes, Arthritis | PWD ID holder" },
    ],
    alerts: [
      { type: "danger", icon: "⚠️", text: "Ana's malnutrition — Refer to feeding program" },
      { type: "danger", icon: "⚠️", text: "Lola Rosa missed 2 diabetes checkups" },
      { type: "tip", icon: "💡", text: "Pedro eligible for scholarship (honor student)" },
    ],
  };

  return (
    <main className="page">
      <div className="page-hdr">
        <div>
          <div className="page-title">Household Registry</div>
          <div className="page-sub">Family unit profiles · {Object.keys(households).length + 1} households</div>
        </div>
      </div>

      {/* Featured Household Summary Card (from txt) */}
      <section className="sec">
        <div className="sec-title"><span>◈</span> Featured: Household Summary Card</div>
        <div className="hh-card">
          <div className="hh-header">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
              <div>
                <div className="hh-id">HOUSEHOLD #{delacruz.id} — {delacruz.name}</div>
                <div className="hh-addr">📍 {delacruz.address} · {delacruz.houseType}</div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ background: "rgba(245,192,48,.12)", color: "var(--yellow)", fontSize: ".72rem", fontWeight: 700, padding: "3px 10px", borderRadius: 999 }}>
                  {delacruz.classification}
                </span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 24, marginTop: 10 }}>
              <div><span style={{ fontSize: ".68rem", color: "var(--text3)", textTransform: "uppercase", letterSpacing: ".07em", fontWeight: 600 }}>Household Income</span><br />
                <span style={{ fontFamily: "var(--fh)", fontWeight: 800, fontSize: "1rem" }}>₱{delacruz.income.toLocaleString()}/mo</span>
              </div>
              <div><span style={{ fontSize: ".68rem", color: "var(--text3)", textTransform: "uppercase", letterSpacing: ".07em", fontWeight: 600 }}>Per Capita</span><br />
                <span style={{ fontFamily: "var(--fh)", fontWeight: 800, fontSize: "1rem" }}>₱{delacruz.perCapita.toLocaleString()}</span>
              </div>
              <div><span style={{ fontSize: ".68rem", color: "var(--text3)", textTransform: "uppercase", letterSpacing: ".07em", fontWeight: 600 }}>Members</span><br />
                <span style={{ fontFamily: "var(--fh)", fontWeight: 800, fontSize: "1rem" }}>{delacruz.members.length}</span>
              </div>
            </div>
          </div>

          <div className="hh-members">
            {delacruz.members.map((m, i) => (
              <div key={i} className="hh-member">
                <span className="hh-role-badge">{m.role}</span>
                <div style={{ flex: 1 }}>
                  <div className="hh-member-name">{m.name} ({m.age}{m.sex})</div>
                  <div className="hh-member-info">{m.occupation}{m.income > 0 ? ` · ₱${m.income.toLocaleString()}/mo` : ""}{m.program ? ` · 📌 ${m.program}` : ""}</div>
                  <div className="hh-member-health">🏥 {m.health}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginBottom: 8, fontSize: ".72rem", fontWeight: 700, color: "var(--text3)", textTransform: "uppercase", letterSpacing: ".07em" }}>Alerts & Recommendations</div>
          <div className="hh-alerts">
            {delacruz.alerts.map((a, i) => (
              <div key={i} className={`hh-alert ${a.type === "tip" ? "hh-alert-tip" : ""}`}>
                <span className="hh-alert-icon">{a.icon}</span>
                <span className="hh-alert-text">{a.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other households from data */}
      <section className="sec">
        <div className="sec-title"><span>⬡</span> Other Registered Households</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {Object.values(households).map(hh => (
            <div key={hh.id} className="hh-card">
              <div className="hh-header">
                <div className="hh-id">Household #{hh.id}</div>
                <div className="hh-addr">{hh.members[0]?.address}</div>
              </div>
              <div className="hh-members">
                {hh.members.map((m, i) => (
                  <div key={i} className="hh-member">
                    <span className="hh-role-badge">{m.role}</span>
                    <div>
                      <div className="hh-member-name">{m.name} ({m.age}, {m.sex})</div>
                      <div className="hh-member-info">{m.occupation} · ₱{m.income.toLocaleString()}/mo</div>
                      <div className="hh-member-health">{m.chronicDisease !== "None" ? `🏥 ${m.chronicDisease}` : "Healthy"}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
export default Households;