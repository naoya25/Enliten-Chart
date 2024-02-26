import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export const prisma = new PrismaClient() as any;
export async function main() {
  try {
    await prisma.$connect();
  } catch (error) {
    return Error("DB接続に失敗しました");
  }
}

// 全目標取得用API
export const GET = async (req: Request, res: NextResponse) => {
  try {
    await main();
    const objectives = await prisma.objective.findMany();
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
