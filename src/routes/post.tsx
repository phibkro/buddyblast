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
    <div>
      <div className="ml-5 flex justify-between">
        <SinglePost entry={post} />
      </div>
      <div>
        <Timer startTime={post.defaultTime} isPLaying={false} />
      </div>
    </div>
  );
}
