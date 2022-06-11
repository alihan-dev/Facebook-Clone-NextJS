import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAvwD36NihNmFPSCyRCvvUkH3mTvsL2SPc",
  authDomain: "facebook-clone-9836b.firebaseapp.com",
  projectId: "facebook-clone-9836b",
  storageBucket: "facebook-clone-9836b.appspot.com",
  messagingSenderId: "486163302226",
  appId: "1:486163302226:web:a05af97aada6256b165c8b",
  measurementId: "G-HHXQHNTMNJ"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { db, storage}