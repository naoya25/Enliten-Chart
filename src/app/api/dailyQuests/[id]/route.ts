import { NextResponse } from "next/server";
import { main, prisma } from "../../route";

// 詳細daily quest取得
export const GET = async (req: Request, res: NextResponse) => {
  try {
    const id: number = parseInt(req.url.split("/dailyQuests/")[1]);
    await main();
    const dailyQuest = await prisma.dailyQuest.findUnique({
      where: { id },
      include: {
        dailyreviews: true,
      },
    });
    return NextResponse.json(
      { message: "Success", dailyQuest },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

// dailyQuestのisAchievement更新用
export const PUT = async (req: Request, res: NextResponse) => {
  try {
    const id: number = parseInt(req.url.split("/dailyQuests/")[1]);
    const { isAchievement } = await req.json();

    await main();
    const dailyQuest = await prisma.dailyQuest.update({
      data: { isAchievement, achievementDay: new Date() },
      where: { id },
    });
    return NextResponse.json(
      { message: "Success", dailyQuest },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

// ここから下まだ編集してないよ〜
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
