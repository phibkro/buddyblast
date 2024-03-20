import { useText } from "@/hooks/useText";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import RatingForm from "./ratingForm";
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
  postId,
}: {
  data: { reviews: { [username: string]: Review } };
  postId: string;
}) {
  // Use useText hook inside the component to get the current username.
  const [name] = useText("name");
  // Define the state to track the review being edited.
  const [editingUsername, setEditingUsername] = useState<string | null>(null);

  return (
    <ul className="grid gap-5 lg:grid-cols-2">
      {Object.entries(data.reviews || {}).map(([username, review]) => {
        const isEditing = editingUsername === username;
        const canEdit = username === name;

        return (
          <Card
            key={username}
            className="rounded-lg border-2 border-sky-300 bg-sky-100 p-4 shadow-md"
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
              {canEdit && (
                <button
                  className="mt-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                  onClick={() =>
                    setEditingUsername(isEditing ? null : username)
                  }
                >
                  {isEditing ? "Cancel Edit" : "Edit Review"}
                </button>
              )}
              {isEditing && (
                <div className="mt-4">
                  <RatingForm docID={postId} />
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </ul>
  );
}

export default RatingFeed;
