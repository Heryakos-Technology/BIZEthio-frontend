<template>
  <UserLayoutUser>
    <div class="hidden lg:block -mt-12">
      <div class="pb-10">
        <div
          class="relative w-1/2 h-165 rounded-2xl overflow-hidden ml-100 pt-30 mx-auto"
        >
          <div class="absolute inset-0 bg-gray-100">
            <h1 class="text-center mt-8 font-bold text-xl w-1/2">
              SIgn In as a Campany
            </h1>
            <div class="w-9/10 mx-auto mt-10">
              <div class="flex">
                <div>
                  <p>User Name or Email:</p>
                </div>
              </div>
              <div class="mt-2">
                <input
                  type="email"
                  class="border focus:outline-none pl-3 er-2 rounded-xl border-blue-300 w-7/13 md:h-12"
                  v-model="email"
                  @input="validateEmail"
                />
                <p v-if="emailError" class="text-red-500 mt-5">
                  {{ emailError }}
                </p>
              </div>
            </div>
            <div class="w-9/10 mx-auto mt-10">
              <div class="flex">
                <div>
                  <p>Password</p>
                </div>
              </div>
              <!-- <div class="mt-2 relative">
                  <input
                    :type="isPasswordVisible ? 'text' : 'password'"
                    class="focus:outline-none pl-3 border-2 rounded-xl border-blue-300 w-1/2 md:h-12"
                    v-model="password"
                    @input="validatePassword"
                  />
                  <span
                  @click="togglePasswordVisibility"
                  class="absolute top-6 right-70 transform -translate-y-1/2 cursor-pointer text-gray-500"
                >
                  <i
                    :class="isPasswordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"
                  ></i>
                </span>
              </div> -->
              <div class="mt-2 relative">
                <input
                  :type="isPasswordVisible ? 'text' : 'password'"
                  class="border focus:outline-none pl-3 er-2 rounded-xl border-blue-300 w-7/13 md:h-12"
                  v-model="password"
                  @input="validatePassword()"
                />
                <span
                  @click="togglePasswordVisibility"
                  class="transform -translate-y-1/2 cursor-pointer"
                >
                  <i
                    :class="
                      isPasswordVisible
                        ? 'fas fa-eye-slash w-1/3 -ml-10 z-10 text-gray-500'
                        : 'fas fa-eye w-1/3 -ml-10 z-10 text-gray-500'
                    "
                  ></i>
                </span>
              </div>
              <p v-if="passwordError" class="text-red-500 mt-5">
                {{ passwordError }}
              </p>
            </div>
            <div class="mt-9 flex w-12/12 mx-auto font-light">
              <div class="md:text-lg md:w-1/2 md:mx-auto">
                <div class="flex w-2/3 mx-auto">
                  <div class="">
                    <input
                      type="checkbox"
                      class="border border-cyan-400"
                      id="rememberMe"
                    />
                  </div>
                  <div class="mx-auto">
                    <p class="text-cyan-500 text- cursor-pointer">
                      Remember me
                    </p>
                  </div>
                </div>
              </div>
              <div class="w-11/10 mx-auto -mt-5">
                <p
                  class="text-cyan-500 mt-6 cursor-pointer"
                  @click="
                    () => {
                      this.$router.push('/forgot');
                    }
                  "
                >
                  Forgot Password?
                </p>
              </div>
            </div>
            <div class="w-2/3 mx-auto mt-7" v-if="!loading2">
              <button
                @click="
                  () => {
                    handleLogin();
                  }
                "
                :disabled="isLoginButtonDisabled"
                :class="{
                  'bg-gray-200  cursor-not-allowed': isLoginButtonDisabled,
                  'bg-cyan-700 hover:bg-cyan-500 cursor-pointer':
                    !isLoginButtonDisabled,
                }"
                class="bg-cyan-700 text-white px-8 py-2 rounded-sm"
              >
                {{ signInMessage }}
              </button>
              <!-- <button @click="handleLogin2">
  sign in
                </button> -->
            </div>
            <div v-if="loading2" class="w-1/2 mx-auto py-20">
              <div
                class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-white -mt-10"
              ></div>
            </div>
            <div class="mt-5 w-12/10 mx-auto md:w-2/3 md:mx-auto ">
              <p class="md:text-lg text-sm w-12/10 mx-auto -ml-4 lg:text-sm">
                Don't You Register as a Campany ?
              </p>
              <br />
              <div class="">
                
                <span
                  class="text-cyan-500 cursor-pointer underline "
                  @click="
                    () => {
                      this.$router.push('/registration');
                    }
                  "
                  >Register as a Campany</span
                >
              </div>

              <!-- <p class="text-gray-400 text-sm mt-7 w-11/11 mx-auto">
                  Or connect with social media
                </p> -->
            </div>
            <!-- <div class="w-4/5 mx-auto text-white bg-cyan mt-5" v-if="!loading">
                <div class="w-3/4" v-if="!loading2">
                  <button
                    @click="signInWithGoogle"
                    style="
                      background: linear-gradient(
                        to bottom left,
                        #57b4d3 0%,
                        48%,
                        #57b4d3 98%
                      );
                    "
                    class="p1-1 py-2 rounded-3xl w-7/11 text-sm"
                  >
                    <i class="fa-brands fa-google -ml-6 mr-1"></i> Sign in with
                    Google
                  </button>
                </div>
                <div class="mt-3 w-3/4" v-if="!loading2">
                  <button
                    @click="signInWithFacebook"
                    style="
                      background: linear-gradient(
                        to bottom left,
                        #4584d7 0%,
                        48%,
                        #6b94c9 98%
                      );
                    "
                    class="pl-1 py-2 rounded-3xl w-7/11 text-sm"
                  >
                    <i class="fa-brands fa-facebook-f -ml-4 mr-1"></i> Sign in
                    with Facebook
                  </button>
                </div>
              </div> -->
            <div v-if="loading" class="w-1/2 mx-auto py-20">
              <div
                class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-white -mt-20"
              ></div>
            </div>
          </div>

          <div
            class="absolute right-0 top-0 pt-20 left-112 w-1/2 mx-auto h-full bg-[#BDE5F2] transform -skew-x-12"
          >
            <div class="w-2/3 mx-auto">
              <img
                src="/public/logolarge.png"
                alt=""
                class="pt-5 w-2/3 mx-auto -ml-8"
              />
              <h1 class="mt-36 text-xl w-12/12 -ml-3 mx-auto">Welcome Back</h1>
              <p class="text-sm font-normal w-13/13 -ml-10 mt-2 mx-auto">
                Sign in to continue access pages
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="px-2 py-5 lg:hidden">
      <div class="bg-white rounded-sm pb-10 lg:hidden">
        <img src="/public/logo.png" alt="" class="mx-auto pt-5" />
        <h1 class="text-center mt-8 font-bold text-xl">SIgn In as a Campany</h1>
        <!-- <div class="flex justify-between w-1/3 mx-auto text-gray-400 mt-4 md:w-1/5 md:mx-auto">
        <div><i class="fa-brands fa-facebook-f text-2xl"></i></div>
        <div><i class="fa-brands fa-twitter text-2xl"></i></div>
        <div><i class="fa-brands fa-linkedin-in text-2xl"></i></div>
    </div> -->
        <!-- <p class="text-gray-400 text-center mt-4">fill the form for registration</p> -->
        <div class="w-2/3 mx-auto mt-10">
          <div>
            <div class="flex">
              <div>
                <p>User Name or Email</p>
              </div>
            </div>
            <div class="mt-2">
              <input
                type="email"
                class="border-2 rounded-md focus:outline-none pl-3 border-blue-300 w-13/13 md:h-12"
                v-model="email"
              />
            </div>
          </div>

          <div class="mt-9">
            <div class="flex">
              <div>
                <p>Password</p>
              </div>
            </div>
            <div class="mt-2 relative">
              <input
                :type="isPasswordVisible ? 'text' : 'password'"
                class="border-2 rounded-md focus:outline-none pl-3 border-blue-300 w-13/13 md:h-12"
                v-model="password"
              />
              <span
                @click="togglePasswordVisibility"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                <i
                  :class="
                    isPasswordVisible
                      ? 'fas fa-eye-slash'
                      : 'fas fa-eye text-gray-500'
                  "
                ></i>
              </span>
            </div>
          </div>

          <div class="mt-9 flex w-1/2 mx-auto">
            <div class="md:text-xl md:w-2/3 md:mx-auto w-12/11">
              <div class="flex">
                <div class="mr-3">
                  <input
                    type="checkbox"
                    class="border border-cyan-400"
                    id="rememberMe"
                  />
                </div>
                <div class="w-12/11">
                  <p class="text-cyan-500 w-12/11">Remember me</p>
                </div>
              </div>
              <span
                class="text-cyan-500 mt-6 w-12/11 cursor-pointer hover:scale-200"
                @click="
                  () => {
                    this.$router.push('/forgot');
                  }
                "
                >Forgot Password?</span
              >
            </div>
          </div>
          <div class="mx-auto w-1/2 mt-6 md:w-1/3 md:mx-auto">
            <button
              @click="
                () => {
                  handleLogin();
                }
              "
              class="bg-cyan-700 text-white px-8 py-2 rounded-sm"
            >
              {{ signInMessage }}
            </button>
          </div>
          <div class="mt-5 w-12/13 mx-auto md:w-2/3 md:mx-auto ">
            <p class="md:text-lg text-sm text-center w-10/11">
              Don't You Register as a Campany ?
              <span
                class="text-cyan-500 cursor-pointer  hover:scale-200"
                @click="
                  () => {
                    this.$router.push('/registration');
                  }
                "
                >Register as a Campany</span
              >
            </p>
            <!-- <p class="text-gray-400 text-sm mt-2 w-10/11 text-center">
                Or connect with social media
              </p> -->
          </div>
          <!-- <div class="w-4/5 mx-auto text-white bg-cyan mt-10" v-if="!loading">
              <div>
                <button
                  @click="signInWithGoogle"
                  style="
                    background: linear-gradient(
                      to bottom left,
                      #57b4d3 0%,
                      48%,
                      #57b4d3 98%
                    );
                  "
                  class="p1-1 py-2 rounded-md w-11/11 text-sm"
                >
                  <i class="fa-brands fa-google -ml-6 mr-1"></i> Sign in with
                  Google
                </button>
              </div>
              <div class="mt-3">
                <button
                  @click="signInWithFacebook"
                  style="
                    background: linear-gradient(
                      to bottom left,
                      #4584d7 0%,
                      48%,
                      #6b94c9 98%
                    );
                  "
                  class="pl-1 py-2 rounded-md w-11/11 text-sm"
                >
                  <i class="fa-brands fa-facebook-f -ml-4 mr-1"></i> Sign in with
                  Facebook
                </button>
              </div>
            </div> -->
          <div v-if="loading" class="w-1/2 mx-auto py-20">
            <div
              class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-white -mt-8"
            ></div>
          </div>
        </div>
      </div>

      <div
        class="hidden lg:block w-2/3 mx-auto rounded-md"
        style="
          background: linear-gradient(
            to bottom right,
            #f5f5f5 10%,
            #f5f5f5 38%,
            #bde5f2 98%
          );
        "
      >
        <div class="flex">
          <div class="rounded-sm pb-10 w-1/2">
            <h1 class="text-center mt-8 font-bold text-xl">SIgn In</h1>
            <!-- <div class="flex justify-between w-1/3 mx-auto text-gray-400 mt-4 md:w-1/5 md:mx-auto">
        <div><i class="fa-brands fa-facebook-f text-2xl"></i></div>
        <div><i class="fa-brands fa-twitter text-2xl"></i></div>
        <div><i class="fa-brands fa-linkedin-in text-2xl"></i></div>
    </div> -->
            <!-- <p class="text-gray-400 text-center mt-4">fill the form for registration</p> -->
            <div class="w-2/3 mx-auto mt-10">
              <div>
                <div class="flex">
                  <div>
                    <p>User Name or Email</p>
                  </div>
                </div>
                <div class="mt-2">
                  <input
                    type="emailx"
                    class="border-2 rounded-md focus:outline-none pl-3 border-blue-300 w-13/13 md:h-12"
                    v-model="email"
                  />
                </div>
              </div>

              <div class="mt-9">
                <div class="flex">
                  <div>
                    <p>Password</p>
                  </div>
                </div>
                <div class="mt-2">
                  <input
                    type="password"
                    class="border-2 rounded-md focus:outline-none pl-3 border-blue-300 w-13/13 md:h-12"
                    v-model="password"
                  />
                </div>
              </div>

              <div class="mt-9 flex w-1/2 mx-auto">
                <div class="md:text-xl md:w-2/3 md:mx-auto w-12/11">
                  <div class="flex">
                    <div class="mr-3">
                      <input
                        type="checkbox"
                        class="border border-cyan-400"
                        id="rememberMe"
                      />
                    </div>
                    <div class="w-12/11">
                      <p class="text-cyan-500 w-12/11">Remember me</p>
                    </div>
                  </div>
                  <span
                    class="text-cyan-500 mt-6 w-12/11"
                    @click="
                      () => {
                        this.$router.push('/forgot');
                      }
                    "
                    >Forgot Password?</span
                  >
                </div>
              </div>
              <div class="mx-auto w-1/2 mt-6 md:w-1/3 md:mx-auto">
                <button
                  @click="
                    () => {
                      handleLogin;
                    }
                  "
                  :class="{
                    'bg-gray-200  cursor-not-allowed': isLoginButtonDisabled,
                    'bg-cyan-700 hover:bg-cyan-500 cursor-pointer':
                      !isLoginButtonDisabled,
                  }"
                  class="bg-cyan-700 text-white px-8 py-2 rounded-sm"
                >
                  Continue
                </button>
              </div>
              <div class="mt-5 w-12/13 mx-auto md:w-2/3 md:mx-auto">
                <p class="md:text-lg text-sm text-center w-10/11">
                  Don't have an account ?
                  <span class="text-cyan-500">Sign Up</span>
                </p>
                <!-- <p class="text-gray-400 text-sm mt-2 w-10/11 text-center">
                    Or connect with social media
                  </p> -->
              </div>
              <!-- <div
                  class="w-4/5 mx-auto text-white bg-cyan mt-10"
                  v-if="!loading"
                >
                  <div>
                    <button
                      @click="signInWithGoogle"
                      style="
                        background: linear-gradient(
                          to bottom left,
                          #57b4d3 0%,
                          48%,
                          #57b4d3 98%
                        );
                      "
                      class="p1-1 py-2 rounded-md w-11/11 text-sm"
                    >
                      <i class="fa-brands fa-google -ml-6 mr-1"></i> Sign in with
                      google
                    </button>
                  </div>
                  <div class="mt-3">
                    <button
                      @click="signInWithFacebook"
                      style="
                        background: linear-gradient(
                          to bottom left,
                          #4584d7 0%,
                          48%,
                          #6b94c9 98%
                        );
                      "
                      class="pl-1 py-2 rounded-md w-11/11 text-sm"
                    >
                      <i class="fa-brands fa-facebook-f -ml-4 mr-1"></i> Sign in
                      with Facebook
                    </button>
                  </div>
                </div> -->
              <div v-if="loading" class="w-1/2 mx-auto py-20">
                <div
                  class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-white -mt-8"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </UserLayoutUser>
