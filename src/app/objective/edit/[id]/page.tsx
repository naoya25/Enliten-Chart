"use client";
import React, { useEffect, useState } from "react";

const updateObjective = async ({
  id,
  title,
  description,
  deadline,
}: {
  id: string;
  title: string;
  description: string;
  deadline: Date;
}) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}api/objectives/${id}`,
    {
      method: "PUT",
      body: JSON.stringify({ title, description, deadline }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return (await res).json();
};

const getObjectiveById = async (id: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}api/objectives/${id}`
  );
  const data = await res.json();
  return data.objective;
};

const deleteObjective = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}api/objectives/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return (await res).json();
};

// 目標編集ページ
const EditObjective = ({ params }: { params: { id: string } }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [deadline, setDeadline] = useState<string>(() => {
    const now = new Date();
    const month = `${now.getMonth() + 1}`.padStart(2, "0");
    const day = `${now.getDate()}`.padStart(2, "0");
    return `${now.getFullYear()}-${month}-${day}T${now
      .toTimeString()
      .slice(0, 5)}`;
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateObjective({
      id: params.id,
      title,
      description,
      deadline: new Date(deadline),
    });
  };

  const handleDelete = async () => {
    await deleteObjective(params.id);
  };

  useEffect(() => {
    getObjectiveById(parseInt(params.id))
      .then((data) => {
        setTitle(data.title);
        setDescription(data.description);
        setDeadline(() => {
          const now = new Date(data.deadline);
          const month = `${now.getMonth() + 1}`.padStart(2, "0");
          const day = `${now.getDate()}`.padStart(2, "0");
          return `${now.getFullYear()}-${month}-${day}T${now
            .toTimeString()
            .slice(0, 5)}`;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="title">title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </p>
        <p>
          <label htmlFor="description">description</label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </p>
        <p>
          <label htmlFor="deadline">deadline</label>
          <input
            id="deadline"
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </p>
        <p>
          <input type="submit" value="edit" />
        </p>
      </form>
      <p>
        <button onClick={handleDelete}>delete</button>
      </p>
    </div>
  );
};

export default EditObjective;
