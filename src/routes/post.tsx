import RatingForm from "@/components/ratingForm";
import SinglePost from "@/components/singlePost";
import { Timer } from "@/components/timer";
import { getPost } from "@/lib/getPosts";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";

const postSchema = z.object({
  post: z.string(),
});

export const Route = createFileRoute("/post")({
  validateSearch: postSchema,
  component: Post,
});

export function Post() {
  const postID = Route.useSearch().post;
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      const fetchedPost = await getPost(postID);
      fetchedPost ? setPost(fetchedPost) : setPost(null);
    }

    fetchPost();
  }, [postID]);

  if (!post) {
    return null; // or a loading spinner
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-8 p-24">
      <div className="flex items-center justify-center space-x-20">
        {/* SinglePost and Timer side by side */}
        <SinglePost entry={post} id={postID} />
        <div>
          <h1 className="pb-4 text-lg font-bold">COUNTDOWN</h1>
          <Timer startTime={post.defaultTime} isPlaying={false} />
        </div>
      </div>
      <h1 className="text-lg font-bold">RATE THIS POST</h1>
      <div className="w-full">
        <RatingForm docID={postID} />
      </div>
    </div>
  );
}
