// Updated AdminDashboard.jsx (no major changes needed, but enhancing file previews for more types)
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, Edit2, Trash2 } from "lucide-react";
import API from "../api";

const sections = ["profile", "experience", "education", "skills", "projects", "achievements"];

export default function AdminDashboard() {
  const [section, setSection] = useState("projects");
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({});
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => { load(); }, [section]);

  const load = async () => {
    try {
      const res = await API.get(`/${section}`);
      setItems(section === "profile" ? (res.data ? [res.data] : []) : (res.data || []));
      setForm({});
      setEditing(null);
    } catch {
      alert("Failed to load");
    }
  };

  const onEdit = (it) => {
    setEditing(it._id);
    setForm(it);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onDelete = async (id) => {
    if (!confirm("Delete?")) return;
    try {
      await API.delete(`/${section}/${id}`);
      load();
    } catch {
      alert("Delete failed");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const fd = new FormData();

      if (section === "projects") {
        fd.append("title", form.title || "");
        fd.append("description", form.description || "");
        fd.append("link", form.link || "");
        fd.append("tech", (form.tech && Array.isArray(form.tech)) ? form.tech.join(",") : (form.tech || ""));
        if (form.files) form.files.forEach(f => fd.append("files", f));
        if (editing) await API.put(`/projects/${editing}`, fd, { headers: { "Content-Type": "multipart/form-data" } });
        else await API.post("/projects", fd, { headers: { "Content-Type": "multipart/form-data" } });
      } else if (section === "profile") {
        const fdProfile = new FormData();
        fdProfile.append("name", form.name || "");
        fdProfile.append("title", form.title || "");
        fdProfile.append("summary", form.summary || "");
        fdProfile.append("website", form.website || "");
        fdProfile.append("socials[linkedin]", form.socials?.linkedin || "");
        fdProfile.append("socials[github]", form.socials?.github || "");
        if (form.imageFile) fdProfile.append("avatarFile", form.imageFile);
        if (editing) await API.put(`/profile/${editing}`, fdProfile, { headers: { "Content-Type": "multipart/form-data" } });
        else await API.post("/profile", fdProfile, { headers: { "Content-Type": "multipart/form-data" } });
      } else {
        if (editing) await API.put(`/${section}/${editing}`, form);
        else await API.post(`/${section}`, form);
      }

      await load();
    } catch (err) {
      alert(err.response?.data?.message || "Save failed");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-lg bg-slate-800/80 border border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 px-3 py-2 text-sm text-slate-200 placeholder-slate-400 outline-none transition";

  function renderForm() {
    switch (section) {
      case "profile":
        return (
          <>
            <input className={inputClass} placeholder="Name"
              value={form.name || ""} onChange={e => setForm({ ...form, name: e.target.value })} />
            <input className={inputClass} placeholder="Title"
              value={form.title || ""} onChange={e => setForm({ ...form, title: e.target.value })} />
            <textarea className={inputClass} placeholder="Summary"
              value={form.summary || ""} onChange={e => setForm({ ...form, summary: e.target.value })} />
            <input className={inputClass} placeholder="Website"
              value={form.website || ""} onChange={e => setForm({ ...form, website: e.target.value })} />
            <input className={inputClass} placeholder="LinkedIn"
              value={form.socials?.linkedin || ""} onChange={e => setForm({ ...form, socials: { ...form.socials, linkedin: e.target.value } })} />
            <input className={inputClass} placeholder="GitHub"
              value={form.socials?.github || ""} onChange={e => setForm({ ...form, socials: { ...form.socials, github: e.target.value } })} />
            <input type="file"
              className="w-full text-sm text-slate-300 file:mr-4 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500"
              onChange={e => setForm({ ...form, imageFile: e.target.files[0] })} />
          </>
        );

      case "experience":
        return (
          <>
            <input className={inputClass} placeholder="Role"
              value={form.role || ""} onChange={e => setForm({ ...form, role: e.target.value })} />
            <input className={inputClass} placeholder="Company"
              value={form.company || ""} onChange={e => setForm({ ...form, company: e.target.value })} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input className={inputClass} placeholder="Start Date"
                value={form.startDate || ""} onChange={e => setForm({ ...form, startDate: e.target.value })} />
              <input className={inputClass} placeholder="End Date"
                value={form.endDate || ""} onChange={e => setForm({ ...form, endDate: e.target.value })} />
            </div>
            <textarea className={inputClass} placeholder="Description"
              value={form.description || ""} onChange={e => setForm({ ...form, description: e.target.value })} />
          </>
        );

      case "education":
        return (
          <>
            <input className={inputClass} placeholder="Institution"
              value={form.institution || ""} onChange={e => setForm({ ...form, institution: e.target.value })} />
            <input className={inputClass} placeholder="Degree"
              value={form.degree || ""} onChange={e => setForm({ ...form, degree: e.target.value })} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input className={inputClass} placeholder="Start Year"
                value={form.startYear || ""} onChange={e => setForm({ ...form, startYear: e.target.value })} />
              <input className={inputClass} placeholder="End Year"
                value={form.endYear || ""} onChange={e => setForm({ ...form, endYear: e.target.value })} />
            </div>
            <textarea className={inputClass} placeholder="Description"
              value={form.description || ""} onChange={e => setForm({ ...form, description: e.target.value })} />
          </>
        );

      case "skills":
        return (
          <>
            <input className={inputClass} placeholder="Skill Name"
              value={form.name || ""} onChange={e => setForm({ ...form, name: e.target.value })} />
            <input className={inputClass} placeholder="Level"
              value={form.level || ""} onChange={e => setForm({ ...form, level: e.target.value })} />
            <input className={inputClass} type="number" placeholder="Percent"
              value={form.percent || ""} onChange={e => setForm({ ...form, percent: parseInt(e.target.value || 0) })} />
          </>
        );

      case "projects":
        return (
          <>
            <input className={inputClass} placeholder="Title"
              value={form.title || ""} onChange={e => setForm({ ...form, title: e.target.value })} />
            <textarea className={inputClass} placeholder="Description"
              value={form.description || ""} onChange={e => setForm({ ...form, description: e.target.value })} />
            <input className={inputClass} placeholder="Link"
              value={form.link || ""} onChange={e => setForm({ ...form, link: e.target.value })} />
            <input className={inputClass} placeholder="Tech (comma separated)"
              value={(form.tech && Array.isArray(form.tech)) ? form.tech.join(", ") : (form.tech || "")}
              onChange={e => setForm({ ...form, tech: e.target.value.split(",").map(s => s.trim()) })} />
            <input type="file"
              multiple
              className="w-full text-sm text-slate-300 file:mr-4 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500"
              onChange={e => setForm({ ...form, files: Array.from(e.target.files) })} />
          </>
        );

      case "achievements":
        return (
          <>
            <input className={inputClass} placeholder="Title"
              value={form.title || ""} onChange={e => setForm({ ...form, title: e.target.value })} />
            <input className={inputClass} placeholder="Issuer"
              value={form.issuer || ""} onChange={e => setForm({ ...form, issuer: e.target.value })} />
            <input className={inputClass} placeholder="Date"
              value={form.date || ""} onChange={e => setForm({ ...form, date: e.target.value })} />
            <textarea className={inputClass} placeholder="Description"
              value={form.description || ""} onChange={e => setForm({ ...form, description: e.target.value })} />
            <input className={inputClass} placeholder="Link"
              value={form.link || ""} onChange={e => setForm({ ...form, link: e.target.value })} />
          </>
        );

      default:
        return null;
    }
  }

  const renderPreview = (f, idx) => {
    const ext = f.split(".").pop().toLowerCase();
    const url = f.startsWith("/") ? `http://localhost:5000${f}` : f;
    let bg = "bg-slate-700";
    let label = "File";

    if (["jpg", "jpeg", "png", "gif"].includes(ext)) {
      return <img key={idx} src={url} alt="preview" className="w-20 h-20 object-cover rounded-md shadow-md" />;
    }
    if (ext === "pdf") {
      bg = "bg-red-700";
      label = "PDF";
    } else if (ext === "zip") {
      bg = "bg-blue-700";
      label = "ZIP";
    } else if (["doc", "docx"].includes(ext)) {
      bg = "bg-blue-800";
      label = "DOC";
    } else if (["xls", "xlsx"].includes(ext)) {
      bg = "bg-green-700";
      label = "XLS";
    }

    return (
      <a
        key={idx}
        href={url}
        target="_blank"
        rel="noreferrer"
        className={`w-20 h-20 flex items-center justify-center ${bg} text-white text-xs font-semibold rounded-md shadow-md`}
      >
        {label}
      </a>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white py-6 px-4 sm:px-6 lg:px-8">
      {/* Section Tabs */}
      <motion.div
        className="flex flex-wrap gap-2 items-center mb-6"
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
      >
        {sections.map(s => (
          <button
            key={s}
            onClick={() => { setSection(s); setForm({}); setEditing(null); }}
            className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${s === section ? "bg-indigo-600 shadow-lg scale-105" : "bg-slate-700 hover:bg-slate-600"
              }`}
          >
            {s}
          </button>
        ))}
        <button
          onClick={() => { localStorage.removeItem("token"); window.location.href = "/admin/login"; }}
          className="ml-auto px-4 py-2 rounded-full bg-red-600 hover:bg-red-500 flex items-center gap-2"
        >
          <LogOut size={18} /> Logout
        </button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <motion.form
          onSubmit={onSubmit}
          className="space-y-3 bg-slate-900/60 p-6 rounded-2xl shadow-lg backdrop-blur-md border border-slate-700"
          initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}
        >
          <h3 className="text-lg font-bold text-indigo-400 mb-3">
            {editing ? "Edit item" : "Create item"} — {section}
          </h3>
          {renderForm()}
          <div className="flex gap-3 pt-2">
            <button
              className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition font-semibold"
              type="submit"
              disabled={loading}
            >
              {loading ? "Saving..." : editing ? "Save" : "Add"}
            </button>
            <button
              type="button"
              onClick={() => { setForm({}); setEditing(null); }}
              className="px-5 py-2 rounded-lg bg-slate-700 hover:bg-slate-600"
            >
              Clear
            </button>
          </div>
        </motion.form>

        {/* Existing items */}
        <motion.div
          className="overflow-y-auto max-h-80 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800 hover:scrollbar-thumb-slate-500 bg-slate-900/60 p-6 rounded-2xl shadow-lg border border-slate-700"
          initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}
        >
          <h3 className="text-lg font-bold mb-4 text-indigo-400">Existing items</h3>
          <AnimatePresence>
            {items.map(it => (
              <motion.div
                key={it._id}
                className="bg-slate-800 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-3"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              >
                <div className="flex-1">
                  <div className="font-semibold">{it.title || it.role || it.name || it.degree}</div>
                  <div className="text-sm text-slate-400">{it.company || it.institution || it.issuer || ""}</div>

                  {/* Preview files */}
                  {it.files && it.files.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {it.files.map((f, idx) => renderPreview(f, idx))}
                    </div>
                  )}
                </div>

                <div className="flex gap-2 mt-2 sm:mt-0">
                  <button
                    onClick={() => onEdit(it)}
                    className="px-3 py-1 rounded bg-yellow-500 text-black flex items-center gap-1"
                  >
                    <Edit2 size={16} /> Edit
                  </button>
                  {section !== "profile" && (
                    <button
                      onClick={() => onDelete(it._id)}
                      className="px-3 py-1 rounded bg-red-600 text-white flex items-center gap-1"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Preview Panel */}
      <motion.div
        className="mt-8 bg-slate-900/60 p-6 rounded-2xl shadow-lg border border-slate-700"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      >
        <h4 className="font-bold mb-3 text-indigo-400">Preview</h4>
        <pre className="whitespace-pre-wrap text-slate-300 text-sm">{JSON.stringify(form, null, 2)}</pre>

        {form.imageFile && (
          <img alt="" src={URL.createObjectURL(form.imageFile)} className="mt-4 rounded-md w-full max-w-sm object-cover shadow-md" />
        )}

        {form.files && form.files.map((f, idx) => (
          <div key={idx} className="mt-2">
            {["jpg","jpeg","png","gif"].includes(f.name?.split(".").pop().toLowerCase()) ? (
              <img src={URL.createObjectURL(f)} className="rounded-md w-32 h-32 object-cover shadow-md" alt="" />
            ) : (
              <span className="inline-block px-3 py-2 bg-indigo-600 text-white rounded-md shadow-md text-xs">{f.name}</span>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
}