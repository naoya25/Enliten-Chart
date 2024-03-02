/*
  Warnings:

  - Added the required column `level` to the `DailyReview` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qol` to the `DailyReview` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Profiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DailyReview" ADD COLUMN     "level" INTEGER NOT NULL,
ADD COLUMN     "qol" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Profiles" ADD COLUMN     "userId" TEXT NOT NULL;
