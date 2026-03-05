import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../api";

export default function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "", otp: "", newPassword: "" });
  const [step, setStep] = useState("credentials"); // 'credentials', 'otp', 'forgot', 'reset'
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const submitCredentials = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/auth/login", {
        email: form.email,
        password: form.password,
      });
      setStep("otp");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const submitOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/auth/verify-login", {
        email: form.email,
        otp: form.otp,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const submitForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/auth/forgot-password", {
        email: form.email,
      });
      setStep("reset");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const submitResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/auth/reset-password", {
        email: form.email,
        otp: form.otp,
        newPassword: form.newPassword,
      });
      alert("Password reset successful! Please log in.");
      setStep("credentials");
      setForm({ email: "", password: "", otp: "", newPassword: "" });
    } catch (err) {
      alert(err.response?.data?.message || "Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center bg-white dark:bg-slate-950 px-4 py-12">
      <motion.div
        className="w-full max-w-md bg-white dark:bg-slate-900 p-10 border border-slate-200 dark:border-slate-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2
          className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Admin Login
        </motion.h2>

        {step === "credentials" ? (
          <form onSubmit={submitCredentials} className="space-y-5">
            <div>
              <label className="block text-slate-900 dark:text-white mb-2 text-sm font-mono">Email</label>
              <input
                className="w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-1 focus:ring-slate-900 dark:focus:ring-white focus:border-slate-900 dark:focus:border-white outline-none transition-all"
                placeholder="Enter email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            <div className="relative">
              <label className="block text-slate-900 dark:text-white mb-2 text-sm font-mono">Password</label>
              <input
                className="w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-1 focus:ring-slate-900 dark:focus:ring-white focus:border-slate-900 dark:focus:border-white outline-none transition-all"
                placeholder="Enter password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
              <button
                type="button"
                className="absolute right-4 top-10 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors text-sm font-mono"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <button
              className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 transition-all px-4 py-3 font-mono text-sm"
              type="submit"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>

            <button
              type="button"
              className="w-full text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm mt-3 font-mono"
              onClick={() => setStep("forgot")}
            >
              Forgot Password?
            </button>
          </form>
        ) : step === "otp" ? (
          <form onSubmit={submitOTP} className="space-y-5">
            <div>
              <label className="block text-slate-900 dark:text-white mb-2 text-sm font-mono">OTP Code</label>
              <input
                className="w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-1 focus:ring-slate-900 dark:focus:ring-white focus:border-slate-900 dark:focus:border-white outline-none transition-all text-center text-2xl tracking-widest font-mono"
                placeholder="000000"
                maxLength="6"
                value={form.otp}
                onChange={(e) => setForm({ ...form, otp: e.target.value })}
                required
              />
            </div>

            <button
              className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 transition-all px-4 py-3 font-mono text-sm"
              type="submit"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        ) : step === "forgot" ? (
          <form onSubmit={submitForgotPassword} className="space-y-5">
            <div>
              <label className="block text-slate-900 dark:text-white mb-2 text-sm font-mono">Email</label>
              <input
                className="w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-1 focus:ring-slate-900 dark:focus:ring-white focus:border-slate-900 dark:focus:border-white outline-none transition-all"
                placeholder="Enter registered email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            <button
              className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 transition-all px-4 py-3 font-mono text-sm"
              type="submit"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>

            <button
              type="button"
              className="w-full text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm mt-3 font-mono"
              onClick={() => setStep("credentials")}
            >
              ← Back to Login
            </button>
          </form>
        ) : (
          <form onSubmit={submitResetPassword} className="space-y-5">
            <div>
              <label className="block text-slate-900 dark:text-white mb-2 text-sm font-mono">OTP Code</label>
              <input
                className="w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-1 focus:ring-slate-900 dark:focus:ring-white focus:border-slate-900 dark:focus:border-white outline-none transition-all text-center text-2xl tracking-widest font-mono"
                placeholder="000000"
                maxLength="6"
                value={form.otp}
                onChange={(e) => setForm({ ...form, otp: e.target.value })}
                required
              />
            </div>

            <div className="relative">
              <label className="block text-slate-900 dark:text-white mb-2 text-sm font-mono">New Password</label>
              <input
                className="w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-1 focus:ring-slate-900 dark:focus:ring-white focus:border-slate-900 dark:focus:border-white outline-none transition-all"
                placeholder="Enter new password"
                type={showPassword ? "text" : "password"}
                value={form.newPassword}
                onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
                required
              />
              <button
                type="button"
                className="absolute right-4 top-10 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors text-sm font-mono"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <button
              className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 transition-all px-4 py-3 font-mono text-sm"
              type="submit"
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>

            <button
              type="button"
              className="w-full text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm mt-3 font-mono"
              onClick={() => setStep("credentials")}
            >
              ← Back to Login
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}