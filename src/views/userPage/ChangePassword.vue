<template>
  <UserLayoutUser>
    <div class="lg:px-40 mb-40 lg:w-9/10 lg:mx-auto  lg:pb-40">
      <div class="bg-white h-4/5 lg:h-6/7 w-11/12 lg:w-8/9 mb-10 p-2 mt-4 ml-7 rounded-2xl">
        <p class="font-semibold lg:font-bold lg:ml-4 mb-2">Change Password</p>
        <div class="bg-gradient-to-l from-[#1B7590] to-[#1B7B90] relative h-[370px] lg:w-8/9 mx-auto mb-4 rounded-2xl p-8">
          <div class="md:w-">
            <div class="w-screen md:w-4/5 md:px-4 md:mx-auto px-4 -ml-10 mb-3">
              <label for="currentPassword" class="text-gray-100">Current Password</label>
              <div class="flex">
                <input
                  :type="showCurrentPassword ? 'text' : 'password'"
                  v-model="currentPassword"
                  class="pl-2 w-5/6 h-10 mt-2 outline-none rounded-lg bg-white"
                />
                <i
                  @click="toggleCurrentPassword"
                  :class="showCurrentPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'"
                  class="-ml-8 mt-5 cursor-pointer text-gray-700"
                ></i>
              </div>
            </div>
            <div class="w-screen px-4 -ml-10 mb-3 md:w-4/5 md:px-4 md:mx-auto">
              <label for="newPassword" class="text-gray-100">New Password</label>
              <div class="flex">
                <input
                  :type="showNewPassword ? 'text' : 'password'"
                  v-model="newPassword"
                  @input="validatePasswordStrength"
                  class="pl-2 w-5/6 h-10 mt-2 outline-none rounded-lg bg-white"
                />
                <i
                  @click="toggleNewPassword"
                  :class="showNewPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'"
                  class="-ml-8 mt-5 cursor-pointer text-gray-700"
                ></i>
              </div>
              <div v-if="passwordStrength" class="text-green-500">{{ passwordStrength }}</div>
            </div>
            <div class="w-screen px-4 -ml-10 mb-3 md:w-4/5 md:px-4 md:mx-auto">
              <label for="confirmPassword" class="text-gray-100">Confirm Password</label>
              <div class="flex">
                <input
                  :type="showConfirmedPassword ? 'text' : 'password'"
                  v-model="confirmPassword"
                  @focus="isInputFocused = true"
                  @blur="isInputFocused = false"
                  :class="['pl-2', 'w-5/6', 'h-10', 'mt-2', 'outline-none', 'rounded-lg', 'bg-white', isInputFocused || confirmPassword ? (isPasswordMatch ? '' : 'border-3 border-red-500') : 'border-2 border-white']"
                />
                <i
                  @click="toggleConfirmedPassword"
                  :class="showConfirmedPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'"
                  class="-ml-8 mt-5 cursor-pointer text-gray-700"
                ></i>
              </div>
            </div>
          </div>
          <div class="flex mx-auto md:h-10 mt-6 lg:mt-2 w-11/12 lg:w-64 md:w-64 md:-mt-1 md:mx-auto">
            <div @click="backToProfile" class="flex cursor-pointer ml-16 bg-[#075E86] hover:bg-[#6291a7] rounded-lg px-4 w-16 h-10 md:10 md:ml-72 lg:-ml-38 lg:w-20 lg:mx-auto">
              <button  class="text-[14px] font-normal text-white lg:text-center ml-2 cursor-pointer">
                back
              </button>
            </div>
            <div class="flex bg-[#075E86] hover:bg-[#6291a7] w-11/12 h-10 -ml-5 px-2 rounded-lg">
              <button @click="changePassword" class="text-[14px] text-center px-13 font-normal cursor-pointer hover:scale-105 text-white">
                Reset Password
              </button>
            </div>
          </div>
          <div v-if="errorMessage" class="text-red-500 bg-amber-50 mb-4 text-center mt-1 pb-2">
            {{ errorMessage }}
          </div>
        </div>
      </div>
    </div>
  </UserLayoutUser>
</template>

<script setup>
import { ref, computed } from 'vue';
import { getAuth, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from 'firebase/auth';
import UserLayoutUser from "@/layout/UserLayoutUser.vue";
import { useRouter } from 'vue-router';

const currentPassword = ref("");
const newPassword = ref("");
const confirmPassword = ref("");
const showCurrentPassword = ref(false);
const showNewPassword = ref(false);
const showConfirmedPassword = ref(false);
const isInputFocused = ref(false);
const errorMessage = ref("");
const passwordStrength = ref("");
const router = useRouter();

const isPasswordMatch = computed(() => newPassword.value === confirmPassword.value);

const toggleCurrentPassword = () => {
  showCurrentPassword.value = !showCurrentPassword.value;
};

const toggleNewPassword = () => {
  showNewPassword.value = !showNewPassword.value;
};

const toggleConfirmedPassword = () => {
  showConfirmedPassword.value = !showConfirmedPassword.value;
};

const backToProfile = () => {
  router.push("/EditProfile");
};

const validatePasswordStrength = () => {
  const password = newPassword.value;
  if (password.length < 6) {
    passwordStrength.value = "Password is too short. Minimum 6 characters.";
  } else if (!/[A-Z]/.test(password)) {
    passwordStrength.value = "Password should contain at least one uppercase letter.";
  } else if (!/[a-z]/.test(password)) {
    passwordStrength.value = "Password should contain at least one lowercase letter.";
  } else if (!/[0-9]/.test(password)) {
    passwordStrength.value = "Password should contain at least one number.";
  } else if (!/[\W_]/.test(password)) {
    passwordStrength.value = "Password should contain at least one special character.";
  } else {
    passwordStrength.value = "Strong password!";
  }
};

const changePassword = async () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (newPassword.value !== confirmPassword.value) {
    errorMessage.value = "New password and confirmation do not match.";
    return;
  }

  try {
    const credential = EmailAuthProvider.credential(user.email, currentPassword.value);
    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPassword.value);
    alert("Password changed successfully!");
    router.push('/UserProfile');
  } catch (error) {
    errorMessage.value = "Invalid credentials. Please try again."; 
  }
};
</script>