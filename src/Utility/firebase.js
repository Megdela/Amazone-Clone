import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import {
  getFirestore,
  collection,
  doc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDGxSJ5osN7jxogJ2fjpn6Y0et_fkseq4",
  authDomain: "clone-a42db.firebaseapp.com",
  projectId: "clone-a42db",
  storageBucket: "clone-a42db.firebasestorage.app",
  messagingSenderId: "1029801878",
  appId: "1:1029801878:web:db23c6ddde0e4a9b477fb7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app); // Use getFirestore to initialize Firestore

export { collection, doc, query, orderBy, onSnapshot };