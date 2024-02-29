import { ObjectiveType } from "@/type/objective";

async function fetchAllObjective() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}api/objectives/`,
    {
      cache: "no-store", // ssr
    }
  );
  const data = await res.json();
  console.log(`${process.env.NEXT_PUBLIC_BASE_URL}api/objectives`);
  console.log(data);
  return data.objectives;
}

// 目標一覧ページ
// ログインしているユーザーの目標のみ取得したい（まだやってない、APIで取得する）
const ObjectivesIndex = async () => {
  const objectives = await fetchAllObjective();
  return (
    <div>
      {objectives &&
        objectives.map((objective: ObjectiveType) => (
          <div key={objective.id} className="border border-gray-200 m-5 p-5">
            <p>title: {objective.title}</p>
            <p>description: {objective.description}</p>
            <p>deadline: {new Date(objective.deadline).toDateString()}</p>
            <p>userId: {objective.userId}</p>
            <a href={`/objective/edit/${objective.id}`}>編集する</a>
            <a href={`/objective/show/${objective.id}`}>詳細</a>
          </div>
        ))}
    </div>
  );
};

export default ObjectivesIndex;
