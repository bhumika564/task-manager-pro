"use client";

import { useState } from "react";
import { Shield, User, ArrowLeft, Zap } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState("");

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    setStep(2); // Move to Login/Signup step
  };

  return (
    <div className="min-h-screen bg-[#030712] flex flex-col items-center justify-center relative overflow-hidden font-sans">
      
      {/* Background Glowing Blue Orb for Glassmorphism effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-3xl px-6">
        
        {/* Header Text */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Zap className="h-8 w-8 text-blue-400" />
            <h1 className="text-4xl font-extrabold text-white tracking-tight">TaskPro</h1>
          </div>
          <p className="text-blue-200/60 text-lg">
            {step === 1 ? "Select your workspace role to continue" : `Continue to ${selectedRole} Portal`}
          </p>
        </div>

        {/* STEP 1: Admin / User Selection */}
        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto animate-in fade-in zoom-in duration-500">
            
            {/* Admin Card */}
            <button 
              onClick={() => handleRoleSelect("Admin")}
              className="group relative flex flex-col items-center p-10 bg-blue-950/20 backdrop-blur-xl border border-blue-500/20 rounded-3xl hover:border-blue-400/60 hover:bg-blue-900/30 transition-all duration-300 shadow-[0_0_40px_-10px_rgba(59,130,246,0.2)] hover:shadow-[0_0_60px_-15px_rgba(59,130,246,0.4)] hover:-translate-y-2"
            >
              <div className="bg-blue-500/20 p-5 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300 border border-blue-500/30">
                <Shield className="h-12 w-12 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Admin</h2>
              <p className="text-sm text-blue-200/60 text-center">Manage team, assign tasks, and view analytics.</p>
            </button>

            {/* User Card */}
            <button 
              onClick={() => handleRoleSelect("User")}
              className="group relative flex flex-col items-center p-10 bg-blue-950/20 backdrop-blur-xl border border-blue-500/20 rounded-3xl hover:border-blue-400/60 hover:bg-blue-900/30 transition-all duration-300 shadow-[0_0_40px_-10px_rgba(59,130,246,0.2)] hover:shadow-[0_0_60px_-15px_rgba(59,130,246,0.4)] hover:-translate-y-2"
            >
              <div className="bg-blue-500/20 p-5 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300 border border-blue-500/30">
                <User className="h-12 w-12 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">User</h2>
              <p className="text-sm text-blue-200/60 text-center">View assigned tasks, update status, and collaborate.</p>
            </button>
          </div>
        )}

        {/* STEP 2: Login / Signup Options */}
        {step === 2 && (
          <div className="max-w-md mx-auto animate-in slide-in-from-bottom-8 fade-in duration-500">
            <div className="bg-blue-950/20 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-8 shadow-[0_0_50px_-12px_rgba(59,130,246,0.3)]">
              
              <button 
                onClick={() => setStep(1)}
                className="flex items-center gap-2 text-sm text-blue-300/70 hover:text-blue-400 mb-8 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" /> Back to roles
              </button>

              <div className="space-y-4">
                {/* Aap in Links mein apna actual login/signup path daal sakti hain */}
                <Link href={`/login?role=${selectedRole.toLowerCase()}`} className="block w-full">
                  <div className="w-full text-center py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]">
                    Login as {selectedRole}
                  </div>
                </Link>

                <div className="relative py-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-blue-500/20"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-[#0f172a] px-2 text-blue-200/50 rounded-md">New here?</span>
                  </div>
                </div>

                <Link href={`/signup?role=${selectedRole.toLowerCase()}`} className="block w-full">
                  <div className="w-full text-center py-4 bg-transparent border border-blue-500/40 text-blue-400 hover:bg-blue-500/10 font-bold rounded-xl transition-all">
                    Sign Up as {selectedRole}
                  </div>
                </Link>
              </div>
              
            </div>
          </div>
        )}

      </div>
    </div>
  );
}