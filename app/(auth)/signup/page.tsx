"use client";

import { useState } from "react";
import { User, Mail, Lock, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.error);
        setLoading(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/login"); // Success ke baad login par bhej do
      }, 2000);
      
    } catch (err) {
      setError("Something went wrong");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <div className="w-full max-w-md p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(120,119,198,0.1)]">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 mb-2">
            Create Account
          </h1>
          <p className="text-gray-400 text-sm">Join the team and start managing tasks.</p>
        </div>

        {error && <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm text-center">{error}</div>}
        {success && <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-200 text-sm text-center">Account created! Redirecting to login...</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-300">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-500" />
              </div>
              <input type="text" name="name" required className="w-full pl-10 pr-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none text-white transition-all" placeholder="John Doe" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-300">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-500" />
              </div>
              <input type="email" name="email" required className="w-full pl-10 pr-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none text-white transition-all" placeholder="john@example.com" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-300">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-500" />
              </div>
              <input type="password" name="password" required minLength={6} className="w-full pl-10 pr-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none text-white transition-all" placeholder="••••••••" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-300">Role</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <ShieldCheck className="h-5 w-5 text-gray-500" />
              </div>
              <select name="role" className="w-full pl-10 pr-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none text-white appearance-none transition-all cursor-pointer">
                <option value="MEMBER" className="bg-gray-900">Member</option>
                <option value="ADMIN" className="bg-gray-900">Admin</option>
              </select>
            </div>
          </div>

          <button type="submit" disabled={loading || success} className="w-full py-3 px-4 bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white font-medium rounded-lg transition-all flex justify-center items-center">
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account? <Link href="/login" className="text-cyan-400 hover:text-cyan-300 font-medium">Log in</Link>
        </p>
      </div>
    </div>
  );
}