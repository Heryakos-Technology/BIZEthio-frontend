<template>
  <UserLayout>
    <div class="hidden lg:block pt-10">
      <div class="pt-10 pb-10">
        <div
          class="relative w-1/2 h-165 rounded-2xl overflow-hidden ml-100 pt-30 mx-auto"
        >
          <div class="absolute inset-0 bg-gray-100">
            <h1 class="text-center mt-8 font-bold text-xl w-1/2">SIgn In</h1>
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
                  class=" transform -translate-y-1/2 cursor-pointer"
                >
                  <i
                    :class="
                      isPasswordVisible ? 'fas fa-eye-slash w-1/3 -ml-10 z-10 text-gray-500' : 'fas fa-eye w-1/3 -ml-10 z-10 text-gray-500'
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
            <div class="w-2/3 mx-auto mt-7">
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
            </div>
            <div class="mt-5 w-12/10 mx-auto md:w-2/3 md:mx-auto">
              <p class="md:text-lg text-sm w-12/10 mx-auto -ml-4 lg:text-sm">
                Don't have an account ?
                <span
                  class="text-cyan-500 cursor-pointer"
                  @click="
                    () => {
                      this.$router.push('/signup');
                    }
                  "
                  >Sign Up</span
                >
              </p>
              <p class="text-gray-400 text-sm mt-7 w-11/11 mx-auto">
                Or connect with social media
              </p>
            </div>
            <div class="w-4/5 mx-auto text-white bg-cyan mt-5">
              <div class="w-3/4">
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
              <div class="mt-3 w-3/4">
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
                  :class="isPasswordVisible ? 'fas fa-eye-slash' : 'fas fa-eye text-gray-500'"
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
                class="text-cyan-500 mt-6 w-12/11 cursor-pointer"
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
                  handleLogin
                }
              "
              class="bg-cyan-700 text-white px-8 py-2 rounded-sm"
            >
              {{ signInMessage }}
            </button>
          </div>
          <div class="mt-5 w-12/13 mx-auto md:w-2/3 md:mx-auto">
            <p class="md:text-lg text-sm text-center w-10/11">
              Don't have an account ?
              <span
                class="text-cyan-500 cursor-pointer"
                @click="
                  () => {
                    this.$router.push('/signup');
                  }
                "
                >Sign Up</span
              >
            </p>
            <p class="text-gray-400 text-sm mt-2 w-10/11 text-center">
              Or connect with social media
            </p>
          </div>
          <div class="w-4/5 mx-auto text-white bg-cyan mt-10">
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
                      handleLogin
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
                <p class="text-gray-400 text-sm mt-2 w-10/11 text-center">
                  Or connect with social media
                </p>
              </div>
              <div class="w-4/5 mx-auto text-white bg-cyan mt-10">
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
              </div>
            </div>
          </div>
          <!-- <div class="w-1 h-full bg-black transform  absolute left-171 rotate-6">

      </div> -->
        </div>
      </div>
    </div>
  </UserLayout>
</template>

<script>
import { ref, onMounted, computed, watch } from "vue";
import UserLayout from "@/layout/UserLayout.vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { login } from "../../auth";
import { auth, googleProvider, facebookProvider } from "..//../firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, fetchSignInMethodsForEmail  } from "firebase/auth";


export default {
  components: {
    UserLayout,
  },
  setup() {
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
    const user = result.user;
    console.log("User signed in:", user);

    // Get the Firebase token
    const token = await user.getIdToken();
    console.log("Firebase Token:", token); 
    localStorage.setItem('token',token)

    if (!token) {
      console.error("Failed to retrieve token.");
      return;
    }

    // Register the user with the backend, including the token
    await registerUser(user, token);
    
  } catch (error) {
    console.error("Error signing in with Google:", error);
  }
};


const auth = getAuth();
const facebookProvider = new FacebookAuthProvider();



