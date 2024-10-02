// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHRQYdsLoT3cPEvLSUa2tt25KgfR4mKi0",
  authDomain: "vcet-vite.firebaseapp.com",
  projectId: "vcet-vite",
  storageBucket: "vcet-vite.appspot.com",
  messagingSenderId: "913273863960",
  appId: "1:913273863960:web:911629e419027deb41a86d",
  measurementId: "G-3S2R7VBZC6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)