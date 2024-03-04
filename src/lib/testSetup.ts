import { posts } from "../mock-data/posts.ts";
import { addPost } from "./addPost.ts";

export async function testSetup() {
  posts.forEach((post) => {
    addPost(
      post.userId,
      post.category,
      post.postTitle,
      post.postDescription,
      post.rules,
      post.creationDate,
      post.reportCount,
      post.favorites,
    );
  });
}
