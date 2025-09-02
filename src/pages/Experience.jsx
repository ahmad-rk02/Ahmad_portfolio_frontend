import { useEffect, useState } from "react";
import API from "../api";
import { motion } from "framer-motion";

export default function Experience() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    API.get("/experience")
      .then(r => setItems(r.data))
      .catch(() => setItems([]));
  }, []);

  return (
    <section className="relative py-16 px-6 sm:px-10 lg:px-20 bg-[#0b1220] min-h-screen">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-extrabold text-center text-indigo-400 mb-12"
      >
        Experience
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((it, i) => (
          <motion.article
            key={it._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            whileHover={{ scale: 1.02 }}
            className="group relative bg-[#071228]/80 border border-slate-700 rounded-2xl shadow-lg p-6 hover:border-indigo-500 transition-all duration-300"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <h3 className="text-xl font-semibold text-white group-hover:text-indigo-400 transition">
                  {it.role}
                </h3>
                <p className="text-sm text-slate-400">{it.company}</p>
              </div>
              <span className="text-sm text-indigo-300 font-medium">
                {it.startDate} — {it.endDate || "Present"}
              </span>
            </div>
            <p className="mt-4 text-slate-300 leading-relaxed text-justify">{it.description}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
