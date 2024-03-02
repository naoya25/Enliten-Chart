"use client";
import Loading from "@/components/Loading";
import ObjectiveDetail from "@/components/objective/show/ObjectiveDetail";
import TodoForm from "@/components/objective/show/TodoForm";
import ReviewForm from "@/components/objective/show/ReviewForm";
import ReviewList from "@/components/objective/show/ReviewList";
import TodoList from "@/components/objective/show/TodoList";
import { ObjectiveType } from "@/type/objective";
import React, { useState, useEffect } from "react";

export const getObjective = async (id: number) => {
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

// 目標詳細ページ
const ObjectiveInfo = ({ params }: { params: { id: string } }) => {
  const [objective, setObjective] = useState<ObjectiveType | null>(null);

  useEffect(() => {
    const getObjectiveWithTodo = async () => {
      const objectiveData = await getObjective(parseInt(params.id));
      setObjective(objectiveData);
    };
    getObjectiveWithTodo();
  }, [params.id]);

  if (!objective) return <Loading />;

  return (
    <div>
      <ObjectiveDetail objective={objective} />
      <p className="text-[2em]">Todo一覧</p>
      <TodoForm objectiveId={params.id} />
      <TodoList objective={objective} />

      <p className="text-[2em]">振り返り一覧</p>
      <ReviewForm objectiveId={params.id} />
      <ReviewList reviews={objective.reviews} />
    </div>
  );
};

export default ObjectiveInfo;
