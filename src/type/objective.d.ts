export type ObjectiveType = {
  id: number;
  title: string;
  description: string;
  deadline: Date;
  isAchievement: boolean;
  achievementDay: Date;
  userId: string;
  createdAt: Date;
  todos: [];
  reviews: [];
};
