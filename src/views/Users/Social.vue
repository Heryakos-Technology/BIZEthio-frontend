<template>
    <div>
      <button @click="signInWithGoogle">Sign in with Google</button>
      <button @click="signInWithFacebook">Sign in with Facebook</button>
    </div>
  </template>
  
  <script>
  import { initializeApp, getApp, getApps } from 'firebase/app';
  import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
  import { onMounted } from 'vue';
  
  export default {
    setup() {
      const firebaseConfig = {
        apiKey: "AIzaSyATMyBqsslwYAQwCeCBYLaNMjvxovmZB94",
        authDomain: "bizethio-60df1.firebaseapp.com",
        projectId: "bizethio-60df1",
        storageBucket: "bizethio-60df1.appspot.com",
        messagingSenderId: "340021224315",
        appId: "1:340021224315:web:bb62c25d4d72b4834853de",
        measurementId: "G-9WPEFMJ0YP"
      };
  
      const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
      const auth = getAuth(app);
      const googleProvider = new GoogleAuthProvider();
      const facebookProvider = new FacebookAuthProvider();
  
      const signInWithGoogle = async () => {
        try {
          const result = await signInWithPopup(auth, googleProvider);
          console.log('Google Sign-In successful:', result);
        } catch (error) {
          console.error('Error during Google Sign-In:', error);
          alert(error.message);
        }
      };
  
      const signInWithFacebook = async () => {
        try {
    const result = await signInWithPopup(auth, facebookProvider);
    console.log('Facebook Sign-In successful:', result);
  } catch (error) {
    if (error.code === 'auth/popup-closed-by-user') {
      alert('The login popup was closed before completion. Please try again.');
    } else {
      console.error('Error during Facebook Sign-In:', error);
      alert(error.message);
    }
  }
      };
  
      onMounted(() => {
        window.fbAsyncInit = function () {
          window.FB.init({
            appId: '1205146000958902',
            cookie: true,
            xfbml: true,
            version: 'v10.0',
          });
        };
      });
  
      return {
        signInWithGoogle,
        signInWithFacebook,
      };
    },
  };
  </script>