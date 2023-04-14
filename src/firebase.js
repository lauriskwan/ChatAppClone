// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGUUYFRoHXeg-Cj2QaNI7ikgb5TV6Bukc",
  authDomain: "chat-app-clone-5ef56.firebaseapp.com",
  projectId: "chat-app-clone-5ef56",
  storageBucket: "chat-app-clone-5ef56.appspot.com",
  messagingSenderId: "731206889323",
  appId: "1:731206889323:web:b80a2711ccf2dd9759a62e",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
