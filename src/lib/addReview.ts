import { db } from "@/lib/firebase";
import { arrayUnion, doc, setDoc, updateDoc } from "@firebase/firestore";

export async function addReview(
  docId: string,
  username: string,
  reviewDescription: string,
  reviewRating: number,
) {
  const postDocRef = doc(db, "posts", docId);

  try {
    await updateDoc(postDocRef, {
      [`reviews.${username}`]: {
        reviewDescription: reviewDescription,
        reviewRating: reviewRating,
      },
    });

    await setDoc(
      doc(db, "users", username),
      {
        writtenReviews: arrayUnion(docId),
      },
      { merge: true },
    );

    console.log("New field added to the document!");
  } catch (e) {
    console.error("Error adding field to the document: ", e);
  }
}
