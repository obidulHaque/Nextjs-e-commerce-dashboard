import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = await auth();
    const body = await req.json();
    const { name } = body;

    if (!userId) {
      return NextResponse.json(
        { error: "you are not authentic person " },
        { status: 401 }
      );
    }

    if (!name) {
      return NextResponse.json(
        { error: "Missing required fields name " },
        { status: 400 }
      );
    }

    await prisma.store.create({
      data: {
        name,
        userId,
      },
    });

    return NextResponse.json(
      { message: "store create successfully done " },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create store:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
