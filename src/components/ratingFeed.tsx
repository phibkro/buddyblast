import { cn } from "@/lib/utils";
import React from "react";
import { Card, CardContent, CardDescription, CardHeader } from "./ui/card";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement> & {
    children?: React.ReactNode;
  }
>(({ children, className, ...props }, ref) => {
  return (
    <h3
      ref={ref}
      className={cn(
        "flex items-center justify-between text-2xl font-semibold leading-none tracking-tight",
        className,
      )}
      {...props}
    >
      <span className="flex items-center">{children}</span>
    </h3>
  );
});
CardTitle.displayName = "CardTitle";

interface Review {
  reviewDescription?: string;
  reviewRating?: number;
}

function RatingFeed({
  data,
}: {
  data: { reviews: { [username: string]: Review } };
}) {
  return (
    <ul className="grid gap-5 lg:grid-cols-2">
      {Object.entries(data.reviews || {}).map(([username, review]) => {
        console.log(data.reviews);
        return (
          <Card
            key={username}
            className=" rounded-lg border-2 border-sky-300 bg-sky-100 p-4 shadow-md"
          >
            <CardHeader>
              <CardTitle>{username}</CardTitle>
              <CardDescription className="text-base text-black">
          {review.reviewDescription}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div>
          {Array.from({ length: 5 }).map((_, index) => (
            <span
              key={index}
              className={`${
                index < review.reviewRating
            ? "text-yellow-400"
            : "text-gray-400"
              }`}
            >
              ★
            </span>
          ))}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </ul>
  );
}

export default RatingFeed;
