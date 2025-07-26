// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJUQ4msAY2O8hQwi75fMmsxyYAyJ-yPYI",
  authDomain: "netflix-gpt-26a73.firebaseapp.com",
  projectId: "netflix-gpt-26a73",
  storageBucket: "netflix-gpt-26a73.firebasestorage.app",
  messagingSenderId: "969002803871",
  appId: "1:969002803871:web:9fca084e5a047ca8f278aa",
  measurementId: "G-X8Y7C7H9E1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();