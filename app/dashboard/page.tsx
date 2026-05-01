"use client";

import { useState, useEffect } from "react";
import { Plus, CheckCircle2, Circle, Loader2, LayoutGrid, Clock, CheckCircle } from "lucide-react";
import Link from "next/link"; // Link import kiya gaya hai

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    inProgressTasks: 0,
  });
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [statsRes, tasksRes] = await Promise.all([
        fetch("/api/dashboard/stats"),
        fetch("/api/tasks")
      ]);

      if (statsRes.ok) setStats(await statsRes.json());
      if (tasksRes.ok) setTasks(await tasksRes.json());
    } catch (err) {
      console.error("Data load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleTaskStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "DONE" ? "TODO" : "DONE";
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) fetchData();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#050505]">
        <Loader2 className="animate-spin h-10 w-10 text-blue-500" />
      </div>
    );
  }

  // Get current date for the header
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' 
  }).toUpperCase();

  return (
    <div className="p-8 bg-[#050505] min-h-screen text-white relative font-sans">
      
      {/* Background Ambient Glows for Glassmorphism */}
      <div className="absolute top-0 left-1/4 w-[40vw] h-[40vw] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[30vw] h-[30vw] bg-emerald-600/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        
        {/* --- HEADER SECTION --- */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <p className="text-blue-500 text-xs font-mono font-semibold tracking-widest mb-3 uppercase">
              // Dashboard
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight">
              Welcome back, <span className="text-gray-500 font-medium">Jordan.</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 border border-white/10 bg-white/[0.02] backdrop-blur-md rounded-lg text-xs font-mono text-gray-400">
              {today.replace(/,/g, ' ·')}
            </div>
            <button className="flex items-center gap-2 px-5 py-2 bg-white text-black hover:bg-gray-200 font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              <Plus className="h-4 w-4" strokeWidth={3} /> New Task
            </button>
          </div>
        </div>

        {/* --- STATS CARDS SECTION --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Total Tasks */}
          <div className="relative overflow-hidden bg-white/[0.03] backdrop-blur-2xl border border-white/5 rounded-2xl p-6 hover:bg-white/[0.05] transition-colors group">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex justify-between items-start mb-6">
              <span className="text-xs font-mono text-blue-400 tracking-widest uppercase">Total Tasks</span>
              <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20"><LayoutGrid className="h-4 w-4 text-blue-400" /></div>
            </div>
            <p className="text-5xl font-bold text-blue-500">{stats.totalTasks}</p>
          </div>

          {/* In Progress */}
          <div className="relative overflow-hidden bg-white/[0.03] backdrop-blur-2xl border border-white/5 rounded-2xl p-6 hover:bg-white/[0.05] transition-colors group">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex justify-between items-start mb-6">
              <span className="text-xs font-mono text-amber-400 tracking-widest uppercase">In Progress</span>
              <div className="p-2 bg-amber-500/10 rounded-lg border border-amber-500/20"><Clock className="h-4 w-4 text-amber-400" /></div>
            </div>
            <p className="text-5xl font-bold text-amber-500">{stats.inProgressTasks}</p>
          </div>

          {/* Completed */}
          <div className="relative overflow-hidden bg-white/[0.03] backdrop-blur-2xl border border-white/5 rounded-2xl p-6 hover:bg-white/[0.05] transition-colors group">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex justify-between items-start mb-6">
              <span className="text-xs font-mono text-emerald-400 tracking-widest uppercase">Completed</span>
              <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20"><CheckCircle className="h-4 w-4 text-emerald-400" /></div>
            </div>
            <p className="text-5xl font-bold text-emerald-500">{stats.completedTasks}</p>
          </div>
        </div>

        {/* --- TASKS LIST SECTION --- */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-500 text-xs font-mono font-semibold tracking-widest uppercase">
            // Recent Tasks
          </p>
          <div className="flex gap-4 items-center">
            {/* View All Button */}
            <Link href="/dashboard/tasks" className="text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors uppercase tracking-wider flex items-center gap-1">
              View All Tasks <span>→</span>
            </Link>
          </div>
        </div>
        
        <div className="space-y-3">
          {tasks.length === 0 ? (
            <div className="text-center py-16 text-gray-600 font-mono text-sm border border-white/5 rounded-2xl bg-white/[0.02] backdrop-blur-md">
              No tasks found.
            </div>
          ) : (
            // YAHAN .slice(0, 5) ADD KIYA HAI 
            tasks.slice(0, 5).map((task: any) => {
              const taskId = task.id || task._id; 
              const taskTitle = task.title || task.name || "Untitled Task"; 
              const taskStatus = task.status || "TODO"; 
              const isDone = taskStatus === "DONE";
              
              return (
                <div key={taskId} className="group p-4 rounded-xl bg-white/[0.02] backdrop-blur-xl border border-white/5 flex justify-between items-center hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300">
                  <div className="flex items-center gap-5">
                    <button 
                      onClick={() => toggleTaskStatus(taskId, taskStatus)}
                      className="cursor-pointer outline-none transition-transform hover:scale-110"
                    >
                      {isDone ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                      ) : (
                        <Circle className="h-5 w-5 text-amber-500/50 group-hover:text-amber-400 transition-colors" strokeWidth={1.5} />
                      )}
                    </button>
                    
                    <div className="flex flex-col gap-1">
                      <span className={`text-[15px] font-medium transition-all ${isDone ? "text-gray-600 line-through" : "text-gray-200"}`}>
                        {taskTitle}
                      </span>
                      <div className="flex items-center gap-2 text-xs text-gray-500 font-mono">
                        <span>{task.project?.name || "General"}</span>
                        <span>·</span>
                        <span>Assignee: {task.assignee?.name || task.assignee?.username || "Self"}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-white/[0.03] border border-white/5">
                      <div className={`w-1.5 h-1.5 rounded-full ${isDone ? "bg-emerald-500" : "bg-amber-500 shadow-[0_0_5px_rgba(245,158,11,0.5)]"}`}></div>
                      <span className={`text-[10px] font-mono uppercase tracking-wider ${isDone ? "text-emerald-500" : "text-amber-400"}`}>
                        {isDone ? "completed" : "pending"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}