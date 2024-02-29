import { NextResponse } from "next/server";
import { main, prisma } from "../objectives/route";

// 全review取得用API
export const GET = async (req: Request, res: NextResponse) => {
  try {
    await main();
    const reviews = await prisma.review.findMany();
    return NextResponse.json({ message: "Success", reviews }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

// review投稿用API
export const POST = async (req: Request, res: NextResponse) => {
  try {
    const { good, more, challenge, day, objectiveId } = await req.json();

    await main();
    const review = await prisma.review.create({
      data: {
        good,
        more,
        challenge,
        day,
        objectiveId,
      },
    });
    return NextResponse.json({ message: "Success", review }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
