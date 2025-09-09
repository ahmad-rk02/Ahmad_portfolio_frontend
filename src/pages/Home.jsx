import { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import API from "../api";

export default function Home() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    API.get("/profile")
      .then((res) => {
        setProfile(res.data);
        setError(null);
      })
      .catch((err) => {
        console.error("Error fetching profile:", err.response?.data || err.message);
        setError("Failed to load profile. Please try again later.");
        setProfile(null);
      });
  }, []);

  return (
    <section className="relative bg-[#0a142d] min-h-screen flex items-center justify-center px-6 lg:px-12 py-12">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16 max-w-6xl w-full">
        
        {/* Avatar - show first on mobile */}
        <div className="flex-1 flex justify-center items-center order-1 lg:order-2">
          {profile?.avatar && (
            <motion.img
              src={profile.avatar}
              alt="Avatar"
              className="rounded-full w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 object-cover shadow-2xl border-4 border-indigo-600"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              whileHover={{ scale: 1.05, rotate: 3 }}
            />
          )}
        </div>

        {/* Text Section */}
        <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
          <p className="text-indigo-400 font-semibold mb-3 tracking-wide">
            Hello, I am
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            {profile?.name || "Your Name"}
          </h1>

          <h2 className="text-xl sm:text-2xl lg:text-3xl text-indigo-300 mt-3 font-medium min-h-[40px]">
            <Typewriter
              words={profile?.title ? [profile.title] : ["Software Engineer", "Web Developer"]}
              loop
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </h2>

          <p className="mt-6 text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0 text-justify">
            {profile?.summary ||
              "Short profile summary — what you do, main tech, and what you love building."}
          </p>

          {error && <p className="mt-4 text-red-500">{error}</p>}

          {/* Buttons + Socials */}
          <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4 items-center">
            <a
              href="/projects"
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition transform hover:-translate-y-1 hover:shadow-lg"
            >
              View Projects
            </a>

            {profile?.socials?.linkedin && (
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xl transition"
                title="LinkedIn"
              >
                <FaLinkedin />
              </a>
            )}
            {profile?.socials?.github && (
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full bg-gray-700 hover:bg-gray-800 text-white text-xl transition"
                title="GitHub"
              >
                <FaGithub />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
