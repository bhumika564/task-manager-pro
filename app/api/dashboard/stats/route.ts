import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("user_id")?.value;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Sabhi tasks ka count
    const total = await prisma.task.count({ 
      where: { assigneeId: userId } 
    });
    
    // Done tasks ka count
    const completed = await prisma.task.count({ 
      where: { assigneeId: userId, status: "DONE" } 
    });
    
    // Todo tasks ka count (Next.js logic ke hisaab se ye In Progress hai)
    const inProgress = await prisma.task.count({ 
      where: { assigneeId: userId, status: "TODO" } 
    });

    return NextResponse.json({ total, completed, inProgress });
  } catch (error) {
    console.error("Dashboard Stats Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}