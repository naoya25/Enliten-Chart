import { NextResponse } from "next/server";
import { main, prisma } from "../objectives/route";

// 全profile取得用API
export const GET = async (req: Request, res: NextResponse) => {
  try {
    await main();
    const profiles = await prisma.profile.findMany();
    return NextResponse.json({ message: "Success", profiles }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
