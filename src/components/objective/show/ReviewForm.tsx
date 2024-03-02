import React, { useState } from "react";

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

const ReviewForm = ({ objectiveId }: { objectiveId: string }) => {
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
      objectiveId: parseInt(objectiveId),
    });
  };

  return (
    <form onSubmit={handleSubmitReview} className="m-5 border border-gray-500">
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
  );
};

export default ReviewForm;
