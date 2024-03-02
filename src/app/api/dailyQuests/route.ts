import { NextResponse } from "next/server";
import { main, prisma } from "../route";

// 全dailyquest取得用API
export const GET = async (req: Request, res: NextResponse) => {
  try {
    await main();
    const dailyQuests = await prisma.dailyQuest.findMany({
      include: {
        dailyreviews: true,
      },
    });
    return NextResponse.json(
      { message: "Success", dailyQuests },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

// daily quest投稿用API
export const POST = async (req: Request, res: NextResponse) => {
  try {
    const { title, description, day, userId } = await req.json();

    await main();
    const dailyQuest = await prisma.dailyQuest.create({
      data: {
        title,
        description,
        day,
        userId,
      },
    });
    return NextResponse.json(
      { message: "Success", dailyQuest },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
