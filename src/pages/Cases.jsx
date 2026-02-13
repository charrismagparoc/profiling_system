// src/pages/Cases.jsx
import { useState } from "react";
import { cases as initialCases } from "../data/residents";

function Cases({ toast }) {
  const [list, setList] = useState(initialCases);
  const [showAdd, setShowAdd] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [form, setForm] = useState({ type: "", priority: "High", resident: "", assignedTo: "", deadline: "", status: "Open", outcome: "" });

  const openEdit = (c) => { setEditItem(c); setForm({ ...c }); };
  const openAdd = () => { setForm({ type: "", priority: "High", resident: "", assignedTo: "", deadline: "", status: "Open", outcome: "" }); setShowAdd(true); };
  const saveEdit = () => {
    setList(list.map(c => c.id === editItem.id ? { ...editItem, ...form } : c));
    setEditItem(null); toast("Case updated!", "s");
  };
  const saveAdd = () => {
    setList([...list, { ...form, id: `NEW-${Date.now()}` }]);
    setShowAdd(false); toast("Case created!", "s");
  };
  const confirmDelete = () => {
    setList(list.filter(c => c.id !== deleteItem.id));
    setDeleteItem(null); toast("Case deleted.", "e");
  };

  const stCls = (s) => s === "Resolved" ? "cs-resolved" : s === "In Progress" ? "cs-inprog" : "cs-open";

  return (
    <main className="page">
      <div className="page-hdr">
        <div>
          <div className="page-title">Case Management</div>
          <div className="page-sub">{list.filter(c => c.status !== "Resolved").length} open · {list.filter(c => c.status === "Resolved").length} resolved</div>
        </div>
        <button className="btn btn-primary" onClick={openAdd}>+ New Case</button>
      </div>

      <div className="case-list">
        {list.map(c => (
          <div key={c.id} className="case-card">
            <div style={{ flex: 1 }}>
              <div className="case-id">Case #{c.id}</div>
              <div className="case-type">{c.type}</div>
              <div className="case-meta">
                👤 {c.resident} · 👷 Assigned: {c.assignedTo} · 📅 Deadline: {c.deadline}
                {c.outcome && <span style={{ color: "var(--green)", marginLeft: 8 }}>✓ {c.outcome}</span>}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <span className="risk-badge" style={{ background: c.priority === "High" ? "rgba(239,70,70,.12)" : "rgba(245,192,48,.12)", color: c.priority === "High" ? "var(--red)" : "var(--yellow)" }}>
                {c.priority}
              </span>
              <span className={`doc-status ${stCls(c.status)}`}>{c.status}</span>
              <button className="btn btn-ghost btn-sm" onClick={() => openEdit(c)}>✏️ Edit</button>
              <button className="btn btn-danger btn-sm" onClick={() => setDeleteItem(c)}>🗑</button>
            </div>
          </div>
        ))}
      </div>

      {(showAdd || editItem) && (
        <div className="modal-overlay" onClick={() => { setShowAdd(false); setEditItem(null); }}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-title">{showAdd ? "New Case" : "Edit Case"}</div>
            <div className="form-grid">
              <div className="form-field full"><label>Case Type</label>
                <input value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} />
              </div>
              <div className="form-field"><label>Priority</label>
                <select value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })}>
                  {["High", "Medium", "Low"].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div className="form-field"><label>Status</label>
                <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                  {["Open", "In Progress", "Resolved"].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div className="form-field"><label>Resident Name</label>
                <input value={form.resident} onChange={e => setForm({ ...form, resident: e.target.value })} />
              </div>
              <div className="form-field"><label>Assigned To</label>
                <input value={form.assignedTo} onChange={e => setForm({ ...form, assignedTo: e.target.value })} />
              </div>
              <div className="form-field"><label>Deadline</label>
                <input type="date" value={form.deadline} onChange={e => setForm({ ...form, deadline: e.target.value })} />
              </div>
              <div className="form-field full"><label>Outcome (if resolved)</label>
                <input value={form.outcome} onChange={e => setForm({ ...form, outcome: e.target.value })} />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => { setShowAdd(false); setEditItem(null); }}>Cancel</button>
              <button className="btn btn-primary" onClick={showAdd ? saveAdd : saveEdit}>{showAdd ? "Create" : "Save"}</button>
            </div>
          </div>
        </div>
      )}

      {deleteItem && (
        <div className="modal-overlay" onClick={() => setDeleteItem(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: 380 }}>
            <div className="delete-confirm">
              <div className="delete-icon">🗑️</div>
              <div className="modal-title">Delete Case</div>
              <div className="delete-name">Case #{deleteItem.id}: {deleteItem.type}</div>
            </div>
            <div className="modal-footer" style={{ justifyContent: "center" }}>
              <button className="btn btn-ghost" onClick={() => setDeleteItem(null)}>Cancel</button>
              <button className="btn btn-danger" onClick={confirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
export default Cases;