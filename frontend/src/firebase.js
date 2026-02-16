// Import the functions you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrgeoJhUuagtiyqhsK5Lil6a5bfdzINFI",
  authDomain: "trendora.ayush-codes.tech",
  projectId: "auth-a13d5",
  storageBucket: "auth-a13d5.firebasestorage.app",
  messagingSenderId: "856600464828",
  appId: "1:856600464828:web:2f150473fab9688c4dafb9",
  measurementId: "G-P39S8STBM4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize Auth instead of Analytics
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
