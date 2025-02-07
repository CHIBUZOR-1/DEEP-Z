// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "deep-z.firebaseapp.com",
  projectId: "deep-z",
  storageBucket: "deep-z.firebasestorage.app",
  messagingSenderId: "630286279275",
  appId: "1:630286279275:web:bce22ad7291e1fb484872e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);