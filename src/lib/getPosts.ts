import { db } from "@/lib/firebase";
import { collection, getDocs } from "@firebase/firestore";
export async function getPosts() {
    // henter alle brukere der glasses er lik yes - kan byttes til kategori senere

    // const q = query(
    //     collection(db, "posts"),
    //     where("postTitle", "==", "test post"),
    // );
    const postsCollection = collection(db, "posts");
    const querySnapshot = await getDocs(postsCollection);

    const posts = querySnapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data() };
    });

    return posts;
}
