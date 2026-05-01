"use client";

import { useState, useEffect } from "react";
import { Users, Shield, User, Loader2 } from "lucide-react";

export default function TeamPage() {
  const [team, setTeam] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTeam() {
      try {
        const res = await fetch("/api/team");
        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Failed to load team");
        } else {
          setTeam(data);
        }
      } catch (err) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    fetchTeam();
  }, []);

  if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin h-10 w-10 text-cyan-500" /></div>;
  
  if (error) return (
    <div className="p-8 flex flex-col items-center justify-center h-[80vh] text-center">
      <Shield className="h-16 w-16 text-red-500 mb-4 opacity-50" />
      <h2 className="text-2xl font-bold text-white mb-2">Access Restricted</h2>
      <p className="text-gray-400">{error}</p>
    </div>
  );

  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <Users className="text-cyan-400" /> Team Management
        </h1>
        <p className="text-gray-400 mt-2">View and manage registered users (Admin Only)</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map((member) => (
          <div key={member.id} className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center gap-4 hover:border-cyan-500/30 transition-all">
            <div className={`p-3 rounded-full ${member.role === 'ADMIN' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-gray-500/20 text-gray-400'}`}>
              {member.role === 'ADMIN' ? <Shield className="h-6 w-6" /> : <User className="h-6 w-6" />}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{member.name}</h3>
              <p className="text-sm text-gray-400">{member.email}</p>
              <span className={`inline-block mt-2 px-2 py-1 text-xs font-bold rounded-md ${member.role === 'ADMIN' ? 'bg-indigo-500/20 text-indigo-300' : 'bg-white/10 text-gray-300'}`}>
                {member.role}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}