</template>

<script>
import { ref, onMounted, computed, watch } from "vue";
import UserLayoutUser from "@/layout/UserLayoutUser.vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { login } from "../../auth";
import { auth, googleProvider, facebookProvider } from "..//../firebase";
import { useToast } from 'vue-toast-notification';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  fetchSignInMethodsForEmail,
} from "firebase/auth";

export default {
  components: {
    UserLayoutUser,
  },
  setup() {
    const $toast = useToast();
    const authError = ref(null);
    const router = useRouter();
    const base_url = "";
    const email = ref("");
    const password = ref("");
    const currentUser = ref("");
    const isRemembered = ref(false);
    const signInMessage = ref("Continue");
    const emailError = ref("");
    const passwordError = ref("");
    const isPasswordVisible = ref(false);
    const loading = ref(false);
    const loading2 = ref(false);

    const isLoginButtonDisabled = computed(() => {
      return email.value.trim() === "" || password.value.trim() === "";
    });
    const togglePasswordVisibility = () => {
      isPasswordVisible.value = !isPasswordVisible.value;
    };

    //google
    const signInWithGoogle = async () => {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        loading.value = true;
        const user = result.user;
        console.log("User signed in:", user);

        // Get the Firebase token
        const token = await user.getIdToken();
        console.log("Firebase Token:", token);
        localStorage.setItem("token", token);

        if (!token) {
          console.error("Failed to retrieve token.");
          return;
        }

        // Check if the user already exists in your backend
        const response = await checkUserExists(user.email); // Implement this function

        if (response.exists) {
          // User already exists, store user ID and redirect
          localStorage.setItem("user_id", response.userId);
          console.log("User already exists. Redirecting to user profile...");
          router.push("//profile/company");
          loading.value = false;
          signInMessage.value = "Sent";
        } else {
          // User does not exist, register the user
          await registerUser(user, token);
          console.log(
            "User registered successfully. Redirecting to user profile..."
          );
          router.push("//profile/company");
          loading.value = false;
          signInMessage.value = "Sent";
        }
      } catch (error) {
        console.error("Error signing in with Google:", error);
        loading.value = false;
            $toast.error("Error signing in with Google", {
        position: 'top'
      });
        // alert(error);
      }
    };

    // Example function to check if user exists
    const checkUserExists = async (email) => {
      try {
        const response = await axios.post(
          "https://your-backend-url/api/check-user",
          { email }
        );
        return { exists: response.data.exists, userId: response.data.userId };
      } catch (error) {
        console.error("Error checking user existence:", error);
        return { exists: false };
      }
    };

    const auth = getAuth();
    const facebookProvider = new FacebookAuthProvider();

    const signInWithFacebook = async () => {
      try {
        loading.value = true;
        const result = await signInWithPopup(auth, facebookProvider);
        const user = result.user;
        console.log("User signed in:", user);

        // Get the Firebase token
        const token = await user.getIdToken();
        localStorage.setItem("token", token);

        if (!token) {
          console.error("Failed to retrieve token.");
          return;
        }

        // Check if the user already exists in your backend
        const response = await checkUserExists(user.email);

        if (response.exists) {
          // User already exists, store user ID and redirect
          localStorage.setItem("user_id", response.userId);
          console.log("User already exists. Redirecting to user profile...");
          router.push("//profile/company");
          loading.value = false;
          signInMessage.value = "Sent";
        } else {
          // User does not exist, register the user
          await registerUser(user, token);
          console.log(
            "User registered successfully. Redirecting to user profile..."
          );
          router.push("//profile/company");
          signInMessage.value = "Sent";
        }
      } catch (error) {
        if (error.code === "auth/account-exists-with-different-credential") {
          loading.value = false;

          const email = error.email;
          const methods = await fetchSignInMethodsForEmail(auth, email); // Check linked providers

          console.log(
            "User exists with different credential providers:",
            methods
          );
          signInMessage.value =
            "This email is linked to another account. Please sign in with that provider.";
        } else {
          console.error("Error signing in with Facebook:", error);
          loading.value = false;
          signInMessage.value = "";
        }
      }
    };

    //   const registerUser = async (user, token) => {
    //     try {
    //       const response = await axios.post(
    //         `https://bizethio-backend-production-daf6.up.railway.app//api/firebase-auth`,
    //         {
    //           //name: user.displayName,
    //           email: user.email,
    //           token: token,
    //           profile_picture_url: user.photoURL,
    //           // phone_number:'0988283088',
    //           //  is_banned: 1,
    //           // : "admin",
    //           //verification_status: "unverified",
    //         }
    //       );

    //       const backendToken = response.data.token;
    //       const campanyData = response.data.user;
    //       localStorage.setItem("userInfo", JSON.stringify(campanyData));
    //       console.log("User registered in backend:", response.data.user);
    //       localStorage.setItem("user_id", response.data.user.id);
    //       axios.defaults.headers.common[
    //         "Authorization"
    //       ] = `Bearer ${backendToken}`;
    //       if (token) {
    //         console.log("Redirecting to user profile...");
    //         router.push("//profile/company");
    //         loading2.value = false;
    //         signInMessage.value = "Sent";
    //       }
    //     } catch (error) {
    //       console.error(
    //         "Error registering user:",
    //         error.response ? error.response.data : error.message
    //       );
    //     }
    //   };
    const validateEmail = () => {
      emailError.value = "";
      if (!email.value) {
        emailError.value = "Email is required.";
      } else if (!/\S+@\S+\.\S+/.test(email.value)) {
        emailError.value = "Please enter a valid email address.";
      }
    };
    const validatePassword = () => {
      passwordError.value = "";
      if (!password.value) {
        passwordError.value = "Password is required.";
      }
    };
    const setRememberMeState = () => {
      const rememberedValue = localStorage.getItem("rememberMe");
      isRemembered.value = rememberedValue === "true";
      const rememberMe = document.getElementById("rememberMe");
      if (rememberMe) {
        rememberMe.checked = isRemembered.value;
      }
    };

    const handleRememberMeChange = () => {
      localStorage.setItem("rememberMe", isRemembered.value);
    };

    onMounted(() => {
      setRememberMeState();

      const rememberMe = document.getElementById("rememberMe");
      if (rememberMe) {
        rememberMe.addEventListener("change", () => {
          isRemembered.value = rememberMe.checked;
          handleRememberMeChange();
        });
      }
    });
   const handleLogin2 = async () => {
  try {
    const { userCredential } = await login(email.value, password.value);
    const user = userCredential.user;
    const token = await user.getIdToken();

    const response = await axios.post(
      "https://bizethio-backend-production-daf6.up.railway.app//api/company/login",
      {
        contact_email: email.value,
        password: password.value,
        token: token,
      }
    );

    const data = response.data;

    if (data.status === "rejected") {
               $toast.error("Login failed:" (data.message || "Invalid credentials"), {
        position: 'top'
      });
      // alert("Login failed: " + (data.message || "Invalid credentials"));
      return;
    }

    console.log("company", data);
    router.push("/profile/company");

  } catch (error) {
    console.error("Error during login:", error);
              $toast.error("An error occurred during login. Please try again.", {
        position: 'top'
      });
    // alert("An error occurred during login. Please try again.");
  }
};

    const handleLogin = async () => {
      emailError.value = "";
      passwordError.value = "";
      signInMessage.value = "Loading...";

      // Basic email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email.value)) {
        emailError.value = "Invalid email format.";
        return;
      }

      try {
        const { userCredential } = await login(email.value, password.value);
        const user = userCredential.user;

        if (user) {
          const token = await user.getIdToken();
          localStorage.setItem("token", token);
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          signInMessage.value = "Continue";
          console.log("token", token);
          console.log("Redirecting to user profile with :");

          loading2.value = true;
          const response = await axios.post(
            `https://bizethio-backend-production-daf6.up.railway.app//api/company/login`,
            {
              contact_email: email.value,
              password: password.value,
              token: token,
            }
          );
          //campany sign in
          const backendToken = response.data.token;
          const campanyData = response.data.company;

          console.log("Token from backend:", backendToken);
          console.log("User from backend:", campanyData);
          //local storage
          //localStorage.setItem("token", backendToken);

    if (campanyData.status === "rejected") {
      // alert("Login failed: " + (campanyData.message || "Invalid credentials"));
           $toast.error("You are band user you can't login to this sight", {
        position: 'top'
      });
      loading2.value = false;
      return;
    }


          localStorage.setItem("campanyID", campanyData.id);
          localStorage.setItem("userInfo", JSON.stringify(campanyData));

          localStorage.setItem("user_name", campanyData.owner_name);

          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${backendToken}`;

          if (token) {
            // console.log("Redirecting to user profile...");
            router.push(`/profile/company/${campanyData.id}`);
            loading2.value = false;
            signInMessage.value = "Sent";
          }
        } else {
                    $toast.error("User is not authenticated", {
        position: 'top'
      });
          // alert("User is not authenticated.");
          loading2.value = false;
          signInMessage.value = "Submit";
          // (email.value = ""), (password.value = "");
        }
      } catch (error) {
        signInMessage.value = "Submit";
        console.error("Login error:", error.message);
        loading2.value = false;
        // (email.value = ""), (password.value = "");
                       $toast.error("Invalid email or password", {
        position: 'top'
      });
        // alert(error.message);
      }
    };

    return {
      base_url,
      email,
      password,
      currentUser,
      handleLogin2,
      handleLogin,
      isRemembered,
      signInMessage,
      isLoginButtonDisabled,
      emailError,
      passwordError,
      validateEmail,
      validatePassword,
      signInWithGoogle,
      signInWithFacebook,
      authError,
      // registerUser,
      togglePasswordVisibility,
      isPasswordVisible,
      loading,
      loading2,
      // handleLogin2
    };
  },
};
</script>

<style></style>