const signInWithFacebook = async () => {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    const user = result.user;
    console.log('User signed in:', user);

    const token = await user.getIdToken();
    console.log("Firebase Token:", token);
    localStorage.setItem('token',token)

    if (!token) {
      console.error("Failed to retrieve token.");
      return;
    }

    await registerUser(user, token); // Ensure registerUser properly handles the token
  } catch (error) {
    console.error("Error signing in with Facebook:", error);

    if (error.code === "auth/account-exists-with-different-credential") {
      const email = error.customData?.email; // Check email in customData
      const pendingCred = FacebookAuthProvider.credentialFromError(error); // Store pending Facebook credential

      if (email) {
        try {
          const signInMethods = await fetchSignInMethodsForEmail(auth, email);
          console.log(`Account exists with the following providers: ${signInMethods.join(', ')}`);

          if (signInMethods.includes('google.com')) {
            const provider = new GoogleAuthProvider();
            const googleResult = await signInWithPopup(auth, provider);
            const existingUser = googleResult.user;
            console.log('User signed in with Google:', existingUser);

            // Link the Facebook credential after successful Google sign-in
            if (pendingCred) {
              await existingUser.linkWithCredential(pendingCred);
              console.log("Facebook account linked to Google account.");
            }

            await registerUser(existingUser, await existingUser.getIdToken());
          } else {
            console.error("Existing provider not handled.");
            alert("Please sign in with the provider you used before.");
          }
        } catch (fetchError) {
          console.error('Error fetching sign-in methods:', fetchError);
        }
      } else {
        console.error("No email identifier found in the error.");
        alert("An account with this email exists but we can't determine the provider. Please sign in using another method.");
      }
    }
  }
};


const registerUser = async (user, token) => {
  try {
    const response = await axios.post(`https://bizethio-backend-production-944c.up.railway.app/api/firebase-auth`, {
      name: user.displayName,
      email: user.email,
      token: token, 
    });
    console.log('User registered in backend:', response.data);
  } catch (error) {
    console.error('Error registering user:', error.response ? error.response.data : error.message);
  }
};
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

    // const handleLogin2 = async () => {
    //   try {
    //     await login(email.value, password.value);
    //     alert("Logged in successfully!");
    //   } catch (error) {
    //     alert(error.message);
    //   }
    // };
//     const handleLogin2 = async () => {
//   try {
//     signInMessage.value = "Loading...";
//     const userCredential = await login(email.value, password.value); 
//     const user = userCredential.user; 
//     const token = await user.getIdToken(); 
//     localStorage.setItem("token", token);
//     axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//     alert("Logged in successfully!");
//     if (token) {
//             signInMessage.value = "Sent";
//             console.log("Redirecting to user profile...");
//             router.push("/UserProfile");
//           }
//     console.log("User Token:", token); 
//   } catch (error) {
//     alert(error.message);
//   }
// };
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
    // First, call handleLogin2 to log in with Firebase and get the token
    const { userCredential, role } = await login(email.value, password.value);
    const user = userCredential.user;

    // Check if user is authenticated
    if (user) {
      const token = await user.getIdToken();
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      alert("Logged in successfully!");
      signInMessage.value = "Loading";
      console.log('token', token);
      console.log("Redirecting to user profile with role:", role);

      // Now, call your backend with the token
      const response = await axios.post(`https://bizethio-backend-production-944c.up.railway.app/api/firebase-auth`, {
        email: email.value,
        password: password.value,
        token: token // Include the token from Firebase
      });

      const backendToken = response.data.token;
      const userData = response.data.user;

      console.log("Token from backend:", backendToken);
      console.log("User from backend:", userData);
    //  localStorage.setItem("token", backendToken);
      localStorage.setItem("user_id", userData.id); // Store user ID

      axios.defaults.headers.common["Authorization"] = `Bearer ${backendToken}`;

      if (token) {
        
        console.log("Redirecting to user profile...");
        router.push("/UserProfile");
        signInMessage.value = "Sent";
      }
    } else {
      alert("User is not authenticated.");
    }
  } catch (error) {
    console.error("Login error:", error.message);
    alert(error.message);
  }
};
    // const handleLogin = async () => {
    //   if (handleLogin2) {
    //     emailError.value = "";
    //     passwordError.value = "";
    //     signInMessage.value = "Loading...";
    //     try {
    //       const response = await axios.post(`https://bizethio-backend-production-944c.up.railway.app/api/users/login`, {
    //         email: email.value,
    //         password: password.value,
    //       });

    //       const token = response.data.token;
    //       const user = response.data.user;

    //       console.log("Token:", token);
    //       console.log("User:", user);
    //       console.log("response:", response);
    //       localStorage.setItem("token", token);
         
    //       localStorage.setItem("user_id", user.id);
    //       localStorage.setItem("user_role", user.role);
    //       localStorage.setItem("user_name", user.name);

    //       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    //       if (token) {
    //         signInMessage.value = "Sent";
    //         console.log("Redirecting to user profile...");
    //         router.push("/UserProfile");
    //       }
    //     } catch (error) {
    //       console.error(error);
    //       signInMessage.value = "Continue";
    //       emailError.value = "Invalid email or password.";
    //       passwordError.value = "Invalid email or password.";
    //       email.value = "";
    //       password.value = "";
    //     }
    //   }
    // };

    return {
      base_url,
      email,
      password,
      currentUser,
      // handleLogin2,
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
      registerUser,
      togglePasswordVisibility,
      isPasswordVisible
    };
  },
};
</script>

<style></style>
