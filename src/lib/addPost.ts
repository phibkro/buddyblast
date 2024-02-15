import { db } from "@/lib/firebase";
import { doc, setDoc } from "@firebase/firestore";

export function addPost(
    postId: number,
    userId: string,
    categories: string[],
    postTitle: string,
    postDescription: string,
    rules: string[],
    creationDate: Date,
    reportCount: number,
  ) {
    setDoc(doc(db, "posts", postId.toString()), {
      userId: userId,
      categories: categories,
      postTitle: postTitle,
      postDescription: postDescription,
      rules: rules,
      creationDate: creationDate,
      reportCount: reportCount,
    });
  }
