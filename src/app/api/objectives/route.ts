import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { main, prisma } from "../route";

// 全目標取得用API
export const GET = async (req: Request, res: NextResponse) => {
  try {
    await main();
    const objectives = await prisma.objective.findMany({
      include: {
        todos: true,
        reviews: true,
      },
    });
    return NextResponse.json(
      { message: "Success", objectives },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

// 目標投稿用API
export const POST = async (req: Request, res: NextResponse) => {
  try {
    const { title, description, deadline, userId } = await req.json();
    console.log(title, description, deadline, userId);

    await main();
    const objective = await prisma.objective.create({
      data: {
        title,
        description,
        deadline,
        userId,
      },
    });
    return NextResponse.json(
      { message: "Success", objective },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
