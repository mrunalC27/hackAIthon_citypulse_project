import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { User, Shield, UserPlus, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

type ViewState =
  | "selection"
  | "consumer-login"
  | "consumer-register"
  | "admin-login";

const ADMIN_EMAIL = "admin@citypulse.com"; // 👈 change if needed

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const [currentView, setCurrentView] = useState<ViewState>("selection");

  // Common states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  // ---------------- CONSUMER LOGIN ----------------
  const handleConsumerLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(email, password);
      toast.success("Login successful");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Login failed");
    }
  };

  // ---------------- ADMIN LOGIN ----------------
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email !== ADMIN_EMAIL) {
      toast.error("Not authorized as admin");
      return;
    }

    try {
      await login(email, password);
      toast.success("Admin login successful");
      navigate("/admin");
    } catch (error: any) {
      toast.error("Invalid admin credentials");
    }
  };

  // ---------------- REGISTER ----------------
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await register(email, password);
      toast.success("Account created successfully");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">

        {/* -------- ROLE SELECTION -------- */}
        {currentView === "selection" && (
          <div className="bg-card p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold text-center mb-4">
              Choose Login Type
            </h2>

            <button
              onClick={() => setCurrentView("consumer-login")}
              className="w-full mb-3 p-3 border rounded-lg flex gap-3 items-center"
            >
              <User /> Consumer Login
            </button>

            <button
              onClick={() => setCurrentView("admin-login")}
              className="w-full p-3 border rounded-lg flex gap-3 items-center"
            >
              <Shield /> Admin Login
            </button>
          </div>
        )}

        {/* -------- CONSUMER LOGIN -------- */}
        {currentView === "consumer-login" && (
          <form onSubmit={handleConsumerLogin} className="bg-card p-6 rounded-xl shadow space-y-4">
            <button type="button" onClick={() => setCurrentView("selection")} className="flex gap-2 text-sm">
              <ArrowLeft /> Back
            </button>

            <h2 className="text-lg font-semibold">Consumer Login</h2>

            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full p-2 border rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button className="w-full bg-primary text-white p-2 rounded">
              Login
            </button>

            <p className="text-sm text-center">
              New user?{" "}
              <button
                type="button"
                className="text-primary"
                onClick={() => setCurrentView("consumer-register")}
              >
                Register
              </button>
            </p>
          </form>
        )}

        {/* -------- REGISTER -------- */}
        {currentView === "consumer-register" && (
          <form onSubmit={handleRegister} className="bg-card p-6 rounded-xl shadow space-y-4">
            <button type="button" onClick={() => setCurrentView("consumer-login")} className="flex gap-2 text-sm">
              <ArrowLeft /> Back
            </button>

            <h2 className="text-lg font-semibold">Register</h2>

            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full p-2 border rounded"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button className="w-full bg-primary text-white p-2 rounded">
              Create Account
            </button>
          </form>
        )}

        {/* -------- ADMIN LOGIN -------- */}
        {currentView === "admin-login" && (
          <form onSubmit={handleAdminLogin} className="bg-card p-6 rounded-xl shadow space-y-4">
            <button type="button" onClick={() => setCurrentView("selection")} className="flex gap-2 text-sm">
              <ArrowLeft /> Back
            </button>

            <h2 className="text-lg font-semibold">Admin Login</h2>

            <input
              type="email"
              placeholder="Admin Email"
              className="w-full p-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button className="w-full bg-primary text-white p-2 rounded">
              Login as Admin
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
