"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, Clock, ListTodo, Loader2 } from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState({ total: 0, completed: 0, inProgress: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getStats() {
      try {
        const res = await fetch("/api/dashboard/stats");
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    getStats();
  }, []);

  if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin h-10 w-10 text-cyan-500" /></div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Welcome back!</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
          <ListTodo className="h-8 w-8 text-indigo-400 mb-4" />
          <p className="text-gray-400">Total Tasks</p>
          <h2 className="text-4xl font-bold">{stats.total}</h2>
        </div>
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
          <Clock className="h-8 w-8 text-yellow-400 mb-4" />
          <p className="text-gray-400">In Progress</p>
          <h2 className="text-4xl font-bold">{stats.inProgress || 0}</h2>
        </div>
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
          <CheckCircle2 className="h-8 w-8 text-emerald-400 mb-4" />
          <p className="text-gray-400">Completed</p>
          <h2 className="text-4xl font-bold">{stats.completed}</h2>
        </div>
      </div>
    </div>
  );
}