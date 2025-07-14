// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Cấu hình Firebase của bạn
const firebaseConfig = {
  apiKey: "AIzaSyAafjicxbXbRdI3mO5b5kJkFThm7JugtLM",
  authDomain: "pet-track-68233.firebaseapp.com",
  projectId: "pet-track-68233",
  storageBucket: "pet-track-68233.firebasestorage.app",
  messagingSenderId: "233457006048",
  appId: "1:233457006048:web:9548389f9f5e3789932785",
  measurementId: "G-5JEZVYJKJH"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Khởi tạo xác thực và provider Google
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
