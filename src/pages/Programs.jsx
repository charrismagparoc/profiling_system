    // src/pages/Programs.jsx
import { useState } from "react";
import { programs as initialPrograms } from "../data/residents";

function Programs({ toast }) {
  const [list, setList] = useState(initialPrograms);
  const [showAdd, setShowAdd] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [form, setForm] = useState({ name: "", type: "Social Protection", beneficiaries: "", budget: "", status: "Active" });

  const openEdit = (p) => { setEditItem(p); setForm({ ...p, beneficiaries: String(p.beneficiaries) }); };
  const openAdd = () => { setForm({ name: "", type: "Social Protection", beneficiaries: "", budget: "", status: "Active" }); setShowAdd(true); };

  const saveEdit = () => {
    setList(list.map(p => p.id === editItem.id ? { ...editItem, ...form, beneficiaries: Number(form.beneficiaries) } : p));
    setEditItem(null); toast("Program updated!", "s");
  };
  const saveAdd = () => {
    setList([...list, { ...form, id: Date.now(), beneficiaries: Number(form.beneficiaries) }]);
    setShowAdd(false); toast("Program added!", "s");
  };
  const confirmDelete = () => {
    setList(list.filter(p => p.id !== deleteItem.id));
    setDeleteItem(null); toast("Program deleted.", "e");
  };

  const F = ({ label, name, opts }) => (
    <div className="form-field">
      <label>{label}</label>
      {opts ? (
        <select value={form[name] || ""} onChange={e => setForm({ ...form, [name]: e.target.value })}>
          {opts.map(o => <option key={o}>{o}</option>)}
        </select>
      ) : (
        <input value={form[name] || ""} onChange={e => setForm({ ...form, [name]: e.target.value })} />
      )}
    </div>
  );

  return (
    <main className="page">
      <div className="page-hdr">
        <div>
          <div className="page-title">Programs</div>
          <div className="page-sub">{list.length} active programs</div>
        </div>
        <button className="btn btn-primary" onClick={openAdd}>+ Add Program</button>
      </div>

      <div className="prog-table">
        <div className="prog-hdr">
          <span>Program Name</span><span>Type</span><span>Beneficiaries</span><span>Budget</span><span>Actions</span>
        </div>
        {list.map(p => (
          <div key={p.id} className="prog-row">
            <span style={{ fontWeight: 600, fontSize: ".84rem" }}>{p.name}</span>
            <span style={{ fontSize: ".76rem", color: "var(--text2)" }}>{p.type}</span>
            <span style={{ fontFamily: "var(--fh)", fontWeight: 700 }}>{p.beneficiaries.toLocaleString()}</span>
            <span style={{ fontSize: ".78rem", color: "var(--green)", fontWeight: 600 }}>{p.budget}</span>
            <span style={{ display: "flex", gap: 5 }}>
              <button className="btn btn-ghost btn-sm" onClick={() => openEdit(p)}>✏️</button>
              <button className="btn btn-danger btn-sm" onClick={() => setDeleteItem(p)}>🗑</button>
            </span>
          </div>
        ))}
      </div>

      {(showAdd || editItem) && (
        <div className="modal-overlay" onClick={() => { setShowAdd(false); setEditItem(null); }}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-title">{showAdd ? "Add Program" : "Edit Program"}</div>
            <div className="form-grid">
              <div className="form-field full"><label>Program Name</label>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
              <F label="Type" name="type" opts={["Social Protection", "Health Insurance", "Economic", "Nutrition", "Education", "Housing"]} />
              <F label="Status" name="status" opts={["Active", "Completed", "Pending"]} />
              <div className="form-field"><label>Beneficiaries</label>
                <input type="number" value={form.beneficiaries} onChange={e => setForm({ ...form, beneficiaries: e.target.value })} />
              </div>
              <div className="form-field"><label>Budget</label>
                <input value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })} />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => { setShowAdd(false); setEditItem(null); }}>Cancel</button>
              <button className="btn btn-primary" onClick={showAdd ? saveAdd : saveEdit}>{showAdd ? "Add" : "Save"}</button>
            </div>
          </div>
        </div>
      )}

      {deleteItem && (
        <div className="modal-overlay" onClick={() => setDeleteItem(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: 380 }}>
            <div className="delete-confirm">
              <div className="delete-icon">🗑️</div>
              <div className="modal-title">Delete Program</div>
              <div className="delete-name">{deleteItem.name}</div>
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
export default Programs;