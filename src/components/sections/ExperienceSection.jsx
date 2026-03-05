import { motion } from "framer-motion";
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

export default function ExperienceSection({ experience }) {
    return (
        <section id="experience" className="py-20 bg-white dark:bg-slate-950">
            <div className="container mx-auto px-6 lg:px-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-12">
                        Work Experience
                    </h2>

                    <div className="space-y-12">
                        {experience.map((exp, index) => (
                            <motion.div
                                key={exp._id}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="relative pl-8 border-l-2 border-slate-200 dark:border-slate-800"
                            >
                                <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-slate-900 dark:bg-white"></div>

                                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                                    <div>
                                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                                            {exp.role}
                                        </h3>
                                        <div className="flex flex-wrap items-center gap-4 text-slate-600 dark:text-slate-400 mb-2">
                                            <span className="flex items-center gap-2">
                                                <FaBriefcase className="text-sm" />
                                                {exp.company}
                                            </span>
                                            {exp.location && (
                                                <span className="flex items-center gap-2">
                                                    <FaMapMarkerAlt className="text-sm" />
                                                    {exp.location}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <span className="flex items-center gap-2 text-slate-600 dark:text-slate-400 whitespace-nowrap">
                                        <FaCalendarAlt className="text-sm" />
                                        {exp.startDate} - {exp.endDate || "Present"}
                                    </span>
                                </div>

                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    {exp.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
