"use client";

import { useState, useEffect } from "react";
import { Clock, CheckCircle2, ListTodo, Loader2 } from "lucide-react";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    inProgressTasks: 0,
  });
  const [loading, setLoading] = useState(true);

  // Seedha /api/tasks se data laakar count nikal lenge (kyunki wo list bilkul sahi aa rahi hai)
  const fetchStatsFromTasks = async () => {
    try {
      const res = await fetch("/api/tasks");
      const tasks = await res.json();
      
      if (Array.isArray(tasks)) {
        // Jitne tasks array mein hain, unko gin kar set kar do
        setStats({
          totalTasks: tasks.length,
          completedTasks: tasks.filter((t: any) => t.status === "DONE").length,
          inProgressTasks: tasks.filter((t: any) => t.status === "TODO" || t.status === "IN_PROGRESS").length,
        });
      }
    } catch (err) {
      console.error("Stats load karne mein error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatsFromTasks();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0a0a0a]">
        <Loader2 className="animate-spin h-10 w-10 text-cyan-500" />
      </div>
    );
  }

  return (
    <div className="p-8 bg-[#0a0a0a] min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-8">Welcome back!</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Tasks Card */}
        <div className="bg-[#121212] border border-white/10 p-6 rounded-2xl hover:border-indigo-500/50 transition-all shadow-xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-indigo-500/10 rounded-xl">
              <ListTodo className="h-6 w-6 text-indigo-400" />
            </div>
            <span className="text-gray-400 font-medium tracking-wide">Total Tasks</span>
          </div>
          <p className="text-5xl font-bold bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
            {stats.totalTasks}
          </p>
        </div>

        {/* In Progress Card */}
        <div className="bg-[#121212] border border-white/10 p-6 rounded-2xl hover:border-amber-500/50 transition-all shadow-xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-amber-500/10 rounded-xl">
              <Clock className="h-6 w-6 text-amber-400" />
            </div>
            <span className="text-gray-400 font-medium tracking-wide">In Progress</span>
          </div>
          <p className="text-5xl font-bold bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
            {stats.inProgressTasks}
          </p>
        </div>

        {/* Completed Card */}
        <div className="bg-[#121212] border border-white/10 p-6 rounded-2xl hover:border-emerald-500/50 transition-all shadow-xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-emerald-500/10 rounded-xl">
              <CheckCircle2 className="h-6 w-6 text-emerald-400" />
            </div>
            <span className="text-gray-400 font-medium tracking-wide">Completed</span>
          </div>
          <p className="text-5xl font-bold bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
            {stats.completedTasks}
          </p>
        </div>
      </div>
    </div>
  );
}