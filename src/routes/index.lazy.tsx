import { db } from "@/lib/firebase";
import { getPosts } from "@/lib/getPosts";
import { createLazyFileRoute } from "@tanstack/react-router";
import { getUsers } from "../lib/getUsers";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  console.log(db);
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>

      <button
        onClick={() => {
          console.log("here are all users: " + getUsers());
        }}
      >
        Alle brukere
      </button>

      <p></p>

      <button
        onClick={() => {
          console.log("here are all posts: " + getPosts());
        }}
      >
        Alle posts
      </button>
    </div>
  );
}
