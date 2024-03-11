import PostsFeed from "@/components/PostsFeed";
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
    <div>
      {" "}
      <div className="ml-5 flex justify-between">
        {/* TODO make cusom component to display post/timer/rating and whatever*/}
        <PostsFeed data={[post]} />
      </div>
      <div>
        <Timer startTime={60} isPLaying={false} />
      </div>
    </div>
  );
}
