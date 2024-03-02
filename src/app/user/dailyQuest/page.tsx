import { QuestType } from "@/type/dailyQuest";

// 今日の目標
const DailyQuest = async () => {
  return (
    <div>
      <p>ログインしているユーザーのみ取得したい</p>
      <p>今日のTodoと今日のdaily questのみを表示したい</p>

      <p>
        <a href="/user/dailyQuest/add">一覧&追加</a>
      </p>
    </div>
  );
};

export default DailyQuest;
