import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "./pages/Home";
import Experience from "./pages/Experience";
import Education from "./pages/Education";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Achievements from "./pages/Achievements";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Footer from "../components/footer";

export default function App(){
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/experience" element={<Experience/>}/>
          <Route path="/education" element={<Education/>}/>
          <Route path="/skills" element={<Skills/>}/>
          <Route path="/projects" element={<Projects/>}/>
          <Route path="/achievements" element={<Achievements/>}/>
          <Route path="/admin/login" element={<AdminLogin/>}/>
          <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
        </Routes>

      </div>
                              <Footer />
    </BrowserRouter>
  );
}
