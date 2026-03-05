import { motion } from "framer-motion";
import { FaBriefcase, FaCode, FaTrophy, FaGraduationCap } from "react-icons/fa";

export default function AboutSection({ profile, stats }) {
    // Helper function to parse DD/MM/YY or DD/MM/YYYY format
    const parseDate = (dateStr) => {
        if (!dateStr) return null;

        // Check if it's "Present" or similar
        if (typeof dateStr === 'string' && (dateStr.toLowerCase().includes('present') || dateStr.toLowerCase().includes('current'))) {
            return new Date();
        }

        // Try to parse DD/MM/YY or DD/MM/YYYY format
        const parts = String(dateStr).split('/');
        if (parts.length === 3) {
            let day = parseInt(parts[0]);
            let month = parseInt(parts[1]) - 1; // Month is 0-indexed
            let year = parseInt(parts[2]);

            // Handle 2-digit year (YY format)
            if (year < 100) {
                year += 2000;
            }

            return new Date(year, month, day);
        }

        // Fallback to default Date parsing
        return new Date(dateStr);
    };

    // Calculate longest single experience from all experience entries
    const calculateLongestExperience = () => {
        if (!stats.experience || stats.experience.length === 0) {
            return profile?.experienceMonths || 6;
        }

        let longestMonths = 0;

        stats.experience.forEach(exp => {
            const startDate = parseDate(exp.startDate);
            const endDate = parseDate(exp.endDate);

            if (startDate && endDate && !isNaN(startDate.getTime()) && !isNaN(endDate.getTime()) && endDate >= startDate) {
                const months = (endDate.getFullYear() - startDate.getFullYear()) * 12
                    + (endDate.getMonth() - startDate.getMonth());
                const validMonths = Math.max(0, months);

                // Keep track of the longest single experience
                if (validMonths > longestMonths) {
                    longestMonths = validMonths;
                }
            }
        });

        return longestMonths || profile?.experienceMonths || 6;
    };

    const totalMonths = calculateLongestExperience();
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    // Format experience display
    const experienceDisplay = () => {
        if (years > 0 && months > 0) {
            return `${years}+ Years`;
        } else if (years > 0) {
            return `${years}+ Years`;
        } else {
            return `${months}+`;
        }
    };

    const experienceLabel = () => {
        if (years > 0) {
            return "Years Experience";
        } else {
            return "Months Experience";
        }
    };

    return (
        <section id="about" className="py-20 bg-slate-50 dark:bg-slate-900">
            <div className="container mx-auto px-6 lg:px-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-12">
                        About Me
                    </h2>

                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed text-justify">
                            <p>
                                Hello! I'm a passionate software developer with a strong focus on creating
                                efficient, scalable, and user-friendly applications. My journey in web
                                development started several years ago, and I've been fortunate to work on
                                diverse projects that have shaped my skills.
                            </p>
                            <p>
                                I specialize in full-stack development, with expertise in modern JavaScript
                                frameworks and backend technologies. I'm always eager to learn new technologies
                                and best practices to deliver high-quality solutions.
                            </p>
                            <p>
                                When I'm not coding, you can find me contributing to open-source projects,
                                writing technical articles, or exploring new technologies.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="border-l-4 border-slate-900 dark:border-white pl-4">
                                <FaBriefcase className="text-2xl text-slate-900 dark:text-white mb-3" />
                                <div className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
                                    {experienceDisplay()}
                                </div>
                                <div className="text-slate-600 dark:text-slate-400">{experienceLabel()}</div>
                            </div>
                            <div className="border-l-4 border-slate-900 dark:border-white pl-4">
                                <FaCode className="text-2xl text-slate-900 dark:text-white mb-3" />
                                <div className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
                                    {stats.projects.length}+
                                </div>
                                <div className="text-slate-600 dark:text-slate-400">Projects Completed</div>
                            </div>
                            <div className="border-l-4 border-slate-900 dark:border-white pl-4">
                                <FaGraduationCap className="text-2xl text-slate-900 dark:text-white mb-3" />
                                <div className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
                                    {stats.skills.length}+
                                </div>
                                <div className="text-slate-600 dark:text-slate-400">Technologies</div>
                            </div>
                            <div className="border-l-4 border-slate-900 dark:border-white pl-4">
                                <FaTrophy className="text-2xl text-slate-900 dark:text-white mb-3" />
                                <div className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
                                    {stats.achievements.length}+
                                </div>
                                <div className="text-slate-600 dark:text-slate-400">Achievements</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
