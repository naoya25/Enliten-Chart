import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient() as any;
export async function main() {
  try {
    await prisma.$connect();
  } catch (error) {
    return Error("DB接続に失敗しました");
  }
}
