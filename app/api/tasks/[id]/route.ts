import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";
import { cookies } from "next/headers";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Dynamic route parameter ko resolve karna
    const resolvedParams = await params;
    const taskId = resolvedParams.id;

    const cookieStore = await cookies();
    const userId = cookieStore.get("user_id")?.value;
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { status } = await req.json();

    // 1. User ka role fetch karein
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true }
    });

    // 2. Task fetch karein check karne ke liye ki kiska hai
    const task = await prisma.task.findUnique({
      where: { id: taskId },
      include: { project: true }
    });

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    // 3. Authorization Logic: Admin sab update kar sakta hai, Member sirf apne
    const isAuthorized = 
      user?.role === "ADMIN" || 
      task.assigneeId === userId || 
      task.project?.ownerId === userId;

    if (!isAuthorized) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // 4. Task update karein
    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: { status }
    });

    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
  }
}

// DELETE function (optional, agar pehle se thi toh ise rakh lijiye)
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    await prisma.task.delete({ where: { id: resolvedParams.id } });
    return NextResponse.json({ message: "Deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}