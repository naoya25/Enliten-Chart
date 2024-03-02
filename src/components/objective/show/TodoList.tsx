import { getObjective } from "@/app/objective/show/[id]/page";
import { ObjectiveType } from "@/type/objective";
import { TodoType } from "@/type/todo";
import React, { useEffect, useState } from "react";

const TodoList = ({ objective }: { objective: ObjectiveType }) => {
  const [currentObjective, setCurrentObjective] =
    useState<ObjectiveType>(objective);

  //todoが完了したとき
  const handleAchievement = async (id: number) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/todos/`, {
      cache: "no-store", // ssr
      method: "PUT",
      body: JSON.stringify({ todoId: id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      const objectiveData = await getObjective(currentObjective.id);
      setCurrentObjective(objectiveData);
    } else {
      console.error("Failed to update achievement status");
    }
    return await res.json();
  };

  return (
    <div>
      {currentObjective.todos.map((todo: TodoType) => (
        <div key={todo.id} className="m-5">
          <p>{todo.description}</p>
          <p>{new Date(todo.deadline).toDateString()}</p>
          <p>
            <input
              type="checkbox"
              checked={todo.isAchievement}
              onChange={() => handleAchievement(todo.id)}
            />
          </p>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
