// firebase.js

import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// Firebase config (Replace with your Firebase config)
const firebaseConfig = {
    apiKey: "AIzaSyAK9XdMGo9FaGEgYGti0b3Uy5te9h2vpIo",
    authDomain: "tukutaneadmin.firebaseapp.com",
    projectId: "tukutaneadmin",
    storageBucket: "tukutaneadmin.firebasestorage.app",
    messagingSenderId: "588527555848",
    appId: "1:588527555848:web:25b584413c350e8a5508bd",
    measurementId: "G-WG0TBT1B05"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase authentication and Firestore instance
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, createUserWithEmailAndPassword, updateProfile, setDoc, doc };
