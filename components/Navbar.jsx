import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react"; // npm i lucide-react
import "./Navbar.css"; // Import the CSS

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Experience", path: "/experience" },
    { name: "Education", path: "/education" },
    { name: "Skills", path: "/skills" },
    { name: "Projects", path: "/projects" },
    { name: "Achievements", path: "/achievements" },
  ];

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="logo">
          AK
        </Link>

        {/* Desktop Menu */}
        <nav className="desktop-menu">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? "active" : ""}`}
            >
              {item.name}
            </Link>
          ))}
          <Link to="/admin/login" className="admin-btn">
            Admin
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button className="mobile-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mobile-menu">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`mobile-link ${location.pathname === item.path ? "active" : ""}`}
            >
              {item.name}
            </Link>
          ))}
          <Link
            to="/admin/login"
            onClick={() => setIsOpen(false)}
            className="mobile-admin-btn"
          >
            Admin
          </Link>
        </div>
      )}
    </header>
  );
}
