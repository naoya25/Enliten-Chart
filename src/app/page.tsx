export default function Home() {
  return (
    <main className="min-h-screen p-24">
      <p>Enlighten Chart</p>
      <p>
        <a href="/objective/add" className="m-3">
          目標を設定する
        </a>
      </p>
      <p>
        <a href="/objective" className="m-3">
          目標一覧ページ
        </a>
      </p>
      <p>
        <a href="/user/dailyQuest" className="m-3">
          Daily Quest
        </a>
      </p>
    </main>
  );
}
