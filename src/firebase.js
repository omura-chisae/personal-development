import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseconfig = {
  apiKey: "AIzaSyBurm7rQnfx1PGa6_6zdWxvcaSxZGXfAE8",
  authDomain: "personaldevelopment-e6345.firebaseapp.com",
  projectId: "personaldevelopment-e6345",
  storageBucket: "personaldevelopment-e6345.appspot.com",
  messagingSenderId: "354543457491",
  appId: "1:354543457491:web:0bf362b398f1033c187026",
};

const app = initializeApp(firebaseconfig);
const db = getFirestore(app);

export default db;
