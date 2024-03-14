import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  collection,
  connectFirestoreEmulator,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { testSetup } from "./testSetup";
const firebaseConfig = {
  apiKey: "AIzaSyCzOyfr9UFPCXGosJBL6OFUiS30mpgY7tE",
  authDomain: "buddyblast-da7ce.firebaseapp.com",
  projectId: "buddyblast-da7ce",
  storageBucket: "buddyblast-da7ce.appspot.com",
  messagingSenderId: "489386304884",
  appId: "1:489386304884:web:d2448db6ee1409d5d2b821",
  measurementId: "G-92NP9NGZ85",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const localTestingFlag = 0; // Set this to 1 if you want to test locally

const db = localTestingFlag ? getLocalFirestore() : getFirestore(app);

function getLocalFirestore() {
  const db = getFirestore();
  connectFirestoreEmulator(db, "localhost", 8080);
  console.log("Local Firestore setup complete");
  return db;
}

const postsCollection = collection(db, "posts");
const querySnapshot = await getDocs(postsCollection);

if (querySnapshot.size === 0 && localTestingFlag) {
  testSetup();
}
export { auth, db };
