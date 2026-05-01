import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/db"; 
import { cookies } from "next/headers";


export async function GET() {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("user_id")?.value;
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true }
    });

    let tasks;

    if (user?.role === "ADMIN") {
      
      tasks = await prisma.task.findMany({
        include: { 
          project: true, 
          assignee: { select: { name: true } } 
        },
        orderBy: { createdAt: 'desc' }
      });
    } else {
      
      tasks = await prisma.task.findMany({
        where: {
          OR: [
            { assigneeId: userId },
            { project: { ownerId: userId } }
          ]
        },
        include: { 
          project: true, 
          assignee: { select: { name: true } } 
        },
        orderBy: { createdAt: 'desc' }
      });
    }

    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
  }
}

 
export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("user_id")?.value;
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, status, assigneeId } = await req.json();

    let project = await prisma.project.findFirst({ where: { ownerId: userId } });
    if (!project) {
      project = await prisma.project.create({
        data: { name: "My Tasks", ownerId: userId }
      });
    }

    const newTask = await prisma.task.create({
      data: {
        title,
        status: status || "TODO",
        projectId: project.id,
        
        assigneeId: assigneeId || userId 
      }
    });

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
  }
}