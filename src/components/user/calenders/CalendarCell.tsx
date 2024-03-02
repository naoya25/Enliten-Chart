"use client";
import React, { useState } from "react";
import { UserType } from "@/type/supabaseUser";
import { QuestType } from "@/type/dailyQuest";
import { format } from "date-fns";

const CalendarCell = ({
  quests,
  currentUser,
  date,
}: {
  quests: QuestType[];
  currentUser: UserType;
  date: Date;
}) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  // daily quest投稿
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    quests.push({
      title,
      description,
      day: date,
      userId: currentUser.id,
    } as QuestType);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/dailyQuests/`,
      {
        method: "POST",
        body: JSON.stringify({
          title,
          description,
          day: date,
          userId: currentUser.id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log((await res).json());
    setTitle("");
    setDescription("");
  };

  // daily quest完了処理
  const handleAchievement = async (id: number) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/dailyQuests/${id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          isAchievement: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log((await res).json());
  };

  return (
    <>
      {quests.find(
        (quest) =>
          new Date(quest.day).toDateString() == new Date(date).toDateString()
      ) ? (
        <div className="w-[120px] break-words">
          {quests
            .filter(
              (quest) =>
                new Date(quest.day).toDateString() ==
                new Date(date).toDateString()
            )
            .map((quest: QuestType) => (
              <>
                <div className="border-b flex justify-between items-end">
                  <p>{quest.title}</p>
                  {quest.isAchievement ? (
                    <p className="text-[0.7em] bg-blue-300 p-1 rounded-sm">done</p>
                  ) : (
                    <p className="text-[0.7em] bg-red-300 p-1 rounded-sm">yet</p>
                  )}
                </div>
                <p>{quest.description}</p>
                <p>
                  {quest.isAchievement ? (
                    <p className="text-[0.7em]">
                      {format(quest.achievementDay, "M/d aaaaa'm' hh:mm:ss")}
                    </p>
                  ) : (
                    <p className="text-[0.7em]">
                      <button onClick={() => handleAchievement(quest.id)}>
                        click done!
                      </button>
                    </p>
                  )}
                </p>
                <p className="text-[0.7em]">
                  <a href={`/user/dailyQuest/${quest.id}`}>詳細</a>
                </p>
              </>
            ))}
        </div>
      ) : (
        <div className="w-[120px] break-words">
          <form onSubmit={handleSubmit}>
            <p>
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border w-[90%]"
                placeholder="目標立てろ"
              />
            </p>
            <p>
              <textarea
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border w-[90%]"
                placeholder="具体性が大事やで"
              />
            </p>
            <p>
              <input type="submit" value={"追加"} className="text-[0.7em]" />
            </p>
          </form>
        </div>
      )}
    </>
  );
};

export default CalendarCell;
