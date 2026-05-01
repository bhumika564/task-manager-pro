import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/db"; //
import { cookies } from "next/headers";


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
        // Use the ID from the dropdown, otherwise assign to self
        assigneeId: assigneeId || userId 
      }
    });

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
  }
}