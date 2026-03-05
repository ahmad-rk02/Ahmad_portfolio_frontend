import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function ContactSection({ profile }) {
    return (
        <section id="contact" className="py-20 bg-white dark:bg-slate-950">
            <div className="container mx-auto px-6 lg:px-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-3xl"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-8">
                        Get In Touch
                    </h2>

                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-12 text-justify">
                        I'm currently looking for new opportunities. Whether you have a question or just want
                        to say hi, I'll try my best to get back to you!
                    </p>

                    <div className="space-y-6 mb-12">
                        <a
                            href="mailto:razakhanahmad68@gmail.com"
                            className="flex items-center gap-4 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors group"
                        >
                            <FaEnvelope className="text-2xl" />
                            <span className="text-lg group-hover:underline">razakhanahmad68@gmail.com</span>
                        </a>
                        <a
                            href="tel:+918767887220"
                            className="flex items-center gap-4 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors group"
                        >
                            <FaPhone className="text-2xl" />
                            <span className="text-lg group-hover:underline">+91 8767887220</span>
                        </a>
                    </div>

                    <div className="flex items-center gap-6 mb-12">
                        {profile?.socials?.github && (
                            <a
                                href={profile.socials.github}
                                target="_blank"
                                rel="noreferrer"
                                className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                            >
                                <FaGithub className="text-3xl" />
                            </a>
                        )}
                        {profile?.socials?.linkedin && (
                            <a
                                href={profile.socials.linkedin}
                                target="_blank"
                                rel="noreferrer"
                                className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                            >
                                <FaLinkedin className="text-3xl" />
                            </a>
                        )}
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noreferrer"
                            className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                        >
                            <FaTwitter className="text-3xl" />
                        </a>
                    </div>

                    <div className="pt-12 border-t border-slate-200 dark:border-slate-800">
                        <p className="text-slate-600 dark:text-slate-400 text-center">
                            © {new Date().getFullYear()} {profile?.name || "Ahmad Raza Khan"}. All rights reserved.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
