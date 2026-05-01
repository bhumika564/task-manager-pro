import { prisma } from "@/app/lib/db";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'; 

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, role: true }
    });
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}