import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCnKyFeQoBtB7yWjXTdNVKKMgUkRXTHNgk",
  authDomain: "finprime-7c654.firebaseapp.com",
  projectId: "finprime-7c654",
  storageBucket: "finprime-7c654.firebasestorage.app",
  messagingSenderId: "1090783284450",
  appId: "1:1090783284450:web:e0def0c548b28cd00422bb",
  measurementId: "G-XJVBDWE661"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
