import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaGithub, FaDownload, FaEye } from "react-icons/fa";

export default function ProjectsSection({ projects }) {
    return (
        <section id="projects" className="py-20 bg-slate-50 dark:bg-slate-900">
            <div className="container mx-auto px-6 lg:px-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-12">
                        Featured Projects
                    </h2>

                    <div className="space-y-16">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project._id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="border-l-4 border-slate-900 dark:border-white pl-8"
                            >
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                    {project.title}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6 text-justify">
                                    {project.description}
                                </p>

                                {project.tech && (
                                    <div className="flex flex-wrap gap-3 mb-6">
                                        {project.tech.map((tech, idx) => (
                                            <span
                                                key={idx}
                                                className="text-sm text-slate-600 dark:text-slate-400 font-mono"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <div className="flex flex-wrap gap-4">
                                    {project.link && (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex items-center gap-2 text-slate-900 dark:text-white hover:underline"
                                        >
                                            <FaExternalLinkAlt className="text-sm" />
                                            View Project
                                        </a>
                                    )}
                                    {project.github && (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex items-center gap-2 text-slate-900 dark:text-white hover:underline"
                                        >
                                            <FaGithub className="text-sm" />
                                            Source Code
                                        </a>
                                    )}
                                    {project.files && project.files.length > 0 && (
                                        <>
                                            <a
                                                href={project.files[0]}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex items-center gap-2 text-slate-900 dark:text-white hover:underline"
                                            >
                                                <FaEye className="text-sm" />
                                                Preview
                                            </a>
                                            <a
                                                href={project.files[0]}
                                                download
                                                className="flex items-center gap-2 text-slate-900 dark:text-white hover:underline"
                                            >
                                                <FaDownload className="text-sm" />
                                                Download
                                            </a>
                                        </>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
