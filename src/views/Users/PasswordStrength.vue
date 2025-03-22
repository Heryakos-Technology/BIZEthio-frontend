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
            @input="checkPasswordStrength" 
          />
        </div>
        <p :class="passwordStrengthClass">{{ passwordStrengthMessage }}</p>
        <ul>
  <li 
    :class="{ 'text-green-500': criterion.met, 'text-red-500': !criterion.met }" 
    v-for="(criterion, index) in passwordCriteria" 
    :key="index"
  >
    <span>
      {{ criterion.text }} 
      <span v-if="criterion.met">✓</span>
      <span v-else>✗</span>
    </span>
  </li>
</ul>
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
          :disabled="passwordError || !isPasswordStrong" 
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
      const passwordStrengthMessage = ref('');
      const passwordStrengthClass = ref('');
      const isPasswordStrong = ref(false);
  
      // Define password criteria
      const passwordCriteria = ref([
        { text: 'At least 8 characters', met: false },
        { text: 'At least one number', met: false },
        { text: 'At least one uppercase letter', met: false },
        { text: 'At least one lowercase letter', met: false },
        { text: 'At least one special character', met: false }
      ]);
  
      const checkPasswordStrength = () => {
        const password = model.value.user.password;
        const lengthCriteria = password.length >= 8;
        const numberCriteria = /\d/.test(password);
        const uppercaseCriteria = /[A-Z]/.test(password);
        const lowercaseCriteria = /[a-z]/.test(password);
        const specialCharCriteria = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
        // Update criteria met status
        passwordCriteria.value[0].met = lengthCriteria;
        passwordCriteria.value[1].met = numberCriteria;
        passwordCriteria.value[2].met = uppercaseCriteria;
        passwordCriteria.value[3].met = lowercaseCriteria;
        passwordCriteria.value[4].met = specialCharCriteria;
  
        // Determine password strength
        if (lengthCriteria && numberCriteria && uppercaseCriteria && lowercaseCriteria && specialCharCriteria) {
          passwordStrengthMessage.value = 'Strong Password';
          passwordStrengthClass.value = 'text-green-500';
          isPasswordStrong.value = true;
        } else if (lengthCriteria && (numberCriteria || uppercaseCriteria || lowercaseCriteria)) {
          passwordStrengthMessage.value = 'Moderate Password';
          passwordStrengthClass.value = 'text-yellow-500';
          isPasswordStrong.value = false;
        } else {
          passwordStrengthMessage.value = 'Weak Password';
          passwordStrengthClass.value = 'text-red-500';
          isPasswordStrong.value = false;
        }
      };
  
      const validatePasswords = () => {
        passwordError.value = model.value.user.password !== model.value.user.password_confirmation;
      };
  
      const handleRegister = () => {
        if (passwordError.value) {
          alert('Passwords do not match. Please correct them before submitting.');
          return;
        }
        if (!isPasswordStrong.value) {
          alert('Please enter a strong password before submitting.');
          return;
        }
        // Continue with registration process
      };
  
      return {
        model,
        passwordError,
        passwordStrengthMessage,
        passwordStrengthClass,
        isPasswordStrong,
        passwordCriteria,
        checkPasswordStrength,
        validatePasswords,
        handleRegister,
      };
    },
  };
  </script>
  
  <style>
  .text-green-500 {
    color: green;
  }
  .text-yellow-500 {
    color: orange;
  }
  .text-red-500 {
    color: red;
  }
  </style>