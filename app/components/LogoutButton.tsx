"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        router.push("/login");
        router.refresh(); // Cookies clear karne ke baad page refresh zaroori hai
      }
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <button 
      onClick={handleLogout}
      className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-all mt-auto w-full text-left"
    >
      <LogOut className="h-5 w-5" />
      <span className="font-medium">Logout</span>
    </button>
  );
}