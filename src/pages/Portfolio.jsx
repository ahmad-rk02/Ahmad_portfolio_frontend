import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import API from "../api";
import HeroSection from "../components/sections/HeroSection";
import AboutSection from "../components/sections/AboutSection";
import SkillsSection from "../components/sections/SkillsSection";
import ExperienceSection from "../components/sections/ExperienceSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import EducationSection from "../components/sections/EducationSection";
import ContactSection from "../components/sections/ContactSection";

export default function Portfolio() {
    const [data, setData] = useState({
        profile: null,
        experience: [],
        education: [],
        skills: [],
        projects: [],
        achievements: []
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [profile, experience, education, skills, projects, achievements] = await Promise.all([
                    API.get("/profile").catch(() => ({ data: null })),
                    API.get("/experience").catch(() => ({ data: [] })),
                    API.get("/education").catch(() => ({ data: [] })),
                    API.get("/skills").catch(() => ({ data: [] })),
                    API.get("/projects").catch(() => ({ data: [] })),
                    API.get("/achievements").catch(() => ({ data: [] }))
                ]);

                setData({
                    profile: profile.data,
                    experience: experience.data,
                    education: education.data,
                    skills: skills.data,
                    projects: projects.data,
                    achievements: achievements.data
                });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="bg-white dark:bg-slate-950">
            <HeroSection profile={data.profile} />
            <AboutSection profile={data.profile} stats={data} />
            <ExperienceSection experience={data.experience} />
            <ProjectsSection projects={data.projects} />
            <SkillsSection skills={data.skills} />
            <EducationSection education={data.education} />
            <ContactSection profile={data.profile} />
        </div>
    );
}
