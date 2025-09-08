import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a142d] via-[#081226] to-[#050c1a] px-4">
      <div className="w-full max-w-md bg-[#071228] p-8 rounded-2xl shadow-2xl border border-slate-800">
        <h2 className="text-3xl font-extrabold text-center text-indigo-400 mb-6">
          Admin Login
        </h2>

        {step === "credentials" ? (
          <form onSubmit={submitCredentials} className="space-y-5">
            <div>
              <label className="block text-slate-300 mb-1 text-sm">Email</label>
              <input
                className="w-full rounded-lg border border-slate-700 bg-slate-900/50 px-3 py-2 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Enter email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            <div className="relative">
              <label className="block text-slate-300 mb-1 text-sm">Password</label>
              <input
                className="w-full rounded-lg border border-slate-700 bg-slate-900/50 px-3 py-2 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Enter password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-slate-400 hover:text-slate-200"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <button
              className="w-full bg-indigo-600 hover:bg-indigo-700 transition px-4 py-2 rounded-lg font-semibold text-white shadow-lg"
              type="submit"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>

            <button
              type="button"
              className="w-full text-indigo-400 hover:text-indigo-300 text-sm mt-2"
              onClick={() => setStep("forgot")}
            >
              Forgot Password?
            </button>
          </form>
        ) : step === "otp" ? (
          <form onSubmit={submitOTP} className="space-y-5">
            <div>
              <label className="block text-slate-300 mb-1 text-sm">OTP</label>
              <input
                className="w-full rounded-lg border border-slate-700 bg-slate-900/50 px-3 py-2 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Enter 6-digit OTP"
                value={form.otp}
                onChange={(e) => setForm({ ...form, otp: e.target.value })}
                required
              />
            </div>

            <button
              className="w-full bg-indigo-600 hover:bg-indigo-700 transition px-4 py-2 rounded-lg font-semibold text-white shadow-lg"
              type="submit"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        ) : step === "forgot" ? (
          <form onSubmit={submitForgotPassword} className="space-y-5">
            <div>
              <label className="block text-slate-300 mb-1 text-sm">Email</label>
              <input
                className="w-full rounded-lg border border-slate-700 bg-slate-900/50 px-3 py-2 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Enter registered email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            <button
              className="w-full bg-indigo-600 hover:bg-indigo-700 transition px-4 py-2 rounded-lg font-semibold text-white shadow-lg"
              type="submit"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>

            <button
              type="button"
              className="w-full text-indigo-400 hover:text-indigo-300 text-sm mt-2"
              onClick={() => setStep("credentials")}
            >
              Back to Login
            </button>
          </form>
        ) : (
          <form onSubmit={submitResetPassword} className="space-y-5">
            <div>
              <label className="block text-slate-300 mb-1 text-sm">OTP</label>
              <input
                className="w-full rounded-lg border border-slate-700 bg-slate-900/50 px-3 py-2 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Enter 6-digit OTP"
                value={form.otp}
                onChange={(e) => setForm({ ...form, otp: e.target.value })}
                required
              />
            </div>

            <div className="relative">
              <label className="block text-slate-300 mb-1 text-sm">New Password</label>
              <input
                className="w-full rounded-lg border border-slate-700 bg-slate-900/50 px-3 py-2 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Enter new password"
                type={showPassword ? "text" : "password"}
                value={form.newPassword}
                onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-slate-400 hover:text-slate-200"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <button
              className="w-full bg-indigo-600 hover:bg-indigo-700 transition px-4 py-2 rounded-lg font-semibold text-white shadow-lg"
              type="submit"
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>

            <button
              type="button"
              className="w-full text-indigo-400 hover:text-indigo-300 text-sm mt-2"
              onClick={() => setStep("credentials")}
            >
              Back to Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
}