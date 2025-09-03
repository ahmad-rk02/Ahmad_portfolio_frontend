import { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import API from "../api";
export default function Home() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    API.get("/profile")
      .then(res => setProfile(res.data))
      .catch(() => setProfile(null));
  }, []);

  return (
    <section className="relative bg-[#0a142d] min-h-screen flex items-center justify-center px-6 lg:px-12">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 max-w-5xl w-full">

        {/* Left Section - Text */}
        <div className="flex-1 text-center lg:text-left">
          <p className="text-indigo-400 font-semibold mb-3 tracking-wide">Hello, I am</p>
          <h1 className="text-4xl sm:text-5xl lg:text-5xl font-extrabold text-white leading-tight">
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
            {profile?.summary || "Short profile summary — what you do, main tech, and what you love building."}
          </p>

          <div className="mt-6 flex flex-wrap justify-center lg:justify-start gap-4 items-center">
            <a
              href="/projects"
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition transform hover:-translate-y-1 hover:shadow-lg"
            >
              View Projects
            </a>

            {profile?.socials?.linkedin && (
              <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="text-blue-500 text-2xl hover:text-blue-400" title="LinkedIn">
                <FaLinkedin />
              </a>
            )}
            {profile?.socials?.github && (
              <a href={profile.socials.github} target="_blank" rel="noreferrer" className="text-gray-400 text-2xl hover:text-gray-200" title="GitHub">
                <FaGithub />
              </a>
            )}
          </div>
        </div>

        {/* Right Section - Avatar */}
        <div className="flex-1 flex justify-center items-center">
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
      </div>
    </section>

  );
}
