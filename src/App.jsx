import { BrowserRouter, Routes, Route } from "react-router-dom";
import Portfolio from "./pages/Portfolio";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import SimpleNav from "./components/SimpleNav";
import AdminNav from "./components/AdminNav";
import AdminFooter from "./components/AdminFooter";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <>
            <SimpleNav />
            <Portfolio />
          </>
        } />
        <Route path="/admin/login" element={
          <div className="min-h-screen flex flex-col">
            <AdminNav />
            <AdminLogin />
            <AdminFooter />
          </div>
        } />
        <Route path="/admin/dashboard" element={
          <div className="min-h-screen flex flex-col">
            <AdminNav />
            <AdminDashboard />
            <AdminFooter />
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}
