import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";
import { cookies } from "next/headers";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("user_id")?.value;
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // 1. User ka role check karein
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true }
    });

    let tasks;

    // 2. Query logic fix: Admin ko saare stats dikhao, Member ko unke assigned stats
    if (user?.role === "ADMIN") {
      tasks = await prisma.task.findMany();
    } else {
      tasks = await prisma.task.findMany({
        where: {
          OR: [
            { assigneeId: userId },
            { project: { ownerId: userId } }
          ]
        }
      });
    }

    // 3. Stats calculate karein
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === "DONE").length;
    const inProgressTasks = tasks.filter(t => t.status === "TODO" || t.status === "IN_PROGRESS").length;

    return NextResponse.json({
      totalTasks,
      completedTasks,
      inProgressTasks
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}