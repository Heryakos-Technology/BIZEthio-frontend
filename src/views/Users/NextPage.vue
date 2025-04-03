<template>
  <UserLayout>
    <div class="px-2 py-5">
      <div class="bg-white rounded-sm pb-10 lg:hidden">
        <img src="/public/logo.png" alt="" class="mx-auto pt-5" />
        <h1 class="text-center mt-8 text-xl">Create an account</h1>
        <div
          class="flex justify-between w-1/3 mx-auto text-gray-400 mt-4 md:w-1/5 md:mx-auto"
        >
          <div><i class="fa-brands fa-facebook-f text-2xl"></i></div>
          <div><i class="fa-brands fa-twitter text-2xl"></i></div>
          <div><i class="fa-brands fa-linkedin-in text-2xl"></i></div>
        </div>
        <p class="text-gray-400 text-center mt-4">
          Fill the form for registration
        </p>
        <div class="w-2/3 mx-auto mt-10">
          <div class="mt-9">
            <div class="flex">
              <div><p>Password</p></div>
              <div><p class="text-red-400 mt-1 ml-1">*</p></div>
            </div>
            <div class="mt-2 relative">
              <input
                :type="isPasswordVisible ? 'text' : 'password'"
                class="focus:outline-none pl-3 border-2 rounded-md border-blue-300 w-13/13 md:h-12"
                v-model="model.user.password"
                @input="checkPasswordStrength(), validate()"
              />
              <span
                @click="togglePasswordVisibility"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                <i
                  :class="isPasswordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"
                ></i>
              </span>
            </div>
            <div v-if="errors.password" class="text-red-400 mt-1">
              {{ errors.password }}
            </div>
            <p :class="passwordStrengthClass">{{ passwordStrengthMessage }}</p>
            <ul>
              <li
                :class="{
                  'text-green-500': criterion.met,
                  'text-red-500': !criterion.met,
                }"
                v-for="(criterion, index) in passwordCriteria"
                :key="index"
              >
                <span>
                  {{ criterion.text }}
                  <span v-if="criterion.met"
                    ><i class="fa-solid fa-check"></i
                  ></span>
                  <span v-else class="ml-1"
                    ><i class="fa-solid fa-xmark"></i
                  ></span>
                </span>
              </li>
            </ul>
          </div>
          <div class="mt-9">
            <div class="flex">
              <div><p>Confirm password</p></div>
              <div><p class="text-red-400 mt-1 ml-1">*</p></div>
            </div>
            <div class="mt-2 relative">
              <input
                :type="isConfirmPasswordVisible ? 'text' : 'password'"
                class="focus:outline-none pl-3 border-2 rounded-md border-blue-300 w-13/13 md:h-12"
                v-model="model.user.password_confirmation"
                @input="validatePasswords(), validate()"
              />
              <span
                @click="toggleConfirmPasswordVisibility"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                <i
                  :class="
                    isConfirmPasswordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'
                  "
                ></i>
              </span>
            </div>
          </div>
          <div v-if="errors.password_confirmation" class="text-red-400 mt-1">
            {{ errors.password_confirmation }}
          </div>
          <p v-if="passwordError" class="text-red-500 mt-2">
            Passwords do not match.
          </p>
          <div class="mt-9">
            <div class="flex"></div>
            <div class="mt-2 w-13/13">
              <div class="mt-5">
                <div><p class="mb-4">Profile picture</p></div>
                <div class="-ml-48 mt-10">
                  <div
                    class="border-gray-300 h-32 mt-4 flex items-center justify-center cursor-pointer"
                    @dragover.prevent="handleDragOver"
                    @drop.prevent="handleFileDrop"
                    @click="triggerFileInput"
                  >
                    <img src="/dragfile.png" alt="" class="w-1/2" />
                  </div>
                  <input
                    type="file"
                    class="hidden"
                    @change="handleFileUpload"
                    accept="image/*"
                    id="fileInput"
                  />
                  <label
                    for="fileInput"
                    class="bg-cyan-500 ml-65 mt-10 text-white px-6 py-2 rounded-md cursor-pointer"
                    style="display: inline-block"
                  >
                    Browse
                  </label>
                  <p
                    class="text-gray-500 mt-2 text-center font-semibold text-lg"
                  >
                    or drag a file here
                  </p>
                </div>

                <p v-if="uploaded" class="mb-4 mt-4 text-cyan-400">
                  {{ uploaded }}
                </p>
                <div v-if="userPhoto" class="mt-4">
                  <img
                    :src="userPhoto"
                    alt="Uploaded Image"
                    class="max-w-full h-auto rounded-md"
                  />
                </div>
              </div>
            </div>
            <div
              style="
                background: linear-gradient(
                  to bottom left,
                  #8ae4ff 0%,
                  #ffffff 48%,
                  #00d2ea 98%
                );
              "
              class="rounded-xl shadow-md w-13/14 pb-5 mx-auto pt-7 pr-4 mt-16 md:w-3/4"
            >
              <div class="flex justify-between">
                <div class="w-1/3">
                  <img src="/public/logo.png" alt="" />
                </div>
                <div class="md:w-2/3 ml-4">
                  <p class="">Privacy Information</p>
                </div>
              </div>

              <div>
                <p class="w-7/8 md:w-2/3 text-center mx-auto mt-4 text-sm">
                  At [Business Name], we prioritize your privacy and are
                  committed to protecting your personal information.
                </p>
              </div>
            </div>
            <p class="text-red-400">{{ checkboxMessage }}</p>
            <div class="flex mt-10 md:w-1/2 md:mx-auto">
              <div class="mr-2">
                <input
                  type="checkbox"
                  id="myCheckbox"
                  class="focus:outline-none pl-3 border border-cyan-300"
                  v-model="isCheckboxChecked"
                />
              </div>

              <div class="w-11/12">
                <p class="text-sm">agree with terms and agreements</p>
              </div>
            </div>

            <div class="mx-auto w-1/2 mt-6 md:w-1/3 md:mx-auto">
              <p class="text-red-400 lg:w-25/10 -ml-30 mb-5">{{ errors }}</p>
              <button
                @click="handleRegister"
                class="bg-cyan-700 text-white px-8 py-2 rounded-sm cursor-pointer"
              >
                {{ submitText }}
              </button>
            </div>
            <div class="mt-5 w-12/13 mx-auto md:w-2/3 md:mx-auto">
              <p class="md:text-lg text-sm text-center">
                Do you have an account ?
                <span class="text-cyan-500">Login</span>
              </p>
            </div>
            <!-- <div class="mt-5 w-12/13 mx-auto md:w-2/3 md:mx-auto">
              <p class="md:text-lg text-sm text-center"> Do you have an account ? <span class="text-cyan-500 cursor-pointer">Login</span> </p>
          </div> -->
            <p
              class="text-gray-400 text-center"
              @click="
                () => {
                  this.$router.push('/signup');
                }
              "
            >
              Back to previous page
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="hidden lg:block w-2/3 mx-auto pb-20 pt-10">
      <div class="flex justify-between">
        <div class="bg-[#BDE5F2] rounded-l-md px-10 pt-20 w-1/2 pb-20">
          <div class="w-2/3 mx-auto">
            <img src="/public/logolarge.png" alt="" />
          </div>
          <h1 class="mt-20 text-center font-bold w-3/4">
            Elevate Your Business Online
          </h1>
          <p class="text-sm w-10/11 mx-auto mt-16">
            An online platform designed to showcase your products and services,
            connect with customers, and enhance your brand's visibility. This
            website serves as a critical tool for engaging with your audience,
            providing essential information, and facilitating transactions. It
            typically includes features such as an about page, product listings,
            a blog for content marketing, customer testimonials, and contact
            information to fost er communication and trust.
          </p>
          <div
            style="
              background: linear-gradient(
                to bottom left,
                #8ae4ff 0%,
                #ffffff 48%,
                #00d2ea 98%
              );
            "
            class="rounded-xl shadow-md w-5/6 pb-5 mx-auto pt-7 pr-4 mt-30"
          >
            <div class="flex justify-between">
              <div class="w-1/3">
                <img src="/public/logo.png" alt="" />
              </div>
              <div class="">
                <p class="">Privacy Information</p>
              </div>
            </div>
            <div>
              <p class="w-7/8 text-center mx-auto mt-4">
                At [Business Name], we prioritize your privacy and are committed
                to protecting your personal information.
              </p>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-r-md w-2/3 mx-auto px-10 pb-20">
          <h1 class="mt-10 w-1/2 mx-auto text-xl text-center">
            Create and account
          </h1>
          <div class="flex justify-between w-1/4 mx-auto text-gray-400 mt-7">
            <div><i class="fa-brands fa-facebook-f text-2xl"></i></div>
            <div><i class="fa-brands fa-twitter text-2xl"></i></div>
            <div><i class="fa-brands fa-linkedin-in text-2xl"></i></div>
          </div>
          <p class="w-1/2 text-center mx-auto mt-6 text-gray-400">
            fill the form for registration
          </p>
          <div>
            <div class="mt-4">
              <div class="flex">
                <div>
                  <p>Password</p>
                </div>
                <div>
                  <p class="text-red-400 mt-1 ml-1">*</p>
                </div>
              </div>
              <div class="mt-2 relative">
                <input
                  :type="isPasswordVisible ? 'text' : 'password'"
                  class="border focus:outline-none pl-3 er-2 rounded-xl border-blue-300 w-13/13 md:h-12"
                  v-model="model.user.password"
                  @input="checkPasswordStrength(), validate()"
                />
                <span
                  @click="togglePasswordVisibility"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                >
                  <i
                    :class="
                      isPasswordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'
                    "
                  ></i>
                </span>
              </div>
              <div v-if="errors.password" class="text-red-400 mt-1">
                {{ errors.password }}
              </div>
              <p :class="passwordStrengthClass">
                {{ passwordStrengthMessage }}
              </p>
              <ul>
                <li
                  :class="{
                    'text-green-500': criterion.met,
                    'text-red-500': !criterion.met,
                  }"
                  v-for="(criterion, index) in passwordCriteria"
                  :key="index"
                >
                  <span>
                    {{ criterion.text }}
                    <span v-if="criterion.met"
                      ><i class="fa-solid fa-check"></i
                    ></span>
                    <span v-else class="ml-1"
                      ><i class="fa-solid fa-xmark"></i
                    ></span>
                  </span>
                </li>
              </ul>
            </div>
            <div class="mt-9">
              <div class="flex">
                <div>
                  <p>Confirm password</p>
                </div>
                <div>
                  <p class="text-red-400 mt-1 ml-1">*</p>
                </div>
              </div>
              <div class="mt-2 relative">
                <input
                  :type="isConfirmPasswordVisible ? 'text' : 'password'"
                  class="border focus:outline-none pl-3 er-2 rounded-xl border-blue-300 w-13/13 md:h-12"
                  v-model="model.user.password_confirmation"
                  @input="validatePasswords(), validate()"
                />
                <span
                  @click="toggleConfirmPasswordVisibility"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                >
                  <i
                    :class="
                      isConfirmPasswordVisible
                        ? 'fas fa-eye-slash'
                        : 'fas fa-eye'
                    "
                  ></i>
                </span>
              </div>
            </div>
            <div v-if="errors.password_confirmation" class="text-red-400 mt-1">
              {{ errors.password_confirmation }}
            </div>
            <p v-if="passwordError" class="text-red-500 mt-2">
              Passwords do not match.
            </p>

            <div class="mt-5">
              <div><p class="mb-4">Profile picture</p></div>
              <div class="-ml-40 mt-10">
                <div
                  class="border-gray-300 h-32 mt-4 flex items-center justify-center cursor-pointer"
                  @dragover.prevent="handleDragOver"
                  @drop.prevent="handleFileDrop"
                  @click="triggerFileInput"
                >
                  <img src="/dragfile.png" alt="" class="w-1/2 mx-auto" />
                </div>
                <input
                  type="file"
                  class="hidden"
                  @change="handleFileUpload"
                  accept="image/*"
                  id="fileInput"
                />
                <label
                  for="fileInput"
                  class="bg-cyan-500 ml-65 mt-10 text-white px-6 py-2 rounded-md cursor-pointer"
                  style="display: inline-block"
                >
                  Browse
                </label>
                <p class="text-gray-500 mt-2 text-center font-semibold text-lg">
                  or drag a file here
                </p>
              </div>

              <p v-if="uploaded" class="mb-4 mt-4 text-cyan-400">
                {{ uploaded }}
              </p>
              <div v-if="userPhoto" class="mt-4">
                <img
                  :src="userPhoto"
                  alt="Uploaded Image"
                  class="max-w-full h-auto rounded-md"
                />
              </div>
            </div>
            <!-- <div class="col-span-full">
          <label for="cover-photo" class="block text-sm/6 font-medium text-gray-900">Cover photo</label>
          <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div class="text-center">
              <svg class="mx-auto size-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon">
                <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clip-rule="evenodd" />
              </svg>
              <div class="mt-4 flex text-sm/6 text-gray-600">
                <label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500">
                  <span>Upload a file</span>
                  <input id="file-upload" name="file-upload" type="file" class="sr-only">
                </label>
                <p class="pl-1">or drag and drop</p>
              </div>
              <p class="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div> -->
            <!-- </div> -->
            <!-- </div> -->
            <div v-if="errors.profile_picture_url" class="text-red-400 mt-1">
              {{ errors.profile_picture_url }}
            </div>
            <!-- <p class="text-center mt-10 -ml-57 text-cyan-500">{{ uploaded }}</p> -->

            <!-- <img v-if="userPhoto" :src="userPhoto" alt="Uploaded Photo" class="mt-10 "/> -->
            <div class="mt-9">
              <p class="text-red-400">{{ checkboxMessage }}</p>
              <div class="flex w-3/4 mx-auto">
                <div class="mt-2">
                  <input
                    type="checkbox"
                    id="myCheckbox"
                    class="focus:outline-none pl-3 border-2 rounded-xl border-blue-300 md:h-12"
                    v-model="isCheckboxChecked"
                  />
                </div>

                <p class="mt-4 ml-3">agree with terms and agreements</p>
              </div>
              <p v-if="passwordError" class="text-red-500 mt-2">
                Passwords do not match.
              </p>
            </div>

            <div class="mx-auto w-1/2 mt-4 md:w-1/3 md:mx-auto">
              <p class="text-red-400 lg:w-25/10 -ml-30 mb-5" v-if="errors">
                {{ errors }}
              </p>
              <button
                :disabled="isButtonDisabled"
                :class="{
                  'bg-gray-200  cursor-not-allowed': isButtonDisabled,
                  'bg-cyan-700 hover:bg-cyan-500 cursor-pointer':
                    !isButtonDisabled,
                }"
                @click="handleRegister"
                class="bg-cyan-700 text-white px-10 py-2 lg:w-11/10 lg:mx-auto rounded-sm text-lg cursor-pointer"
              >
                {{ submitText }}
              </button>
              <!-- <button  @click="completeRegistration" class="bg-cyan-700 text-white px-14 py-2 rounded-sm text-lg cursor-pointer mt-10" >complate</button> -->
              <p
                class="text-cyan-500 underline text-center w-12/11 mt-4 cursor-pointer"
                @click="
                  () => {
                    this.$router.push('/signup');
                  }
                "
              >
                Back to previous page
              </p>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  </UserLayout>
