"use client";
import { UserType } from "@/type/supabaseUser";
import { supabase } from "@/utils/supabase";
import React, { useEffect, useState } from "react";

const postObjective = async ({
  title,
  description,
  deadline,
  userId,
}: {
  title: string;
  description: string;
  deadline: Date;
  userId: string;
}) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}api/objectives/`,
    {
      method: "POST",
      body: JSON.stringify({ title, description, deadline, userId }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return (await res).json();
};

// 目標投稿ページ
const AddObjective = () => {
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
  const [currentUser, setCurrentUser] = useState<UserType>({
    id: "",
    name: "",
    email: "",
    icon: "",
  });

  useEffect(() => {
    const getCurrentUser = async () => {
      const { data } = await supabase.auth.getSession();
      console.log(data);

      if (data.session !== null) {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        console.log(user);
        setCurrentUser({
          id: user?.id || "",
          name: user?.user_metadata.name || "",
          email: user?.email || "",
          icon: user?.user_metadata.icon || "",
        });
      }
    };
    getCurrentUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await postObjective({
      title,
      description,
      deadline: new Date(deadline),
      userId: currentUser.id,
    });
  };

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
          <input type="submit" value="submit" />
        </p>
      </form>
    </div>
  );
};

export default AddObjective;
