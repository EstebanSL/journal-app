import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'

const firebaseConfig = {
  apiKey: "AIzaSyC8EqQM5-8tLWudHtF4gTY1zYVdP-EzmHU",
  authDomain: "journal-app-95def.firebaseapp.com",
  projectId: "journal-app-95def",
  storageBucket: "journal-app-95def.appspot.com",
  messagingSenderId: "132837185029",
  appId: "1:132837185029:web:75c4a3c0e697ece20e6e6c"
};

export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);