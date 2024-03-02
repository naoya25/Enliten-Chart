import { NextResponse } from "next/server";
import { main, prisma } from "../route";

// 全Todo取得用API
export const GET = async (req: Request, res: NextResponse) => {
  try {
    await main();
    const todos = await prisma.todo.findMany();
    return NextResponse.json({ message: "Success", todos }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

// todo投稿用API
export const POST = async (req: Request, res: NextResponse) => {
  try {
    const { description, deadline, objectiveId } = await req.json();

    await main();
    const todo = await prisma.todo.create({
      data: {
        description,
        deadline,
        objectiveId,
      },
    });
    return NextResponse.json({ message: "Success", todo }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

// Todo達成API
export const PUT = async (req: Request, res: NextResponse) => {
  try {
    const { todoId } = await req.json();

    await main();
    const todo = await prisma.todo.findUnique({
      where: { id: todoId },
    });

    if (!todo) {
      return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }

    const updatedTodo = await prisma.todo.update({
      where: { id: todoId },
      data: { isAchievement: !todo.isAchievement, achievementDay: new Date() },
    });

    return NextResponse.json(
      { message: "Success", todo: updatedTodo },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
