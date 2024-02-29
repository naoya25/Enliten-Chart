"use client";
import Loading from "@/components/Loading";
import { ObjectiveType } from "@/type/objective";
import { ReviewType } from "@/type/review";
import { TodoType } from "@/type/todo";
import { useState, useEffect } from "react";

const getObjective = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}api/objectives/${id}`,
    {
      cache: "no-store", // ssr
    }
  );
  const data = await res.json();
  console.log(data);
  return data.objective;
};

const postTodo = async ({
  description,
  deadline,
  objectiveId,
}: {
  description: string;
  deadline: Date;
  objectiveId: number;
}) => {
  console.log({ description, deadline, objectiveId });
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/todos/`, {
    method: "POST",
    body: JSON.stringify({ description, deadline, objectiveId }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await res.json();
};

const postReview = async ({
  good,
  more,
  challenge,
  day,
  objectiveId,
}: {
  good: string;
  more: string;
  challenge: string;
  day: Date;
  objectiveId: number;
}) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/reviews/`, {
    method: "POST",
    body: JSON.stringify({ good, more, challenge, day, objectiveId }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await res.json();
};

// 目標詳細ページ
const ObjectiveInfo = ({ params }: { params: { id: string } }) => {
  const [objective, setObjective] = useState<ObjectiveType | null>(null);
  const [description, setDescription] = useState<string>("");
  const [deadline, setDeadline] = useState<string>(() => {
    const now = new Date();
    const month = `${now.getMonth() + 1}`.padStart(2, "0");
    const day = `${now.getDate()}`.padStart(2, "0");
    return `${now.getFullYear()}-${month}-${day}T${now
      .toTimeString()
      .slice(0, 5)}`;
  });

  useEffect(() => {
    const getObjectiveWithTodo = async () => {
      const objectiveData = await getObjective(params.id);
      setObjective(objectiveData);
    };
    getObjectiveWithTodo();
  }, [params.id]);

  const handleSubmitTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    await postTodo({
      description,
      deadline: new Date(deadline),
      objectiveId: parseInt(params.id),
    });
  };

  const [good, setGood] = useState<string>("");
  const [more, setMore] = useState<string>("");
  const [challenge, setChallenge] = useState<string>("");
  const [day, setDay] = useState<string>(() => {
    const now = new Date();
    const month = `${now.getMonth() + 1}`.padStart(2, "0");
    const day = `${now.getDate()}`.padStart(2, "0");
    return `${now.getFullYear()}-${month}-${day}T${now
      .toTimeString()
      .slice(0, 5)}`;
  });

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    await postReview({
      good,
      more,
      challenge,
      day: new Date(day),
      objectiveId: parseInt(params.id),
    });
  };

  if (!objective) return <Loading />;

  return (
    <div>
      <div className="card border border-gray-200 m-5">
        <p>title: {objective.title}</p>
        <p>description: {objective.description}</p>
        <p>deadline: {new Date(objective.deadline).toDateString()}</p>
        <p>userId: {objective.userId}</p>
        <a href={`/objective/edit/${objective.id}`}>編集する</a>
      </div>

      <p className="text-[2em]">Todo一覧</p>
      <form onSubmit={handleSubmitTodo} className="m-5 border border-gray-500">
        <p>
          <label htmlFor="description">description</label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <label htmlFor="deadline">deadline</label>
          <input
            id="deadline"
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
          <input type="submit" value="追加" />
        </p>
      </form>

      {objective.todos.map((todo: TodoType) => (
        <div key={todo.id} className="m-5">
          <p>{todo.description}</p>
          <p>{new Date(todo.deadline).toDateString()}</p>
          <p>{new Date(todo.createdAt).toDateString()}</p>
        </div>
      ))}

      <p className="text-[2em]">振り返り一覧</p>
      <form
        onSubmit={handleSubmitReview}
        className="m-5 border border-gray-500"
      >
        <p>
          <label htmlFor="day">day</label>
          <input
            id="day"
            type="datetime-local"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          />
          <label htmlFor="good">good</label>
          <input
            id="good"
            type="text"
            value={good}
            onChange={(e) => setGood(e.target.value)}
            required
          />
          <label htmlFor="more">more</label>
          <input
            id="more"
            type="text"
            value={more}
            onChange={(e) => setMore(e.target.value)}
            required
          />
          <label htmlFor="challenge">challenge</label>
          <input
            id="challenge"
            type="text"
            value={challenge}
            onChange={(e) => setChallenge(e.target.value)}
            required
          />
          <input type="submit" value="追加" />
        </p>
      </form>

      {objective.reviews.map((review: ReviewType) => (
        <div key={review.id} className="m-5">
          <p>{review.good}</p>
          <p>{review.more}</p>
          <p>{review.challenge}</p>
          <p>{new Date(review.day).toDateString()}</p>
          <p>{new Date(review.createdAt).toDateString()}</p>
        </div>
      ))}
    </div>
  );
};

export default ObjectiveInfo;
