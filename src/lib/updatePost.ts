import { db } from "@/lib/firebase";
import { doc, increment, updateDoc } from "@firebase/firestore";

export async function incrementPostReportCount(postId: string, name: string) {
  const post = doc(db, "posts", postId);

  let incCount = 0;
  if (name == "admin") {
    incCount = 3;
  } else {
    incCount = 1;
  }
  try {
    await updateDoc(post, {
      reportCount: increment(incCount),
    });
    console.log("Document successfully written!");
  } catch (e) {
    console.error("Error updating document: ", e);
  }
}
