import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";

// PATCH Method
export async function PATCH(
  req: NextRequest, 
  { params }: { params: Promise<{ id: string }> } // Change: params is now a Promise
) {
  try {
    const { id } = await params; // Change: await the params
    const body = await req.json();
    const { status } = body;

    const updatedTask = await prisma.task.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(updatedTask);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
  }
}

// DELETE Method (Agar aapne likha hai, toh ise bhi update karein)
export async function DELETE(
  req: NextRequest, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.task.delete({ where: { id } });
    return NextResponse.json({ message: "Task deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}