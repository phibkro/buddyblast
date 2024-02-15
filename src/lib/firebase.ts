import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

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
const db = getFirestore(app);

export { auth, db };
