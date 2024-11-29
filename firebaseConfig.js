import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  updateDoc,
  deleteDoc 
} from "firebase/firestore";

/
const firebaseConfig = {
  apiKey: "AIzaSyDPQ_fd2DaUjau5ZPWWi9JXt784ddQgdBE",
  authDomain: "carsale-a13bb.firebaseapp.com",
  projectId: "carsale-a13bb",
  storageBucket: "carsale-a13bb.appspot.com",
  messagingSenderId: "643123532744",
  appId: "1:643123532744:web:d0502ba5c2157d7735a6fd",
};


const app = initializeApp(firebaseConfig);


const auth = getAuth(app); 
const database = getDatabase(app); 
const db = getFirestore(app); 


export { 
  app, 
  auth, 
  database, 
  db, 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  addDoc, 
  query, 
  where, 
  updateDoc,
  getDocs, 
  deleteDoc 
};

