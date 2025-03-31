<template>
  <div class="w-4/5 mx-auto text-white bg-cyan mt-10">
    <div>
      <button
        @click="signInWithGoogle"
        style="background: linear-gradient(to bottom left, #57B4D3 0%, 48%, #57B4D3 98%);"
        class="p1-1 py-2 rounded-md w-11/11 text-sm"
      >
        <i class="fa-brands fa-google -ml-6 mr-1"></i> Sign in with Google
      </button>
    </div>
    <div class="mt-3">
      <button
        @click="signInWithFacebook"
        style="background: linear-gradient(to bottom left, #4584D7 0%, 48%, #6B94C9 98%);"
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
import axios from 'axios'; // Import axios for making API requests
import router from '@/router'; // Adjust the path according to your project structure

export default {
  methods: {
    async signInWithGoogle() {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        console.log('User signed in:', user);
        await this.checkAndRegisterUser(user);
      } catch (error) {
        console.error('Error signing in with Google:', error);
      }
    },
    async signInWithFacebook() {
      try {
        const result = await signInWithPopup(auth, facebookProvider);
        const user = result.user;
        console.log('User signed in:', user);
        await this.checkAndRegisterUser(user);
      } catch (error) {
        console.error('Error during Facebook sign-in:', error);
      }
    },
    async checkAndRegisterUser(user) {
      try {
        // Check if the user is already registered in the backend
        const response = await axios.get(`api/users/login`, {
          params: { email: user.email }
        });

        if (response.data.exists) {
          // User exists, store user_id in local storage
          localStorage.setItem('user_id', response.data.user_id);
          // Navigate to the profile page
          router.push('/profile');
        } else {
          // User does not exist, register the user
          await this.registerUser(user);
        }
      } catch (error) {
        console.error('Error checking user:', error);
      }
    },
    async registerUser(user) {
      try {
        const response = await axios.post(`api/users/register`, {
          name: user.displayName,
          email: user.email,
          // You can add more fields if necessary
        });
        console.log('User registered in backend:', response.data);
        
        // Store user_id in local storage after registration
        localStorage.setItem('user_id', response.data.user_id);
        // Navigate to the profile page
        router.push('/profile');
      } catch (error) {
        console.error('Error registering user:', error);
      }
    }
  }
}
</script>

<style scoped>
/* Add any necessary styles here */
</style>