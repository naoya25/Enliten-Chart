/*
  Warnings:

  - You are about to drop the column `try` on the `DailyReview` table. All the data in the column will be lost.
  - Added the required column `challenge` to the `DailyReview` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DailyReview" DROP COLUMN "try",
ADD COLUMN     "challenge" TEXT NOT NULL;
