import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const { status } = await req.json();
    const { id } = await params;
    const updatedTask = await prisma.task.update({
      where: { id: id },
      data: { status: status },
    });
    return NextResponse.json(updatedTask);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    await prisma.task.delete({ where: { id: id } });
    return NextResponse.json({ message: "Task deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}