<template>
                <p class="text-center text-3xl font-bold mt-16">
              Welcome to <span class="text-[#2178AC]">BIZEthio</span>
            </p>
            <div class="mt-28 border-2 border-cyan-800 rounded-md h-96 transition-all duration-300 hover:scale-105 p-4">
              <div class="w-full">
                <div class="px-4 mt-4 mx-auto">
                  <div class="flex">
                    <p>Password</p>
                    <p class="text-red-600 text-2xl font-medium ml-2">*</p>
                  </div>
                  <div class="relative">
                    <input v-model="companies.password" :type="showPasswordField ? 'text' : 'password'"
                      @input="handlePasswordInput"
                      class="outline-none w-11/12 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md pl-4" />
                    <span @click="togglePasswordVisibility"
                      class="absolute right-12 top-1/2 transform -translate-y-1/2 cursor-pointer">
                      <i :class="showPasswordField ? 'fas fa-eye-slash' : 'fas fa-eye'
                        " class="text-gray-800"></i>
                    </span>
                  </div>
                  <p v-if="errors.password" class="text-red-500 text-sm">
                    {{ errors.password }}
                  </p>
                  <div v-if="passwordStrengthLabel" :class="['mt-2', passwordStrengthClass]">
                    {{ passwordStrengthLabel }}
                  </div>
                </div>

                <div class="px-4 mt-4 mx-auto">
                  <div class="flex">
                    <p>Confirm Password</p>
                    <p class="text-red-600 text-2xl font-medium ml-2">*</p>
                  </div>
                  <div class="relative">
                    <input v-model="companies.password_confirmation" @input="handleConfirmPasswordInput"
                      :type="showConfirmPasswordField ? 'text' : 'password'"
                      class="outline-none w-11/12 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md pl-4"
                      :class="[
                        'outline-none w-11/12 mx-auto h-10 bg-transparent border-2 rounded-md pl-4',
                        isConfirmPasswordFocused &&
                          companies.password &&
                          companies.password !== companies.password_confirmation
                          ? 'border-red-500'
                          : 'border-[#60b5e6]',
                      ]" @focus="isConfirmPasswordFocused = true" @blur="isConfirmPasswordFocused = false" />
                    <span @click="toggleConfirmPasswordVisibility"
                      class="absolute right-12 top-1/2 transform -translate-y-1/2 cursor-pointer">
                      <i :class="showConfirmPasswordField
                          ? 'fas fa-eye-slash'
                          : 'fas fa-eye'
                        " class="text-gray-800"></i>
                    </span>
                  </div>
                  <p v-if="errors.password_confirmation" class="text-red-500 text-sm">
                    {{ errors.password_confirmation }}
                  </p>
                </div>
              </div>

              <div>
                <button @click="hidepassword"
                  class="bg-[#2178AC] mb-32 lg:mb-0 hover:bg-[#6b8ea1] ml-2 lg:ml-4 py-2 cursor-pointer transition-all duration-300 lg:mt-4 hover:scale-105 px-6 mt-10 md:ml-20 rounded-md text-white text-md">
                  Back
                </button>
              </div>
              <p v-if="showRegistrationError" class="text-red-600">An error occured. please try again!</p>
              <div>
                <button @click="submitForm"
                  class="bg-[#2178AC] mb-32 hover:bg-[#6b8ea1] ml-40 lg:ml-24 py-3 cursor-pointer transition-all duration-300 hover:scale-105 px-20 mt-10 lg:mt-6 md:ml-20 rounded-md text-white text-md">
                  {{ this.changeRegister }}
                </button>
              </div>
            </div>
</template>

<script>
export default {
  props: {
    companies: Object,
    errors: Object,
    showPassword: Boolean,
    passwordStrengthLabel: String,
    passwordStrengthClass: String,
    showRegistrationError: Boolean,
    changeRegister: String,
    handlePasswordInput: Function,
    togglePasswordVisibility: Function,
    hidepassword: Function,
    submitForm: Function,
    showPasswordField: Boolean,
    showConfirmPasswordField:Boolean,
    handleConfirmPasswordInput: Function,
  },
};
</script>