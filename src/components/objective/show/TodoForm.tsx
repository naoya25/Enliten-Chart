import React, { useState } from "react";

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

const TodoForm = ({ objectiveId }: { objectiveId: string }) => {
  const [description, setDescription] = useState<string>("");
  const [deadline, setDeadline] = useState<string>(() => {
    const now = new Date();
    const month = `${now.getMonth() + 1}`.padStart(2, "0");
    const day = `${now.getDate()}`.padStart(2, "0");
    return `${now.getFullYear()}-${month}-${day}T${now
      .toTimeString()
      .slice(0, 5)}`;
  });

  const handleSubmitTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    await postTodo({
      description,
      deadline: new Date(deadline),
      objectiveId: parseInt(objectiveId),
    });
  };

  return (
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
  );
};

export default TodoForm;
