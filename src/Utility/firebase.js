import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import 'firebase/compat/firestore'
import "firebase/compat/auth"
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

export const auth=getAuth(app)
export const db=app.firestore()
