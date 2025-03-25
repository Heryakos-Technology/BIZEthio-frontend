<template>
   <UserLayout>
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
          <div class="mt-2">
            <input type="email" class="pl-3 border-2 rounded-md border-blue-300 focus:outline-none w-13/13 md:h-12" v-model="email" id="email" required>
            
          </div>
          <p v-if="error" class="text-red-500 mt-3">{{ error }}</p>
        </div>
        <div class="mx-auto w-3/4 mt-6 md:w-1/3 md:mx-auto">
          <button class="bg-cyan-700 text-white px-10 py-2 lg:w-11/10 lg:mx-auto rounded-sm text-lg cursor-pointer" @click="sendResetEmail">Send Reset Link</button>
        </div>
        <div class="mt-4 text-cyan-400">
            <p v-if="message" class="mt-3">{{ message }}</p>
            <!-- <p v-if="error" class="mt-3">{{ error }}</p> -->
          </div>
        <div class="mt-5 w-12/13 mx-auto md:w-2/3 md:mx-auto">
          <p class="md:text-lg text-sm text-center text-gray-400 hover:font-semibold" > Back to Sign in </p>
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
            <div class="mt-2">
              <input type="email" class="pl-3 border-2 rounded-xl border-blue-300 focus:outline-none w-13/13 md:h-12 bg-white" v-model="email" id="email" required>
            </div>
            <p v-if="error" class="text-red-500 mt-3">{{ error }}</p>
          </div>
          <div class="w-3/4 mx-auto mt-6">
            <button class="bg-cyan-700 text-white px-10 py-2 lg:w-5/6 lg:mx-auto rounded-sm text-sm cursor-pointer" @click="sendResetEmail">{{ buttonMessage }}</button>
          </div>
          <div class="mt-4 text-cyan-400">
            <p v-if="message" class="mt-3">{{ message }}</p>
            <!-- <p v-if="error" class="mt-3">{{ error }}</p> -->
          </div>
          <div @click="backToSignIn" class="lg:w-1/2 lg:mx-auto">
            <p class="text-blue-600 underline mt-6 font-light cursor-pointer hover:font-semibold" >Back to sign in</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</UserLayout>
</template>

<script>
import { ref } from 'vue'; 
 import UserLayout from "@/layout/UserLayout.vue"
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'; 
import { checkEmailExists } from '../auth'; 
import { useRouter } from 'vue-router'; 

export default {
  components: {
    UserLayout,
  },
  setup() {
    const email = ref(''); 
    const message = ref(''); 
    const error = ref(''); 
    const router = useRouter(); 
    const auth = getAuth(); 
    const buttonMessage = ref('Send Reset Link')

    const sendResetEmail = async () => {
      buttonMessage.value = 'Sending...'
  error.value = ''; 
  message.value = '';

  if (!email.value) {
    buttonMessage.value = 'Send Reset Link'
    error.value = 'Please enter your email.';
    return;
  }

  try {
    const exists = await checkEmailExists(email.value);
    console.log(`Email exists: ${exists}`); 

    if (!exists) {
      buttonMessage.value = 'Failed'
      error.value = 'Email not found. Please check and try again.';

      email.value = ''
      return;
    }

    await sendPasswordResetEmail(auth, email.value);
    buttonMessage.value = 'Reset Link Send'
    message.value = 'Password reset email sent! Check your inbox.';
    email.value = ''
  } catch (err) {
    console.error(err);
    error.value = 'An error occurred. Please try again later.';
    email.value = ''
  }
};

    const backToSignIn = () => {
      router.push('/signin'); 
    };

    return {
      email,
      message,
      error,
      backToSignIn,
      sendResetEmail,
      buttonMessage
    };
  },
};
</script>

<style scoped>
.container {
  background-color: #d4f1fb;
}
</style>