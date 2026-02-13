// src/pages/Segments.jsx
import { useState } from "react";
import InsightToggle from "../components/InsightToggle";
import { segments, residents } from "../data/residents";

const segInsights = {
  "Middle-Income Professionals": ["124 residents with stable income — low intervention needed.", "Good candidates for community volunteer programs.", "Recommend business permit streamlining."],
  "Elderly High-Risk": ["87 senior citizens — 34 live alone with no caregiver.", "Average vulnerability score: 78/100 — highest among all segments.", "Recommend monthly wellness visits and priority health program enrollment."],
  "Young Families Needing Support": ["213 families with young children — 45% are near-poor households.", "Livelihood training programs recommended for primary earners.", "School feeding program should be extended."],
  "At-Risk Youth": ["96 youths aged 15-24 with declining engagement scores.", "Recommend SK livelihood and skills training outreach.", "12 flagged for potential school dropout — immediate intervention needed."],
  "Active Community Members": ["65 residents with engagement score above 90.", "Key contacts for community programs and information dissemination.", "Recommend recognition programs to sustain engagement."],
  "Near-Poor Households": ["178 households just above the 4Ps threshold.", "Highly vulnerable to economic shocks — monitor closely.", "Prioritize for emergency cash assistance programs."],
};

function Segments() {
  const [activeId, setActiveId] = useState(null);

  return (
    <main className="page">
      <div className="page-hdr">
        <div>
          <div className="page-title">Resident Segments</div>
          <div className="page-sub">ML-generated K-Means clusters · {segments.reduce((a, b) => a + b.count, 0)} residents classified</div>
        </div>
      </div>

      <section className="sec">
        <div className="sec-title"><span>◉</span> Segment Overview</div>
        <div className="seg-list">
          {segments.map(seg => {
            const isOpen = activeId === seg.id;
            const segResidents = residents.filter(r => r.segment === seg.name);
            return (
              <div key={seg.id} className={`seg-row ${isOpen ? "open" : ""}`}>
                <div className="seg-row-hdr" onClick={() => setActiveId(isOpen ? null : seg.id)}>
                  <span className="seg-circle" style={{ background: seg.color }} />
                  <div style={{ flex: 1 }}>
                    <div className="seg-row-name">{seg.name}</div>
                    <span className="seg-row-meta">{seg.count} residents · Avg age {seg.avgAge} · Avg income ₱{seg.avgIncome?.toLocaleString()}</span>
                  </div>
                  <div className="seg-conf-mini">
                    <div className="seg-conf-fill" style={{ width: `${seg.confidence}%`, background: seg.color }} />
                  </div>
                  <span style={{ fontSize: ".72rem", color: "var(--text3)", marginLeft: 8 }}>{seg.confidence}%</span>
                  <span className="seg-expand">{isOpen ? "▲" : "▼"}</span>
                </div>
                {isOpen && (
                  <div className="seg-row-body">
                    <div className="seg-desc">{seg.description}</div>
                    {segResidents.length > 0 && (
                      <div>
                        <div style={{ fontSize: ".68rem", color: "var(--text3)", textTransform: "uppercase", letterSpacing: ".07em", fontWeight: 600, marginBottom: 6 }}>Residents in this segment:</div>
                        <div className="seg-chips">
                          {segResidents.map(r => <span key={r.id} className="seg-chip">{r.name}</span>)}
                        </div>
                      </div>
                    )}
                    <InsightToggle title="AI recommendations for this segment" insights={segInsights[seg.name] || []} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
export default Segments;