</template>

<script>
import axios from "axios";
import { ref, onMounted, watch, computed } from "vue";
import UserLayout from "@/layout/UserLayout.vue";
import { login, register, updateUserPassword } from "../../auth";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  updatePassword,
} from "firebase/auth"; // Import Firebase Auth functions
import { useRouter } from "vue-router";
import CryptoJS from "crypto-js";
// import { updateUserPassword } from './auth';

export default {
  components: {
    UserLayout,
  },
  setup() {
    const base_url = "";

    const model = ref({
      user: {
        name: "",
        email: "",
        phone_number: "",
        city: "",
        sub_city: "",
        location: "",
        password: "",
        password_confirmation: "",
        verification_status: "unverified",
        profile_picture_url: "",
        role: "user",
        is_banned: 1,
      },
    });

    const router = useRouter();
    const file = ref(null);
    const uploadPreset = "ml_default";
    const cloudName = "dzofoegwf";
    const errors = ref("");
    const uploaded = ref("");
    const checkboxMessage = ref("");
    const registered = ref(false);
    const userPhoto = ref("");
    const passwordError = ref(false);
    const passwordStrengthMessage = ref("");
    const passwordStrengthClass = ref("");
    const isPasswordStrong = ref(false);
    const isPasswordVisible = ref(false);
    const isConfirmPasswordVisible = ref(false);
    const isLoading = ref("Submit");
    const isCheckboxChecked = ref(false);
    const submitText = ref("Submit");

    const errorss = ref("");
    const validate = () => {
      errors.value = "";
      if (!model.value.user.password)
        errors.value.password = "password is required.";
      if (!model.value.user.password_confirmation)
        errors.value.password_confirmation = "password is required.";
      if (!model.value.user.profile_picture_url)
        errors.value.profile_picture_url = "profile picture is required.";
    };
    const isButtonDisabled = computed(() => {
      return (
        !model.value.user.password ||
        !model.value.user.password_confirmation ||
        !model.value.user.profile_picture_url
      );
    });
    watch(isCheckboxChecked, (newValue) => {
      if (newValue) {
        checkboxMessage.value = "";
      }
    });
    watch(isButtonDisabled, (newValue) => {
      if (newValue) {
        console.log("Button is disabled");
      } else {
        console.log("Button is enabled");
      }
    });
    const passwordCriteria = ref([
      { text: "At least 8 characters", met: false },
      { text: "At least one number", met: false },
      { text: "At least one uppercase letter", met: false },
      { text: "At least one lowercase letter", met: false },
      { text: "At least one special character", met: false },
    ]);

    const checkPasswordStrength = () => {
      const password = model.value.user.password;
      const lengthCriteria = password.length >= 8;
      const numberCriteria = /\d/.test(password);
      const uppercaseCriteria = /[A-Z]/.test(password);
      const lowercaseCriteria = /[a-z]/.test(password);
      const specialCharCriteria = /[!@#$%^&*(),.?":{}|<>]/.test(password);

      passwordCriteria.value[0].met = lengthCriteria;
      passwordCriteria.value[1].met = numberCriteria;
      passwordCriteria.value[2].met = uppercaseCriteria;
      passwordCriteria.value[3].met = lowercaseCriteria;
      passwordCriteria.value[4].met = specialCharCriteria;

      if (
        lengthCriteria &&
        numberCriteria &&
        uppercaseCriteria &&
        lowercaseCriteria &&
        specialCharCriteria
      ) {
        passwordStrengthMessage.value = "Strong Password";
        passwordStrengthClass.value = "text-green-500";
        isPasswordStrong.value = true;
      } else if (
        lengthCriteria &&
        (numberCriteria || uppercaseCriteria || lowercaseCriteria)
      ) {
        passwordStrengthMessage.value = "Moderate Password";
        passwordStrengthClass.value = "text-yellow-500";
        isPasswordStrong.value = false;
      } else {
        passwordStrengthMessage.value = "Weak Password";
        passwordStrengthClass.value = "text-red-500";
        isPasswordStrong.value = false;
      }
    };

    const validatePasswords = () => {
      passwordError.value =
        model.value.user.password !== model.value.user.password_confirmation;
    };
    const handleFileUpload = (event) => {
      file.value = event.target.files[0];
      if (file.value) {
        uploadFile();
      }
    };

    const uploadFile = async () => {
      uploaded.value = "Uploading...";
      if (!file.value) return;

      const timestamp = Math.floor(Date.now() / 1000);
      const params = {
        timestamp,
        upload_preset: uploadPreset,
      };

      const { signature } = generateSignature(params);

      const formData = new FormData();
      formData.append("file", file.value);
      formData.append("upload_preset", uploadPreset);
      formData.append("timestamp", timestamp);
      formData.append("signature", signature);
      formData.append("api_key", "734174595538154");

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
          formData
        );
        uploaded.value = "Photo Uploaded Successfully";
        userPhoto.value = response.data.secure_url;
        console.log("Upload response:", userPhoto.value);
        model.value.user.profile_picture_url = response.data.secure_url;
      } catch (error) {
        uploaded.value = "Failed to upload photo";
        console.error("Error uploading file:", error.response.data);
      }
    };
    const handleFileDrop = (event) => {
      const files = event.dataTransfer.files;
      if (files.length) {
        file.value = files[0];
        uploadFile();
      }
    };
    const handleDragOver = (event) => {
      event.preventDefault();
    };
    const triggerFileInput = () => {
      document.getElementById("fileInput").click();
    };
    const generateSignature = (params) => {
      const apiSecret = "A5D7SF1aLxGmy_TUAao-iA5C3rM";
      const sortedParams =
        Object.entries(params)
          .sort()
          .map(([key, value]) => `${key}=${value}`)
          .join("&") + apiSecret;

      const signature = CryptoJS.SHA1(sortedParams).toString(CryptoJS.enc.Hex);
      return { signature };
    };

    const handleRegister = async () => {
      validate();
      if (Object.keys(errors.value).length > 0) return;
      submitText.value = "Loading...";
      const email = model.value.user.email.trim().toLowerCase();
      const password = model.value.user.password;
      const token = localStorage.getItem('token');
      const name = model.value.user.name;
      const phone_number = model.value.user.phone_number;
      const city = model.value.user.city;
      const sub_city = model.value.user.sub_city;
      //const location = model.value.user.location;
      const verification_status = model.value.user.verification_status;
      const is_banned = model.value.user.is_banned;
      const role = model.value.user.role;
      const profile_picture_url = model.value.user.profile_picture_url;
      const password_confirmation = model.value.user.password_confirmation;
      const checkbox = document.getElementById("myCheckbox");

      if (!isCheckboxChecked.value) {
        submitText.value = "Submit";
        checkboxMessage.value =
          "Please agree to the terms and agreements to proceed";

        return;
      }

      checkboxMessage.value = "";

      const userData = {
        email,
        //password,
        name,
        phone_number,
        city,
        sub_city,
        
        verification_status,
        is_banned,
        role,
        profile_picture_url,
        token
      };

      const auth = getAuth();

      try {
        const currentUser = auth.currentUser;

        if (!currentUser) {
          const tempPassword = Math.random().toString(36).slice(-8);

          const userCredential = await createUserWithEmailAndPassword(
            auth,
            userData.email,
            tempPassword
          );

          await sendEmailVerification(userCredential.user);
          alert("A verification email has been sent. Please check your inbox.");

          localStorage.setItem("temporaryPassword", tempPassword);

          return;
        } else {
          await currentUser.reload();

          if (currentUser.emailVerified) {
            const tempPassword = localStorage.getItem("temporaryPassword");
            const success = await updateUserPassword(
              email,
              tempPassword,
              password
            );

            if (success) {
              const response = await axios.post(
                `https://bizethio-backend-production-944c.up.railway.app/api/firebase-auth`,
                userData,
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );

              console.log("User registered successfully", response.data);
              submitText.value = "Registered";
              registered.value = true;

              localStorage.removeItem("name");
              localStorage.removeItem("email");
              localStorage.removeItem("phone_number");
              localStorage.removeItem("city");
              localStorage.removeItem("sub_city");
              localStorage.removeItem("pendingUserData");
              localStorage.removeItem("temporaryPassword");
              model.value.user.password = "";
              model.value.user.password_confirmation = "";
              model.value.user.profile_picture_url = "";

              isLoading.value = "Submit";
              router.push("/signin");
            }
          } else {
            alert(
              "Your email is not verified. Please verify your email before registering again."
            );
            submitText.value = "Submit";
            model.value.user.password = "";
            model.value.user.password_confirmation = "";
            model.value.user.profile_picture_url = "";
          }
        }
      } catch (error) {
        console.error(
          "Error during registration:",
          error.message || "An error occurred. Please try again."
        );
        errors.value = error.response
          ? error.response.data.message
          : "The Email is already taken.";
        submitText.value = "Submit";
        model.value.user.password = "";
        model.value.user.password_confirmation = "";
        model.value.user.profile_picture_url = "";
      }
    };
    onMounted(() => {
      model.value.user.name = localStorage.getItem("name") || "";
      model.value.user.email = localStorage.getItem("email") || "";
      model.value.user.phone_number =
        localStorage.getItem("phone_number") || "";
      model.value.user.city = localStorage.getItem("city") || "";
      model.value.user.sub_city = localStorage.getItem("sub_city") || "";
      model.value.user.location = localStorage.getItem("location") || "";
    });

    // Function to complete registration after email verification
    // const completeRegistration = async () => {
    //   const auth = getAuth(); // Get the current auth instance
    //   const user = auth.currentUser; // Get the current user
    //   const userData = JSON.parse(localStorage.getItem('pendingUserData'));

    //   if (!userData) {
    //     alert('No pending registration found. Please register first.');
    //     return;
    //   }

    //   if (!user || !user.emailVerified) {
    //     alert('Please verify your email address before completing registration.');
    //     return; // Prevent completion if email is not verified
    //   }

    //   try {
    //     // Step 3: Register the user's other details in the backend
    //     const response = await axios.post(`${base_url}/register`, userData, {
    //       headers: {
    //         'Content-Type': 'application/json'
    //       }
    //     });

    //     console.log('User registered successfully', response.data);
    //     registered.value = true;

    //     // Clear pending user data
    //     localStorage.removeItem('pendingUserData');

    //     // Redirect to sign-in page
    //     router.push('/signin');
    //   } catch (error) {
    //     console.error('Error during backend registration:', error.message || 'An error occurred. Please try again.');
    //     errors.value = error.response ? error.response.data.message : 'An error occurred. Please try again.';
    //   }
    // };

    const togglePasswordVisibility = () => {
      isPasswordVisible.value = !isPasswordVisible.value;
    };

    const toggleConfirmPasswordVisibility = () => {
      isConfirmPasswordVisible.value = !isConfirmPasswordVisible.value;
    };
    return {
      base_url,
      model,
      file,
      uploadPreset,
      cloudName,
      errors,
      uploaded,
      checkboxMessage,
      handleFileUpload,
      uploadFile,
      handleRegister,
      userPhoto,
      validatePasswords,
      passwordError,
      checkPasswordStrength,
      passwordStrengthMessage,
      passwordStrengthClass,
      isPasswordStrong,
      passwordCriteria,
      togglePasswordVisibility,
      toggleConfirmPasswordVisibility,
      isPasswordVisible,
      isConfirmPasswordVisible,
      isLoading,
      isCheckboxChecked,
      submitText,
      isButtonDisabled,
      handleFileDrop,
      triggerFileInput,
      handleDragOver,

      // handleRegister,
    };
  },
};
</script>
