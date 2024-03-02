// ObjectiveDetail.tsx

import { ObjectiveType } from "@/type/objective";
import React from "react";

const ObjectiveDetail = ({ objective }: { objective: ObjectiveType }) => {
  return (
    <div className="card border border-gray-200 m-5">
      <p>title: {objective.title}</p>
      <p>description: {objective.description}</p>
      <p>deadline: {new Date(objective.deadline).toDateString()}</p>
      <p>userId: {objective.userId}</p>
      <a href={`/objective/edit/${objective.id}`}>編集する</a>
      <p>todoの消化率から達成率を表示</p>
    </div>
  );
};

export default ObjectiveDetail;
