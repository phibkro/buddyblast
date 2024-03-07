import { db } from "@/lib/firebase";
import { doc, increment, updateDoc } from "@firebase/firestore";

export async function incrementPostReportCount(postId: string) {
  const post = doc(db, "posts", postId);
  try {
    await updateDoc(post, {
      reportCount: increment(1),
    });
    console.log("Document successfully written!");
  } catch (e) {
    console.error("Error updating document: ", e);
  }
}
