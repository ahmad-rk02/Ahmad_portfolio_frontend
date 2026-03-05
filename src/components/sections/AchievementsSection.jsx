import { motion } from "framer-motion";
import { HiLightningBolt } from "react-icons/hi";
import { FaTrophy, FaMedal, FaAward } from "react-icons/fa";

export default function AchievementsSection({ achievements }) {
    return (
        <section id="achievements" className="relative py-20 sm:py-32 bg-slate-900 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-slate-900"></div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full mb-4"
                    >
                        <HiLightningBolt className="text-amber-400" />
                        <span className="text-sm text-amber-300 font-semibold">Achievements</span>
                    </motion.div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
                        Awards &{" "}
                        <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                            Recognition
                        </span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {achievements.map((achievement, index) => (
                        <motion.div
                            key={achievement._id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.02, y: -5 }}
                            className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm p-6 rounded-2xl border border-white/5 hover:border-amber-500/30 transition-all duration-300 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/5 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                            <div className="relative flex gap-4">
                                {achievement.image ? (
                                    <img
                                        src={achievement.image}
                                        alt={achievement.title}
                                        className="w-20 h-20 object-cover rounded-xl flex-shrink-0"
                                    />
                                ) : (
                                    <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <FaTrophy className="text-3xl text-white" />
                                    </div>
                                )}

                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                                        {achievement.title}
                                    </h3>
                                    {achievement.issuer && (
                                        <p className="text-sm text-amber-400 font-semibold mb-2">
                                            {achievement.issuer}
                                        </p>
                                    )}
                                    <p className="text-xs text-slate-500 mb-3">{achievement.date}</p>
                                    <p className="text-sm text-slate-400 leading-relaxed text-justify">
                                        {achievement.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
