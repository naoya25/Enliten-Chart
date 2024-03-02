"use client";
import Loading from "@/components/Loading";

import React, { useState, useEffect } from "react";
import { QuestType } from "@/type/dailyQuest";
import { DailyReviewType } from "@/type/dailyReview";

// dailyquest詳細ページ
const DailyQuestInfo = ({ params }: { params: { id: string } }) => {
  const [quest, setQuest] = useState<QuestType | null>(null);

  const [good, setGood] = useState<string>("");
  const [more, setMore] = useState<string>("");
  const [challenge, setChallenge] = useState<string>("");
  const [level, setLevel] = useState<number>(5);
  const [qol, setQol] = useState<number>(5);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      good,
      more,
      challenge,
      level,
      qol,
      dailyQuestId: params.id,
    });
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/dailyReviews/`,
      {
        method: "POST",
        body: JSON.stringify({
          good,
          more,
          challenge,
          level,
          qol,
          dailyQuestId: parseInt(params.id),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return await res.json();
  };

  useEffect(() => {
    const fetchDailyQuestWithReview = async (id: number) => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}api/dailyQuests/${id}`,
          {
            cache: "no-store", // ssr
          }
        );
        if (!res.ok) {
          throw new Error("Network response was not ok.");
        }
        const data = await res.json();
        setQuest(data.dailyQuest);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDailyQuestWithReview(parseInt(params.id));
  }, [params.id]);

  if (!quest) return <Loading />;

  return (
    <div>
      <div className="border m-5">
        <p>{quest.id}</p>
        <p>{quest.title}</p>
        <p>{quest.description}</p>
        <p>{new Date(quest.day).toDateString()}</p>
        <p>{quest.isAchievement ? "True" : "False"}</p>
        <p>{new Date(quest.achievementDay).toDateString()}</p>
      </div>
      <p className="m-5">Reviews</p>

      <form
        onSubmit={handleSubmitReview}
        className="m-5 border border-gray-500"
      >
        <p>
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
          <label htmlFor="level">level</label>
          <input
            id="level"
            type="number"
            value={level}
            onChange={(e) => setLevel(parseInt(e.target.value))}
            required
          />
          <label htmlFor="qol">qol</label>
          <input
            id="qol"
            type="number"
            value={qol}
            onChange={(e) => setQol(parseInt(e.target.value))}
            required
          />
          <input type="submit" value="追加" />
        </p>
      </form>

      {quest.dailyreviews.map((review: DailyReviewType) => (
        <div key={review.id} className="m-5 border">
          <p>{review.good}</p>
          <p>{review.more}</p>
          <p>{review.challenge}</p>
          <p>{review.level}</p>
          <p>{review.qol}</p>
        </div>
      ))}
    </div>
  );
};

export default DailyQuestInfo;
