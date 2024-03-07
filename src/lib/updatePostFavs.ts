import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function updatePostFav(
  docID: string,
  userId: string,
  category: string,
  postTitle: string,
  postDescription: string,
  rules: string[],
  creationDate: Date,
  reportCount: number,
  favorites: string[],
) {
  const docref = doc(db, "posts", docID);
  try {
    await setDoc(docref, {
      userId: userId,
      category: category,
      postTitle: postTitle,
      postDescription: postDescription,
      rules: rules,
      creationDate: creationDate,
      reportCount: reportCount,
      favorites: favorites,
    });
    console.log("Document successfully updated!");
  } catch (e) {
    console.error("Error updating document: ", e);
  }
}
