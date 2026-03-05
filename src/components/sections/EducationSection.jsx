import { motion } from "framer-motion";
import { FaGraduationCap, FaCalendarAlt } from "react-icons/fa";

export default function EducationSection({ education }) {
    return (
        <section id="education" className="py-20 bg-slate-50 dark:bg-slate-900">
            <div className="container mx-auto px-6 lg:px-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-12">
                        Education
                    </h2>

                    <div className="space-y-12">
                        {education.map((edu, index) => (
                            <motion.div
                                key={edu._id}
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
                                            {edu.degree}
                                        </h3>
                                        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 mb-2">
                                            <FaGraduationCap className="text-sm" />
                                            {edu.institution}
                                        </div>
                                    </div>
                                    <span className="flex items-center gap-2 text-slate-600 dark:text-slate-400 whitespace-nowrap">
                                        <FaCalendarAlt className="text-sm" />
                                        {edu.startYear} - {edu.endYear}
                                    </span>
                                </div>

                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    {edu.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
