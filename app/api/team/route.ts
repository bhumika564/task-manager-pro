import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const userRole = cookieStore.get("user_role")?.value;

    // RBAC: Agar user ADMIN nahi hai, toh data mat do
    if (userRole !== "ADMIN") {
      return NextResponse.json({ error: "Access Denied. Admins only." }, { status: 403 });
    }

    // Saare users fetch karo (password chhod kar)
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
      orderBy: { role: 'asc' }
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error("Team API Error:", error);
    return NextResponse.json({ error: "Failed to fetch team members" }, { status: 500 });
  }
}