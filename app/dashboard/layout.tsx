import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LayoutDashboard, CheckSquare, Users } from "lucide-react";
import Link from "next/link";
import LogoutButton from "@/app/components/LogoutButton"; // Import kijiye

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value;
  const userRole = cookieStore.get("user_role")?.value;

  if (!userId) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] text-white flex">
      <aside className="w-64 border-r border-white/10 bg-white/5 backdrop-blur-xl p-6 hidden md:flex flex-col">
        <div className="mb-10">
          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
            TaskPro
          </h2>
        </div>
        
        <nav className="flex-1 space-y-2">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-white/10 hover:text-white transition-all">
            <LayoutDashboard className="h-5 w-5" />
            <span className="font-medium">Dashboard</span>
          </Link>
          <Link href="/dashboard/tasks" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-white/10 hover:text-white transition-all">
            <CheckSquare className="h-5 w-5" />
            <span className="font-medium">Tasks</span>
          </Link>
          {userRole === "ADMIN" && (
            <Link href="/dashboard/team" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-white/10 hover:text-white transition-all">
              <Users className="h-5 w-5" />
              <span className="font-medium">Team</span>
            </Link>
          )}
        </nav>

        {/* Naya Logout Button yahan aayega */}
        <LogoutButton />
      </aside>

      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}