import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiLogOut, FiEdit2, FiTrash2 } from "react-icons/fi";
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
        fdProfile.append("experienceMonths", form.experienceMonths || 0);
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
    "w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:border-slate-900 dark:focus:border-white focus:ring-1 focus:ring-slate-900 dark:focus:ring-white px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none transition-all";

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
            <input className={inputClass} type="number" placeholder="Experience (in months)"
              value={form.experienceMonths || ""} onChange={e => setForm({ ...form, experienceMonths: parseInt(e.target.value || 0) })} />
            <input className={inputClass} placeholder="LinkedIn"
              value={form.socials?.linkedin || ""} onChange={e => setForm({ ...form, socials: { ...form.socials, linkedin: e.target.value } })} />
            <input className={inputClass} placeholder="GitHub"
              value={form.socials?.github || ""} onChange={e => setForm({ ...form, socials: { ...form.socials, github: e.target.value } })} />
            <input type="file"
              className="w-full text-sm text-slate-600 dark:text-slate-400 file:mr-4 file:py-3 file:px-4 file:border-0 file:text-sm file:bg-slate-900 dark:file:bg-white file:text-white dark:file:text-slate-900 hover:file:bg-slate-800 dark:hover:file:bg-slate-100 file:transition-all cursor-pointer"
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
              className="w-full text-sm text-slate-600 dark:text-slate-400 file:mr-4 file:py-3 file:px-4 file:border-0 file:text-sm file:bg-slate-900 dark:file:bg-white file:text-white dark:file:text-slate-900 hover:file:bg-slate-800 dark:hover:file:bg-slate-100 file:transition-all cursor-pointer"
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
      return <img key={idx} src={url} alt="preview" className="w-20 h-20 object-cover border border-slate-300 dark:border-slate-700" />;
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
        className={`w-20 h-20 flex items-center justify-center ${bg} text-white text-xs font-semibold`}
      >
        {label}
      </a>
    );
  };

  return (
    <div className="flex-1 bg-slate-50 dark:bg-slate-900">
      {/* Header Section */}
      <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Dashboard</h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-mono mt-1">
                Manage your portfolio content
              </p>
            </div>
            <button
              onClick={() => { localStorage.removeItem("token"); window.location.href = "/"; }}
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 transition-all font-mono text-sm"
            >
              <FiLogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </div>

      {/* Section Tabs */}
      <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto gap-1 py-2">
            {sections.map(s => (
              <button
                key={s}
                onClick={() => { setSection(s); setForm({}); setEditing(null); }}
                className={`px-4 py-2.5 font-mono text-sm whitespace-nowrap transition-all ${s === section
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Section - Takes 1 column */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-6 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {editing ? "Edit" : "Create"} {section}
                </h3>
                {editing && (
                  <span className="text-xs px-2 py-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-mono">
                    EDITING
                  </span>
                )}
              </div>

              <form onSubmit={onSubmit} className="space-y-4">
                {renderForm()}

                <div className="flex gap-2 pt-4 border-t border-slate-200 dark:border-slate-800">
                  <button
                    className="flex-1 px-4 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 transition-all font-mono text-sm disabled:opacity-50"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Saving..." : editing ? "Update" : "Add"}
                  </button>
                  {editing && (
                    <button
                      type="button"
                      onClick={() => { setForm({}); setEditing(null); }}
                      className="px-4 py-2.5 border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-900 dark:hover:border-white transition-all font-mono text-sm"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </motion.div>

          {/* Items List - Takes 2 columns */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Existing Items
                </h3>
                <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono">
                  {items.length} {items.length === 1 ? 'item' : 'items'}
                </span>
              </div>

              <div className="space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
                <AnimatePresence>
                  {items.length === 0 ? (
                    <div className="text-center py-12 text-slate-400 dark:text-slate-600 font-mono text-sm">
                      No items yet. Create one to get started.
                    </div>
                  ) : (
                    items.map(it => (
                      <motion.div
                        key={it._id}
                        className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 hover:border-slate-900 dark:hover:border-white transition-all"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-slate-900 dark:text-white truncate">
                              {it.title || it.role || it.name || it.degree}
                            </h4>
                            {(it.company || it.institution || it.issuer) && (
                              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                {it.company || it.institution || it.issuer}
                              </p>
                            )}
                            {it.description && (
                              <p className="text-sm text-slate-500 dark:text-slate-500 mt-2 line-clamp-2">
                                {it.description}
                              </p>
                            )}

                            {/* File Previews */}
                            {it.files && it.files.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-3">
                                {it.files.map((f, idx) => renderPreview(f, idx))}
                              </div>
                            )}
                          </div>

                          <div className="flex gap-2 flex-shrink-0">
                            <button
                              onClick={() => onEdit(it)}
                              className="p-2 border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-900 dark:hover:border-white transition-all"
                              title="Edit"
                            >
                              <FiEdit2 size={16} />
                            </button>
                            {section !== "profile" && (
                              <button
                                onClick={() => onDelete(it._id)}
                                className="p-2 border border-red-300 dark:border-red-900 text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all"
                                title="Delete"
                              >
                                <FiTrash2 size={16} />
                              </button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
