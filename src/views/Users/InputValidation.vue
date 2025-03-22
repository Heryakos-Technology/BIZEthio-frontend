<template>
    <div>
      <div class="mt-9">
        <div class="flex">
          <div><p>Password</p></div>
          <div><p class="text-red-400 mt-1 ml-1">*</p></div>
        </div>
        <div class="mt-2 relative">
          <input
            :type="isPasswordVisible ? 'text' : 'password'" 
            class="focus:outline-none pl-3 border-2 rounded-md border-blue-300 w-full md:h-12"
            v-model="model.user.password"
            @input="validatePassword" 
          />
          <span @click="togglePasswordVisibility" class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer">
            <i :class="isPasswordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
          </span>
        </div>
        <p :class="passwordStrengthClass">{{ passwordStrengthMessage }}</p>
        <ul>
          <li 
            v-for="(criterion, index) in passwordCriteria" 
            :key="index"
            :class="{ 'text-green-500': criterion.met, 'text-red-500': !criterion.met }"
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
        <div class="mt-2 relative">
          <input
            :type="isConfirmPasswordVisible ? 'text' : 'password'" 
            class="focus:outline-none pl-3 border-2 rounded-md border-blue-300 w-full md:h-12"
            v-model="model.user.password_confirmation"
            @input="validatePasswords"
          />
          <span @click="toggleConfirmPasswordVisibility" class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer">
            <i :class="isConfirmPasswordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
          </span>
        </div>
        <p v-if="passwordError" class="text-red-500 mt-2">Passwords do not match.</p>
      </div>
      <div class="mx-auto w-1/2 mt-6 md:w-1/3 md:mx-auto">
        <button
          @click="handleRegister"
          class="bg-cyan-700 text-white px-8 py-2 rounded-sm cursor-pointer"
          :disabled="!isFormValid" 
        >
          Submit
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  
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
      
      // Define password criteria
      const passwordCriteria = ref([
        { text: 'At least 8 characters', met: false },
        { text: 'At least one number', met: false },
        { text: 'At least one uppercase letter', met: false },
        { text: 'At least one lowercase letter', met: false },
        { text: 'At least one special character', met: false }
      ]);
  
      const isPasswordVisible = ref(false); // Track password visibility
      const isConfirmPasswordVisible = ref(false); // Track confirm password visibility
  
      // Validate password strength
      const validatePassword = () => {
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
  
        // Determine password strength message and class
        if (lengthCriteria && numberCriteria && uppercaseCriteria && lowercaseCriteria && specialCharCriteria) {
          passwordStrengthMessage.value = 'Strong Password';
          passwordStrengthClass.value = 'text-green-500';
        } else if (lengthCriteria && (numberCriteria || uppercaseCriteria || lowercaseCriteria)) {
          passwordStrengthMessage.value = 'Moderate Password';
          passwordStrengthClass.value = 'text-yellow-500';
        } else {
          passwordStrengthMessage.value = 'Weak Password';
          passwordStrengthClass.value = 'text-red-500';
        }
        // Check overall form validity
        validateForm();
      };
  
      // Validate password confirmation
      const validatePasswords = () => {
        passwordError.value = model.value.user.password !== model.value.user.password_confirmation;
        // Check overall form validity
        validateForm();
      };
  
      // Check overall form validity
      const validateForm = () => {
        return passwordError.value === false && passwordCriteria.value.every(criterion => criterion.met);
      };
  
      // Computed property to determine if the form is valid
      const isFormValid = computed(() => {
        return !passwordError.value && passwordCriteria.value.every(criterion => criterion.met);
      });
  
      const handleRegister = () => {
        if (passwordError.value) {
          alert('Passwords do not match. Please correct them before submitting.');
          return;
        }
        if (!isFormValid.value) {
          alert('Please enter a strong password before submitting.');
          return;
        }
        // Continue with registration process
      };
  
      // Methods to toggle password visibility
      const togglePasswordVisibility = () => {
        isPasswordVisible.value = !isPasswordVisible.value;
      };
      
      const toggleConfirmPasswordVisibility = () => {
        isConfirmPasswordVisible.value = !isConfirmPasswordVisible.value;
      };
  
      return {
        model,
        passwordError,
        passwordStrengthMessage,
        passwordStrengthClass,
        passwordCriteria,
        isPasswordVisible,
        isConfirmPasswordVisible,
        validatePassword,
        validatePasswords,
        handleRegister,
        togglePasswordVisibility,
        toggleConfirmPasswordVisibility,
        isFormValid,
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