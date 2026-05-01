"use client";

import { useState, useEffect } from "react";
import { Plus, Clock, CheckCircle2, Circle, Loader2, X, Check, User } from "lucide-react";

export default function TasksPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // --- NEW STATES FOR ASSIGNMENT ---
  const [users, setUsers] = useState<any[]>([]);
  const [assigneeId, setAssigneeId] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await fetch("/api/tasks");
      const data = await res.json();
      if (Array.isArray(data)) setTasks(data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  // --- FETCH USERS FOR DROPDOWN ---
  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      if (Array.isArray(data)) setUsers(data);
    } catch (err) { console.error(err); }
  };

  const toggleTaskStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "DONE" ? "TODO" : "DONE";
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        await fetchTasks();
      }
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  useEffect(() => { 
    fetchTasks(); 
    fetchUsers(); // Load users on mount
  }, []);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle) return;
    
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // --- SENDING ASSIGNEE ID TO BACKEND ---
        body: JSON.stringify({ 
          title: newTaskTitle,
          assigneeId: assigneeId || null 
        }),
      });
      
      if (res.ok) {
        setNewTaskTitle("");
        setAssigneeId(""); // Reset selection
        setShowModal(false);
        setShowSuccess(true);
        await fetchTasks();
        setTimeout(() => setShowSuccess(false), 3000);
      }
    } catch (err) { 
      console.error(err); 
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 relative">
      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-10 right-10 z-[100] flex items-center gap-3 px-6 py-4 bg-emerald-500/20 border border-emerald-500/50 backdrop-blur-xl rounded-2xl text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.2)] animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="bg-emerald-500 p-1 rounded-full text-black">
            <Check className="h-4 w-4" strokeWidth={3} />
          </div>
          <span className="font-semibold">New task added successfully!</span>
        </div>
      )}

      <header className="flex justify-between items-center mb-8 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-bold text-white">Tasks</h1>
          <p className="text-gray-400 text-sm mt-1">Manage your work</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white rounded-lg hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all">
          <Plus className="h-4 w-4" /> Create Task
        </button>
      </header>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-[#121212] border border-white/10 rounded-2xl p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">New Task</h2>
              <button onClick={() => setShowModal(false)}><X className="h-5 w-5 text-gray-400" /></button>
            </div>
            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-2 block">Task Title</label>
                <input 
                  autoFocus
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:ring-2 focus:ring-cyan-500 text-white"
                  placeholder="What needs to be done?"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                />
              </div>

              {/* --- DROPDOWN FOR ASSIGNMENT --- */}
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-2 block">Assign To Member</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <select 
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 pl-10 outline-none focus:ring-2 focus:ring-cyan-500 text-white appearance-none cursor-pointer"
                    value={assigneeId}
                    onChange={(e) => setAssigneeId(e.target.value)}
                  >
                    <option value="" className="bg-[#121212]">Assign to me (default)</option>
                    {users.map((user: any) => {
                      const userId = user.id || user._id; // Supports both SQL and MongoDB
                      return (
                        <option key={userId} value={userId} className="bg-[#121212]">
                          {user.name || user.username} ({user.role || 'Member'})
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-3 mt-4 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-lg font-bold text-white flex items-center justify-center gap-2"
              >
                {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : "Add Task"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Task List Section */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin h-8 w-8 text-cyan-400" /></div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-20 text-gray-500 border border-dashed border-white/10 rounded-2xl">No tasks yet.</div>
        ) : (
          tasks.map((task: any) => {
            const taskId = task.id || task._id; // Safety check for ID
            const taskTitle = task.title || task.name || "Untitled Task"; // Safety check for Title
            const taskStatus = task.status || "TODO"; // Default status if undefined
            
            return (
              <div key={taskId} className="p-5 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center group hover:border-cyan-500/50 transition-all">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => toggleTaskStatus(taskId, taskStatus)}
                    className="cursor-pointer hover:scale-110 transition-transform outline-none"
                  >
                    {taskStatus === "DONE" ? (
                      <CheckCircle2 className="h-6 w-6 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)]" />
                    ) : (
                      <Circle className="h-6 w-6 text-gray-500 group-hover:text-cyan-400 transition-colors" />
                    )}
                  </button>
                  
                  <div className="flex flex-col">
                    <span className={`text-lg transition-all ${
                      taskStatus === "DONE" ? "text-gray-500 line-through" : "text-white"
                    }`}>
                      {taskTitle}
                    </span>
                    <span className="text-[10px] text-gray-500 uppercase tracking-tighter">
                      Assignee: {task.assignee?.name || task.assignee?.username || "Self"}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-xs border uppercase tracking-wider font-bold ${
                    taskStatus === "DONE" 
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                      : "bg-indigo-500/10 text-indigo-300 border-indigo-500/20"
                  }`}>
                    {taskStatus}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}