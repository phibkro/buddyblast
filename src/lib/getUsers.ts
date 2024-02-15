import { db } from "@/lib/firebase";
import { collection, getDocs, query } from "@firebase/firestore";

export async function getUsers(){

    const q = query(collection(db, "users"));
    const querySnapshot = await getDocs(q);

    const users = querySnapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data() };
    });
    return users;
  }