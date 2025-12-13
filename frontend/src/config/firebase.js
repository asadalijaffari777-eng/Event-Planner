import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// we should use googleAuthProvider in order to enable the authentication with a google account

const firebaseConfig = {
  apiKey: "AIzaSyDCp-P477w10qOo6JyIJ98H-_PB-G9AmOs",
  authDomain: "fir-crash-course-2b44b.firebaseapp.com",
  projectId: "fir-crash-course-2b44b",
  storageBucket: "fir-crash-course-2b44b.firebasestorage.app",
  messagingSenderId: "774233826634",
  appId: "1:774233826634:web:7a6266a70f91894aba0db3",
  measurementId: "G-LGLN742GS8",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// getAuth allows us to use firebase authentication accross the entire app, so we stored it inside auth
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});
