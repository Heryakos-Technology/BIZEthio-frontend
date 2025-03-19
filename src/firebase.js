// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATMyBqsslwYAQwCeCBYLaNMjvxovmZB94",
  authDomain: "bizethio-60df1.firebaseapp.com",
  projectId: "bizethio-60df1",
  storageBucket: "bizethio-60df1.firebasestorage.app",
  messagingSenderId: "340021224315",

  appId: "1:340021224315:web:bb62c25d4d72b4834853de",
  measurementId: "G-9WPEFMJ0YP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
const auth = getAuth(app);
export { auth }; 

