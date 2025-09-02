import { useEffect, useState } from "react";
import API from "../api";
import { motion } from "framer-motion";

export default function Skills() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    API.get("/skills").then(r => setItems(r.data)).catch(() => setItems([]));
  }, []);

  return (
    <section className="relative py-16 px-6 sm:px-10 lg:px-20 bg-[#0b1220] min-h-screen">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-extrabold text-center text-indigo-400 mb-12"
      >
        Skills
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-wrap gap-3 justify-center"
      >
        {items.map((it) => (
          <motion.span
            key={it._id}
            whileHover={{ scale: 1.05 }}
            className="px-4 py-2 bg-[#071228] border border-slate-700 rounded-full text-sm sm:text-base text-slate-100 shadow-sm hover:border-indigo-400 transition-all duration-200 cursor-default"
          >
            {it.name}{it.level ? ` • ${it.level}` : ""}
          </motion.span>
        ))}
      </motion.div>
    </section>
  );
}
