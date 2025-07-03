// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsKjI3BadRGYaQ1GcFmgZEOuUWrL_3kWs",
  authDomain: "safet-id-7b807.firebaseapp.com",
  projectId: "safet-id-7b807",
  storageBucket: "safet-id-7b807.firebasestorage.app",
  messagingSenderId: "367148685926",
  appId: "1:367148685926:web:31e50a8c05adefdc796ba7",
  measurementId: "G-DJJFCXB486"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Authentication functions
export const signInWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};

export const logOut = () => {
  return signOut(auth);
};

export { app, analytics, auth, db };

