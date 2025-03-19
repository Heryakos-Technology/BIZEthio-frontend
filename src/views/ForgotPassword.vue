<template>
    <div class="px-2 py-10">
      <div class="bg-white rounded-sm pb-10 lg:hidden">
  <img src="/forgotmobile.png" alt="" class="mx-auto pt-5">
  <h1 class="text-center mt-8 text-xl font-semibold">Forgot Password?</h1>
  <div class="w-2/3 mx-auto mt-10">
          <div>
              <div class="flex">
                  <div>
  
                      <p>Enter Your Email </p>
                  </div>
                 
              </div>
              <div class="mt-2 ">
                  <input type="text" class="pl-3 border-2 rounded-md border-blue-300 focus:outline-none w-13/13 md:h-12" v-model="email" id="email" required>
                 
              </div>
          </div>
    
          <!-- <div class="mt-9">
              <div class="flex">
                  <div>
  
                      <p>Verification Code </p>
                  </div>
                 
              </div>
              <div class="mt-2 ">
                  <input type="text" class="border-2 rounded-md border-blue-300 focus:outline-none w-13/13 md:h-12" >
              </div>
          </div> -->
         
       
    
  
          <div class="mx-auto w-3/4 mt-6 md:w-1/3 md:mx-auto">
              <button class="bg-cyan-500 text-white px-8 py-2 rounded-md " @click="sendResetEmail" >Send Reset Link</button>
          </div>
          <div class="mt-5 w-12/13 mx-auto md:w-2/3 md:mx-auto">
              <p class="md:text-lg text-sm text-center text-gray-400"> Back to Sign in </p>
          </div>
      </div>
      </div>
    <div class="hidden lg:block w-1/2 mx-auto py-26">
<div class="container flex px-5 py-10 rounded-md">
<div class="w-1/2 mx-auto mt-10">
    <img src="/forgotdesktop.png" alt="" class="h-58">
</div>
<div class="w-2/3 mx-auto ml-5 mt-10">
    <h1 class="font-bold">Forgot Your Password?</h1>
    <div class="mt-5">
              <div class="flex">
                  <div>
  
                      <p>Enter Your Email </p>
                  </div>
                 
              </div>
              <div class="mt-2 ">
                  <input type="text" class="pl-3 border-2 rounded-xl border-blue-300 focus:outline-none w-13/13 md:h-12 bg-white"  v-model="email" id="email" required>
                 
              </div>
          </div>
          <!-- <div class="mt-5">
              <div class="flex">
                  <div>
  
                      <p>Verification Code</p>
                  </div>
                 
              </div>
              <div class="mt-2 ">
                  <input type="text" class="border-2 rounded-xl border-blue-300 w-13/13 md:h-12 focus:outline-none bg-white"  >
                 
              </div>
          </div> -->
          <div class=" w-3/4 mx-auto mt-6 ">
              <button  style="background: linear-gradient(to bottom left, #78C4DE 75%, #57B4D3 100%);" class=" text-white px-8 py-2 rounded-2xl w-10/11" @click="sendResetEmail" >Send Reset Link</button>
          </div>
          <div class="mt-4 text-gray-400">
            <p v-if="message">{{ message }}</p>
      <p v-if="error">{{ error }}</p>
          </div>
          <div @click="backToSignIn">
            <p class="text-center text-gray-400 mt-6 font-light cursor-pointer">Back to sign in</p>
          </div>
</div>
</div>
  
    </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue'; 
  import { getAuth, sendPasswordResetEmail } from "firebase/auth";
  import { auth } from '../firebase';
  import { useRouter } from 'vue-router'; 
  
  export default {
    setup() {
      const email = ref(''); 
      const message = ref(''); 
      const error = ref(''); 
      const router = useRouter(); 
  
      const backToSignIn = () => {
        router.push('/signin'); 
      };
  
      const sendResetEmail = async () => {
        try {
          await sendPasswordResetEmail(auth, email.value); 
          message.value = 'Password reset email sent! Check your inbox.';
          error.value = '';
        } catch (err) {
          error.value = err.message; 
          message.value = '';
        }
      };
  
      return {
        email,
        message,
        error,
        backToSignIn,
        sendResetEmail,
      };
    },
  };
  </script>
  
  <style scoped>
  .container{
    background-color: #d4f1fb;
  }
  </style>