// Updated Projects.jsx (now shows main file prominently and additional files as small previews/links)
import { useEffect, useState } from "react";
import API from "../api";
import { motion } from "framer-motion";

export default function Projects() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    API.get("/projects")
      .then(r => setItems(r.data))
      .catch(() => setItems([]));
  }, []);

  const getIcon = (ext) => {
    if (["jpg", "jpeg", "png", "gif"].includes(ext)) return "🖼️";
    if (ext === "pdf") return "📄";
    if (ext === "zip") return "🗂️";
    if (["doc", "docx"].includes(ext)) return "📝";
    if (["xls", "xlsx"].includes(ext)) return "📊";
    return "📎";
  };

  const getLabel = (ext) => {
    if (ext === "pdf") return "View PDF";
    if (ext === "zip") return "Download ZIP";
    if (["doc", "docx"].includes(ext)) return "Download Word";
    if (["xls", "xlsx"].includes(ext)) return "Download Excel";
    return `Download ${ext.toUpperCase()}`;
  };

  const renderMainFile = (file) => {
    if (!file) return null;
    const url = file.startsWith("/") ? `http://localhost:5000${file}` : file;
    const ext = file.split(".").pop().toLowerCase();

    const icon = getIcon(ext);

    if (["jpg", "jpeg", "png", "gif"].includes(ext)) {
      return (
        <div className="relative">
          <img src={url} alt="project file" className="w-full h-48 object-cover rounded-t-2xl" />
          <span className="absolute top-2 right-2 bg-indigo-500 text-white text-sm px-2 py-1 rounded-lg shadow-md">
            {icon}
          </span>
        </div>
      );
    } else {
      const label = getLabel(ext);
      return (
        <div className="relative">
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="block w-full h-48 flex items-center justify-center bg-slate-800 text-white font-semibold rounded-t-2xl"
          >
            {label}
          </a>
          <span className="absolute top-2 right-2 bg-indigo-500 text-white text-sm px-2 py-1 rounded-lg shadow-md">
            {icon}
          </span>
        </div>
      );
    }
  };

  const renderAdditionalFile = (file, idx) => {
    const url = file.startsWith("/") ? `http://localhost:5000${file}` : file;
    const ext = file.split(".").pop().toLowerCase();
    let bg = "bg-gray-600";
    let label = ext.toUpperCase();

    if (["jpg", "jpeg", "png", "gif"].includes(ext)) {
      return (
        <a key={idx} href={url} target="_blank" rel="noreferrer">
          <img src={url} alt="" className="w-16 h-16 object-cover rounded shadow-md" />
        </a>
      );
    }
    if (ext === "pdf") {
      bg = "bg-red-600";
      label = "PDF";
    } else if (ext === "zip") {
      bg = "bg-blue-600";
      label = "ZIP";
    } else if (["doc", "docx"].includes(ext)) {
      bg = "bg-blue-700";
      label = "DOC";
    } else if (["xls", "xlsx"].includes(ext)) {
      bg = "bg-green-600";
      label = "XLS";
    }

    return (
      <a
        key={idx}
        href={url}
        target="_blank"
        rel="noreferrer"
        className={`w-16 h-16 flex items-center justify-center ${bg} text-white text-xs font-semibold rounded shadow-md`}
      >
        {label}
      </a>
    );
  };

  return (
    <section className="relative py-16 px-6 sm:px-10 lg:px-20 bg-[#0b1220] min-h-screen">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-extrabold text-center text-indigo-400 mb-12"
      >
        Projects
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((it, i) => (
          <motion.article
            key={it._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            whileHover={{ scale: 1.02 }}
            className="group relative bg-[#071228]/80 border border-slate-700 rounded-2xl shadow-lg overflow-hidden hover:border-indigo-500 transition-all duration-300"
          >
            {it.files?.length > 0 && renderMainFile(it.files[0])}

            <div className="p-6">
              <h3 className="font-semibold text-xl text-white group-hover:text-indigo-400 transition">
                {it.title}
              </h3>
              <p className="text-slate-300 mt-2 text-justify">{it.description}</p>
              {it.tech && (
                <div className="text-sm text-slate-400 mt-2">
                  {it.tech.join(" • ")}
                </div>
              )}
              {it.link && (
                <a
                  href={it.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-block text-indigo-400 hover:underline"
                >
                  View project ↗
                </a>
              )}
            </div>

            {it.files?.length > 1 && (
              <div className="px-6 pb-6 border-t border-slate-700 pt-4">
                <h4 className="text-sm font-bold text-white mb-2">Additional Files</h4>
                <div className="flex flex-wrap gap-2">
                  {it.files.slice(1).map((f, idx) => renderAdditionalFile(f, idx))}
                </div>
              </div>
            )}
          </motion.article>
        ))}
      </div>
    </section>
  );
}