import { ReviewType } from "@/type/review";
import React from "react";

const ReviewList = ({ reviews }: { reviews: ReviewType[] }) => {
  return (
    <div>
      {reviews.map((review: ReviewType) => (
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

export default ReviewList;
