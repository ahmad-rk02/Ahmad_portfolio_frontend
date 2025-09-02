import { FaEnvelope, FaPhone, FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#0a142d] text-slate-300 py-8 mt-12">
      <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Left - Contact Info */}
        <div className="flex flex-col gap-2 text-sm text-center sm:text-left">
          <p className="flex items-center gap-2">
            <FaEnvelope className="text-indigo-400" />
            <a href="mailto:razakhanahmad68@gmail.com" className="hover:text-white transition">
              razakhanahmad68@gmail.com
            </a>
          </p>
          <p className="flex items-center gap-2">
            <FaPhone className="text-indigo-400" />
            <a href="tel:+918767887220" className="hover:text-white transition">
              8767887220
            </a>
          </p>
        </div>

        {/* Center - Copyright */}
        <p className="text-l text-center">
          © {new Date().getFullYear()} Ahmad Raza Khan. All rights reserved.
        </p>

        {/* Right - Socials */}
        <div className="flex gap-4 text-xl">
          <a href="https://github.com/ahmad-rk02" target="_blank" rel="noreferrer" className="hover:text-white transition">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/ahmad-raza-khan1/" target="_blank" rel="noreferrer" className="hover:text-white transition">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
}
