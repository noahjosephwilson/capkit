import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCm43iBJN6bW5HvXti4bln8hdBUe7iFGoU",
  authDomain: "orbat-4fd65.firebaseapp.com",
  projectId: "orbat-4fd65",
  storageBucket: "orbat-4fd65.firebasestorage.app",
  messagingSenderId: "598538936700",
  appId: "1:598538936700:web:f6c33f3f45f5490b3684f9",
  measurementId: "G-YQPVHGEG9D"
};
  
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);