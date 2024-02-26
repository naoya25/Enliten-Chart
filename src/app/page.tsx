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

export default async function Home() {
  const objectives = await fetchAllObjective();

  return (
    <main className="min-h-screen p-24">
      <p>Enlighten Chart</p>
      {objectives &&
        objectives.map((objective: ObjectiveType) => (
          <div>
            <p>{objective.id}</p>
            <p>{objective.title}</p>
          </div>
        ))}
    </main>
  );
}
