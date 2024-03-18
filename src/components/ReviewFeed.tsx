import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface Review {
  id: string;
  reviewerName: string;
  description: string;
  reviewRating: number;
}

// Props for ReviewList component
interface ReviewListProps {
  reviews: Review[];
}

// Custom component to display stars based on rating
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div>
      {"★★★★★".substring(0, rating)}
      {"☆☆☆☆☆".substring(0, 5 - rating)}
    </div>
  );
};

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  return (
    <ul className="space-y-4">
      {reviews.map((review) => (
        <li key={review.id} className="list-none">
          <Card className="flex flex-col rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <CardHeader>
              <CardTitle>{review.reviewerName}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{review.description}</CardDescription>
              <StarRating rating={review.reviewRating} />
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  );
};

export default ReviewList;
