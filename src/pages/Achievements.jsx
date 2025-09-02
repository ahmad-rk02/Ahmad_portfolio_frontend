import { useEffect, useState } from "react";
import API from "../api";
import { motion } from "framer-motion";

export default function Achievements() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    API.get("/achievements")
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
        Achievements
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {items.map((it, i) => (
          <motion.article
            key={it._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            whileHover={{ scale: 1.02 }}
            className="group relative flex flex-col sm:flex-row gap-4 bg-[#071228]/80 border border-slate-700 rounded-2xl shadow-lg overflow-hidden p-6 hover:border-indigo-500 transition-all duration-300"
          >
            {it.image && (
              <img
                src={it.image.startsWith("/") ? `http://localhost:5000${it.image}` : it.image}
                alt={it.title}
                className="w-full sm:w-28 h-28 object-cover rounded-lg"
              />
            )}
            <div>
              <h3 className="font-semibold text-lg text-white group-hover:text-indigo-400 transition">
                {it.title}
              </h3>
              {it.issuer && <p className="text-sm text-slate-400">— {it.issuer}</p>}
              <div className="text-xs text-indigo-300 mt-1">{it.date}</div>
              <p className="mt-2 text-slate-300 leading-relaxed text-justify">{it.description}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
