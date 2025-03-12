// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVQPaVoxSoB8G_1ln974jKWYrFIPthT0E",
  authDomain: "bzethio-43d76.firebaseapp.com",
  projectId: "bzethio-43d76",
  storageBucket: "bzethio-43d76.firebasestorage.app",
  messagingSenderId: "1068915931745",
  appId: "1:1068915931745:web:bc709cbe5cf1145ba64820",
  measurementId: "G-V548TJTZNW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
export { auth }; 
