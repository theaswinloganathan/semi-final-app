import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD3UJ_5Vw_UttSlyQudjyW0y2ofT0_CLgU",
  authDomain: "login-4e91a.firebaseapp.com",
  projectId: "login-4e91a",
  storageBucket: "login-4e91a.firebasestorage.app",
  messagingSenderId: "741934825204",
  appId: "1:741934825204:web:7aca8a06d0bd2a78b568a1",
  measurementId: "G-1MQF94EVMQ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Google Sign-In Error", error);
    throw error;
  }
};
