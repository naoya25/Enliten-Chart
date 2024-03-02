export type QuestType = {
  id: number;
  title: string;
  description: string;
  day: Date;
  isAchievement: boolean;
  achievementDay: Date;
  userId: string;
  createdAt: Date;
  dailyreviews: [];
};
