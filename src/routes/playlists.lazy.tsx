import PostsFeed from "@/components/PostsFeed";
import { useText } from "@/hooks/useText";
import { getPost } from "@/lib/getPosts";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getUserQueue } from "../lib/getUserQueue";

export const Route = createLazyFileRoute("/playlists")({
  component: Playlist,
});

function Playlist() {
  const [posts, setPosts] = useState<any[] | undefined>(undefined);
  const [queue, setQueue] = useState<string[] | null>(null);
  const [name] = useText("name");
  useEffect(() => {
    if (name) {
      getUserQueue(name).then((q) => setQueue(q));
    }
  }, [name]);

  useEffect(() => {
    console.log(queue);
    if (queue) {
      Promise.all(queue.map((p) => getPost(p))).then((fetchedPosts) => {
        setPosts(fetchedPosts.filter(Boolean));
      });
    }
  }, [queue]);

  if (!posts) {
    return <div>No posts available</div>;
  } else {
    return <PostsFeed data={posts} />;
  }
}
