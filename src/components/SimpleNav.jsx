import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

export default function SimpleNav() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMobileMenuOpen(false);
        }
    };

    const navItems = [
        { label: "About", id: "about" },
        { label: "Experience", id: "experience" },
        { label: "Projects", id: "projects" },
        { label: "Skills", id: "skills" },
        { label: "Contact", id: "contact" },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? "bg-white/90 dark:bg-slate-950/90 backdrop-blur-sm shadow-sm"
                : "bg-transparent"
                }`}
        >
            <div className="container mx-auto px-6 lg:px-20 py-6">
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => scrollToSection('home')}
                        className={`text-2xl font-bold transition-colors ${isScrolled ? "text-slate-900 dark:text-white" : "text-slate-900 dark:text-white"
                            }`}
                    >
                        AK
                    </button>

                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors font-mono text-sm"
                            >
                                {item.label}
                            </button>
                        ))}
                        <Link
                            to="/admin/login"
                            className="px-4 py-2 border border-slate-900 dark:border-white text-slate-900 dark:text-white hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-all font-mono text-sm"
                        >
                            Admin
                        </Link>
                    </div>

                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden text-2xl text-slate-900 dark:text-white"
                    >
                        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>

                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="md:hidden mt-4 space-y-1 bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm rounded-lg p-2 shadow-lg"
                    >
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className="block w-full text-left px-4 py-2.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 transition-all font-mono text-sm rounded"
                            >
                                {item.label}
                            </button>
                        ))}
                        <Link
                            to="/admin/login"
                            className="block w-full text-center px-4 py-2.5 mt-2 border border-slate-900 dark:border-white text-slate-900 dark:text-white hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-all font-mono text-sm rounded"
                        >
                            Admin
                        </Link>
                    </motion.div>
                )}
            </div>
        </nav>
    );
}
