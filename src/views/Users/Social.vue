<template>
    <div class="w-4/5 mx-auto text-white bg-cyan mt-10">
      <div>
        <button
          @click="signInWithGoogle"
          style="background: linear-gradient(to bottom left, #57B4D3 0%,  48%, #57B4D3 98%);"
          class="p1-1 py-2 rounded-md w-11/11 text-sm"
        >
          <i class="fa-brands fa-google -ml-6 mr-1"></i> Sign in with Google
        </button>
      </div>
      <div class="mt-3">
        <button
          @click="signInWithFacebook"
          style="background: linear-gradient(to bottom left, #4584D7 0%,  48%, #6B94C9 98%);"
          class="pl-1 py-2 rounded-md w-11/11 text-sm"
        >
          <i class="fa-brands fa-facebook-f -ml-4 mr-1"></i> Sign in with Facebook
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import { auth, googleProvider, facebookProvider } from '..//../firebase';
  import { signInWithPopup } from 'firebase/auth';
  
  export default {
    methods: {
      async signInWithGoogle() {
        try {
          await signInWithPopup(auth, googleProvider);
          console.log("Google sign-in successful");
          
        } catch (error) {
          console.error("Error during Google sign-in:", error);
        }
      },
      async signInWithFacebook() {
        try {
          await signInWithPopup(auth, facebookProvider);
          console.log("Facebook sign-in successful");
          router.push('/signin');
      
        } catch (error) {
          console.error("Error during Facebook sign-in:", error);
          alert(error)
        }
      }
    }
  }
  </script>
  
  <style scoped>
  /* Add any necessary styles here */
  </style>