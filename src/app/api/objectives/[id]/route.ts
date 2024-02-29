import { NextResponse } from "next/server";
import { prisma, main } from "../route";

// 詳細目標取得
export const GET = async (req: Request, res: NextResponse) => {
  try {
    const id: number = parseInt(req.url.split("/objectives/")[1]);
    await main();
    const objective = await prisma.objective.findUnique({
      where: { id },
      include: {
        todos: true,
        reviews: true,
      },
    });
    return NextResponse.json(
      { message: "Success", objective },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

// 目標編集用API
export const PUT = async (req: Request, res: NextResponse) => {
  try {
    const id: number = parseInt(req.url.split("/objectives/")[1]);
    const { title, description, deadline } = await req.json();

    await main();
    const objectives = await prisma.objective.update({
      data: { title, description, deadline },
      where: { id },
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

// 目標削除用API
export const DELETE = async (req: Request, res: NextResponse) => {
  try {
    const id: number = parseInt(req.url.split("/objectives/")[1]);

    await main();
    const objective = await prisma.objective.delete({
      where: { id },
    });
    return NextResponse.json(
      { message: "Success", objective },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
