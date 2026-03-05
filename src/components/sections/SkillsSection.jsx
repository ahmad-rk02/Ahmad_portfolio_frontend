import { motion } from "framer-motion";
import { FaCode, FaServer, FaDatabase, FaTools } from "react-icons/fa";

export default function SkillsSection({ skills }) {
    // Group skills by category if possible
    const categories = {
        "Frontend": skills.filter(s =>
            ['react', 'vue', 'angular', 'next', 'html', 'css', 'tailwind', 'javascript', 'typescript'].some(tech =>
                s.name.toLowerCase().includes(tech)
            )
        ),
        "Backend": skills.filter(s =>
            ['node', 'express', 'python', 'django', 'flask', 'java', 'spring'].some(tech =>
                s.name.toLowerCase().includes(tech)
            )
        ),
        "Database": skills.filter(s =>
            ['mongo', 'sql', 'postgres', 'mysql', 'redis', 'database'].some(tech =>
                s.name.toLowerCase().includes(tech)
            )
        ),
        "Tools & Others": skills.filter(s =>
            !['react', 'vue', 'angular', 'next', 'html', 'css', 'tailwind', 'javascript', 'typescript',
                'node', 'express', 'python', 'django', 'flask', 'java', 'spring',
                'mongo', 'sql', 'postgres', 'mysql', 'redis', 'database'].some(tech =>
                    s.name.toLowerCase().includes(tech)
                )
        )
    };

    const icons = {
        "Frontend": FaCode,
        "Backend": FaServer,
        "Database": FaDatabase,
        "Tools & Others": FaTools
    };

    return (
        <section id="skills" className="py-20 bg-white dark:bg-slate-950">
            <div className="container mx-auto px-6 lg:px-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-12">
                        Skills & Technologies
                    </h2>

                    <div className="grid md:grid-cols-2 gap-12">
                        {Object.entries(categories).map(([category, categorySkills]) => {
                            const Icon = icons[category] || FaCode;
                            return categorySkills.length > 0 && (
                                <div key={category}>
                                    <div className="flex items-center gap-3 mb-6">
                                        <Icon className="text-2xl text-slate-900 dark:text-white" />
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                            {category}
                                        </h3>
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        {categorySkills.map((skill) => (
                                            <span
                                                key={skill._id}
                                                className="px-4 py-2 bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 font-mono text-sm"
                                            >
                                                {skill.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
