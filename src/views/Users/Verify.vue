<template>
    <div>
      <div class="mt-9">
        <div class="flex">
          <div><p>Password</p></div>
          <div><p class="text-red-400 mt-1 ml-1">*</p></div>
        </div>
        <div class="mt-2">
          <input
            type="password"
            class="focus:outline-none pl-3 border-2 rounded-md border-blue-300 w-full md:h-12"
            v-model="model.user.password"
          />
        </div>
      </div>
      <div class="mt-9">
        <div class="flex">
          <div><p>Confirm Password</p></div>
          <div><p class="text-red-400 mt-1 ml-1">*</p></div>
        </div>
        <div class="mt-2">
          <input
            type="password"
            class="focus:outline-none pl-3 border-2 rounded-md border-blue-300 w-full md:h-12"
            v-model="model.user.password_confirmation"
            @input="validatePasswords" 
          />
        </div>
        <p v-if="passwordError" class="text-red-500 mt-2">Passwords do not match.</p>
      </div>
      <div class="mx-auto w-1/2 mt-6 md:w-1/3 md:mx-auto">
        <button
          @click="handleRegister"
          class="bg-cyan-700 text-white px-8 py-2 rounded-sm cursor-pointer"
          :disabled="passwordError" 
        >
          Submit
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    setup() {
      const model = ref({
        user: {
          password: '',
          password_confirmation: '',
        }
      });
  
      const passwordError = ref(false); 
  
      const validatePasswords = () => {

        passwordError.value = model.value.user.password !== model.value.user.password_confirmation;
      };
  
      const handleRegister = () => {
       
        if (passwordError.value) {
          alert('Passwords do not match. Please correct them before submitting.');
          return;
        }

      };
  
      return {
        model,
        passwordError,
        validatePasswords,
        handleRegister,
      };
    },
  };
  </script>