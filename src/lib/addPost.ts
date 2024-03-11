import { db } from "@/lib/firebase";
import { addDoc, collection } from "@firebase/firestore";

export async function addPost(
  userId: string,
  category: string,
  postTitle: string,
  postDescription: string,
  rules: string[],
  creationDate: Date,
  reportCount: number,
  favorites: string[],
  defaultTime: number,
) {
  try {
    await addDoc(collection(db, "posts"), {
      userId: userId,
      category: category,
      postTitle: postTitle,
      postDescription: postDescription,
      rules: rules,
      creationDate: creationDate,
      reportCount: reportCount,
      favorites: favorites,
      defaultTime: defaultTime,
    });
    console.log("Document successfully written!");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
