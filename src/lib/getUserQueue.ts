import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function getUserQueue(userId: string) {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data().queue;
  } else {
    return null;
  }
}
