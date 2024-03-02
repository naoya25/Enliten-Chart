-- DropForeignKey
ALTER TABLE "DailyReview" DROP CONSTRAINT "DailyReview_dailyQuestId_fkey";

-- AddForeignKey
ALTER TABLE "DailyReview" ADD CONSTRAINT "DailyReview_dailyQuestId_fkey" FOREIGN KEY ("dailyQuestId") REFERENCES "DailyQuest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
