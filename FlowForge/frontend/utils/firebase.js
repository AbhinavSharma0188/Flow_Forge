import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBMJv5U8XosbcymccKyq9vUoPvvWmkRbmQ",
  authDomain: "flow-6c5e9.firebaseapp.com",
  projectId: "flow-6c5e9",
  storageBucket: "flow-6c5e9.firebasestorage.app",
  messagingSenderId: "936499493196",
  appId: "1:936499493196:web:7cc897572865f2ec41f7e9",
  measurementId: "G-K5514S5R6B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ⭐ IMPORTANT FOR GOOGLE LOGIN
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };

