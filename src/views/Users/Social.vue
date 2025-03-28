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
      const result = await signInWithPopup(auth, googleProvider);
      // You can access the signed-in user's info here
      const user = result.user;
      console.log('User signed in:', user);
      // Handle user sign-in (e.g., redirect, store user info)
    } catch (error) {
      console.error('Error signing in with Google:', error);
      // Handle errors (e.g., show a message)
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