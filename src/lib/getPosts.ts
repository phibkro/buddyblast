import { db } from "@/lib/firebase";
import { collection, getDocs } from "@firebase/firestore";
export async function getPosts() {
  const postsCollection = collection(db, "posts");
  const querySnapshot = await getDocs(postsCollection);

  const posts = querySnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
  console.log("posts:");
  console.log(posts);
  return posts;
}
