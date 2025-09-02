// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgLiopp4xNYgQ24CmRor33LAP1PPhGz8g",
  authDomain: "travel-planner-f7b0b.firebaseapp.com",
  projectId: "travel-planner-f7b0b",
  storageBucket: "travel-planner-f7b0b.firebasestorage.app",
  messagingSenderId: "329070133999",
  appId: "1:329070133999:web:9a9f4685c895f2019ed11a",
  measurementId: "G-H7V6EMZTHP"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);