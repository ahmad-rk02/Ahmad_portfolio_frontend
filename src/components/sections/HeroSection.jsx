import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaFileDownload } from "react-icons/fa";

export default function HeroSection({ profile }) {
    return (
        <section id="home" className="min-h-screen flex items-center bg-white dark:bg-slate-950">
            <div className="container mx-auto px-6 lg:px-20 py-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <p className="text-slate-600 dark:text-slate-400 text-lg mb-4">Hi, my name is</p>
                        <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-4">
                            {profile?.name || "Ahmad Raza Khan"}
                        </h1>
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-600 dark:text-slate-400 mb-8">
                            {profile?.title || "Full Stack Developer"}
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed mb-8 text-justify">
                            {profile?.summary || "I'm a software engineer specializing in building exceptional digital experiences. Currently focused on building accessible, human-centered products."}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 mb-8">
                            <a
                                href="#contact"
                                className="px-8 py-3 border-2 border-slate-900 dark:border-white text-slate-900 dark:text-white font-semibold hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-all duration-300"
                            >
                                Get In Touch
                            </a>
                            <a
                                href="/resume.pdf"
                                download
                                className="px-8 py-3 flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                            >
                                <FaFileDownload />
                                Resume
                            </a>
                        </div>

                        <div className="flex items-center gap-6">
                            {profile?.socials?.github && (
                                <a
                                    href={profile.socials.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                                >
                                    <FaGithub className="text-2xl" />
                                </a>
                            )}
                            {profile?.socials?.linkedin && (
                                <a
                                    href={profile.socials.linkedin}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                                >
                                    <FaLinkedin className="text-2xl" />
                                </a>
                            )}
                            <a
                                href="mailto:razakhanahmad68@gmail.com"
                                className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                            >
                                <FaEnvelope className="text-2xl" />
                            </a>
                        </div>
                    </motion.div>

                    {/* Profile Picture */}
                    {profile?.avatar && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="hidden lg:flex justify-center"
                        >
                            <div className="relative">
                                <div className="absolute inset-0 bg-slate-900 dark:bg-white rounded-full blur-2xl opacity-20"></div>
                                <img
                                    src={profile.avatar}
                                    alt={profile.name}
                                    className="relative w-80 h-80 rounded-full object-cover border-4 border-slate-200 dark:border-slate-800 shadow-2xl"
                                />
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
}
