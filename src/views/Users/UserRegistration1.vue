<template>
  <UserLayout>
    <div class="px-2 py-5 pt-10 pb-10">
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
          fill the form for registration
        </p>
        <div class="w-2/3 mx-auto mt-10">
          <div>
            <div class="flex">
              <div>
                <p>Name</p>
              </div>
              <div>
                <p class="text-red-400 mt-1 ml-1">*</p>
              </div>
            </div>
            <input
              type="text"
              class="border-2 rounded-md focus:outline-none border-blue-300 w-13/13 md:h-12"
              v-model="model.user.name"
              @input="validate"
            />
            <div v-if="errors.name" class="text-red-400 mt-1">
              {{ errors.name }}
            </div>
          </div>

          <div class="mt-9">
            <div class="flex">
              <div>
                <p>Email</p>
              </div>
              <div>
                <p class="text-red-400 mt-1 ml-1">*</p>
              </div>
            </div>
            <input
              type="email"
              class="border-2 rounded-md focus:outline-none border-blue-300 w-13/13 md:h-12"
              v-model="model.user.email"
              @input="validate"
            />
            <div v-if="errors.email" class="text-red-400 mt-1">
              {{ errors.email }}
            </div>
          </div>

          <div class="mt-9">
            <div class="flex">
              <div>
                <p>Phone Number</p>
              </div>
              <div>
                <p class="text-red-400 mt-1 ml-1">*</p>
              </div>
            </div>
            <input
              type="tel"
              class="border-2 rounded-md focus:outline-none border-blue-300 w-13/13 md:h-12"
              v-model="model.user.phone_number"
              @input="validate"
            />
            <div v-if="errors.phone_number" class="text-red-400 mt-1">
              {{ errors.phone_number }}
            </div>
          </div>

          <div class="mt-9">
            <div class="flex">
              <div>
                <p>City</p>
              </div>
              <div>
                <p class="text-red-400 mt-1 ml-1">*</p>
              </div>
            </div>
            <input
              type="text"
              class="border-2 rounded-md focus:outline-none border-blue-300 w-13/13 md:h-12"
              v-model="model.user.city"
              @input="validate"
            />
            <div v-if="errors.city" class="text-red-400 mt-1">
              {{ errors.city }}
            </div>
          </div>

          <div class="mt-9">
            <div class="flex">
              <div>
                <p>Subcity</p>
              </div>
              <div>
                <p class="text-red-400 mt-1 ml-1">*</p>
              </div>
            </div>
            <input
              type="text"
              class="border-2 rounded-md focus:outline-none border-blue-300 w-13/13 md:h-12"
              v-model="model.user.sub_city"
              @input="validate"
            />
            <div v-if="errors.sub_city" class="text-red-400 mt-1">
              {{ errors.sub_city }}
            </div>
          </div>

          <div class="mt-9">
            <div class="flex">
              <div>
                <p>Location</p>
              </div>
              <div>
                <p class="text-red-400 mt-1 ml-1">*</p>
              </div>
            </div>
            <input
              type="text"
              class="border-2 rounded-md focus:outline-none border-blue-300 w-13/13 md:h-12"
              v-model="model.user.location"
              @input="validate"
            />
            <div v-if="errors.location" class="text-red-400 mt-1">
              {{ errors.location }}
            </div>
          </div>

          <div class="mx-auto w-1/2 mt-6 md:w-1/3 md:mx-auto">
            <button
              :disabled="isButtonDisabled"
              :class="{
                'bg-gray-200  cursor-not-allowed': isButtonDisabled,
                'bg-cyan-700 hover:bg-cyan-500 cursor-pointer':
                  !isButtonDisabled,
              }"
              class="bg-cyan-700 text-white px-8 py-2 rounded-sm cursor-pointer"
              @click="registerUser"
            >
              {{ continueButton }}
            </button>
          </div>

          <div class="mt-5 w-12/13 mx-auto md:w-2/3 md:mx-auto">
            <p class="md:text-lg text-sm text-center">
              Do you have an account?
              <span
                class="text-cyan-500 cursor-pointer underline"
                @click="
                  () => {
                    this.$router.push('/signin');
                  }
                "
                >Login</span
              >
            </p>
          </div>
        </div>
      </div>

      <div class="hidden lg:block w-2/3 mx-auto pb-10 mt-3">
        <div class="flex justify-between">
          <div class="bg-[#BDE5F2] rounded-l-md px-10 pt-20 w-1/2 pb-20">
            <div class="w-2/3 mx-auto">
              <Logo class="w-[200px]" />
            </div>
            <h1 class="mt-20 text-center font-bold w-4/5">
              Elevate Your Business Online
            </h1>
            <p class="text-sm w-12/11 mx-auto mt-16">
              An online platform designed to showcase your products and
              services, connect with customers, and enhance your brand's
              visibility. This website serves as a critical tool for engaging
              with your audience, providing essential information, and
              facilitating transactions. It typically includes features such as
              an about page, product listings, a blog for content marketing,
              customer testimonials, and contact information to foster
              communication and trust.
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
              <div class="flex">
                <div class="w-1/3"></div>
                <div class="ml-2">
                  <p class="">Privacy Information</p>
                </div>
              </div>
              <div>
                <p class="w-7/8 text-center mx-auto mt-4">
                  At [Business Name], we prioritize your privacy and are
                  committed to protecting your personal information.
                </p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-r-md w-2/3 mx-auto px-10 pb-20">
            <h1 class="mt-10 w-1/2 mx-auto text-xl text-center">
              Create an account
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
                    <p>Name</p>
                  </div>
                  <div>
                    <p class="text-red-400 mt-1 ml-1">*</p>
                  </div>
                </div>
                <div class="mt-2">
                  <input
                    type="text"
                    class="focus:outline-none pl-3 border-2 rounded-xl border-blue-300 w-13/13 md:h-12"
                    v-model="model.user.name"
                    @input="validate"
                  />
                </div>
                <div v-if="errors.name" class="text-red-400 mt-1">
                  {{ errors.name }}
                </div>
              </div>
              <div class="mt-9">
                <div class="flex">
                  <div>
                    <p>Email</p>
                  </div>
                  <div>
                    <p class="text-red-400 mt-1 ml-1">*</p>
                  </div>
                </div>
                <div class="mt-2">
                  <input
                    type="text"
                    class="focus:outline-none pl-3 border-2 rounded-xl border-blue-300 w-13/13 md:h-12"
                    v-model="model.user.email"
                    @input="validate"
                  />
                </div>
                <div v-if="errors.email" class="text-red-400 mt-1">
                  {{ errors.email }}
                </div>
              </div>
              <div class="mt-9">
                <div class="flex">
                  <div>
                    <p>Phone Number</p>
                  </div>
                  <div>
                    <p class="text-red-400 mt-1 ml-1">*</p>
                  </div>
                </div>
                <div class="mt-2">
                  <input
                    type="text"
                    class="focus:outline-none pl-3 border-2 rounded-xl border-blue-300 w-13/13 md:h-12"
                    v-model="model.user.phone_number"
                    @input="validate"
                  />
                  <div v-if="errors.phone_number" class="text-red-400 mt-1">
                    {{ errors.phone_number }}
                  </div>
                </div>
              </div>
              <div class="mt-9">
                <div class="flex">
                  <div>
                    <p>City</p>
                  </div>
                  <div>
                    <p class="text-red-400 mt-1 ml-1">*</p>
                  </div>
                </div>
                <div class="mt-2">
                  <input
                    type="text"
                    class="focus:outline-none pl-3 border-2 rounded-xl border-blue-300 w-13/13 md:h-12"
                    v-model="model.user.city"
                    @input="validate"
                  />
                  <div v-if="errors.city" class="text-red-400 mt-1">
                    {{ errors.city }}
                  </div>
                </div>
              </div>
              <div class="mt-9">
                <div class="flex">
                  <div>
                    <p>Subcity</p>
                  </div>
                  <div>
                    <p class="text-red-400 mt-1 ml-1">*</p>
                  </div>
                </div>
                <div class="mt-2">
                  <input
                    type="text"
                    class="focus:outline-none pl-3 border-2 rounded-xl border-blue-300 w-13/13 md:h-12"
                    v-model="model.user.sub_city"
                    @input="validate"
                  />
                  <div v-if="errors.sub_city" class="text-red-400 mt-1">
                    {{ errors.sub_city }}
                  </div>
                </div>
              </div>
              <div class="mt-9">
                <div class="flex">
                  <div>
                    <p>Location</p>
                  </div>
                  <div>
                    <p class="text-red-400 mt-1 ml-1">*</p>
                  </div>
                </div>
                <div class="mt-2">
                  <input
                    type="text"
                    class="focus:outline-none pl-3 border-2 rounded-xl border-blue-300 w-13/13 md:h-12"
                    v-model="model.user.location"
                    @input="validate"
                  />
                  <div v-if="errors.location" class="text-red-400 mt-1">
                    {{ errors.location }}
                  </div>
                </div>
              </div>
              <div class="mx-auto w-1/2 mt-6 md:w-1/3 md:mx-auto">
                <button
                  :disabled="isButtonDisabled"
                  :class="{
                    'bg-gray-200  cursor-not-allowed': isButtonDisabled,
                    'bg-cyan-700 hover:bg-cyan-500 cursor-pointer':
                      !isButtonDisabled,
                  }"
                  class="bg-cyan-700 text-white px-14 py-2 rounded-lg text-lg cursor-pointer"
                  @click="registerUser"
                >
                  {{ continueButton }}
                </button>
              </div>
              <!-- <p v-if="isButtonDisabled">The button is currently disabled.</p>
<p v-else>The button is enabled.</p> -->
              <div class="mt-5 w-12/13 mx-auto md:w-2/3 md:mx-auto">
                <p class="md:text-lg text-sm text-center lg:text-sm">
                  Do you have an account?
                  <span
                    class="text-cyan-500 cursor-pointer underline"
                    @click="
                      () => {
                        this.$router.push('/signin');
                      }
                    "
                    >Login</span
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </UserLayout>
</template>

<script>
import { ref, computed, onMounted, watch } from "vue";
import UserLayout from "@/layout/UserLayout.vue";
import { useRouter } from "vue-router";
import Logo from "@/components/icons/Logo.vue";

import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { getFirestore, doc, setDoc,getDoc } from "firebase/firestore";

export default {
  components: {
    UserLayout,
    Logo,
  },
  setup() {
    const base_url = "#";
    const model = ref({
      user: {
        name: "",
        email: "",
        phone_number: "",
        city: "",
        sub_city: "",
        location: "",
      },
    });
    const errorss = ref("");
    const router = useRouter();
    const errors = ref({});
    const continueButton = ref("Continue");
    onMounted(() => {
      Object.keys(model.value.user).forEach((key) => {
        model.value.user[key] = localStorage.getItem(key) || "";
      });
    });

    const validate = () => {
      errors.value = {};
      if (!model.value.user.name) errors.value.name = "Name is required.";
      if (!model.value.user.email) errors.value.email = "Email is required.";
      if (!model.value.user.phone_number)
        errors.value.phone_number = "Phone number is required.";
      if (!model.value.user.city) errors.value.city = "City is required.";
      if (!model.value.user.sub_city)
        errors.value.sub_city = "Subcity is required.";
      if (!model.value.user.location)
        errors.value.location = "Location is required.";
    };

    const isButtonDisabled = computed(() => {
      return (
        !model.value.user.name ||
        !model.value.user.email ||
        !model.value.user.phone_number ||
        !model.value.user.city ||
        !model.value.user.sub_city ||
        !model.value.user.location
      );
    });


    // const registerUser = async () => {
    //   validate();
    //   if (Object.keys(errors.value).length > 0) return;

    //   Object.keys(model.value.user).forEach((key) => {
    //     localStorage.setItem(key, model.value.user[key]);
    //   });
    //   continueButton.value = "Loading...";
    //   const userData = {
    //     email: model.value.user.email,
    //     role : "user"
      
    //   };

    //   try {
    //     const tempPassword = Math.random().toString(36).slice(-8);
    //     localStorage.setItem("temporaryPassword", tempPassword);
    //     localStorage.setItem("name", model.value.user.name);
    //     localStorage.setItem("email", model.value.user.email);
    //     localStorage.setItem("phone_number", model.value.user.phone_number);
    //     localStorage.setItem("city", model.value.user.city);
    //     localStorage.setItem("sub_city", model.value.user.sub_city);
    //     localStorage.setItem("location", model.value.user.location);

    //     // isLoading.value = 'Submitting'
    //     const auth = getAuth();
    //     const userCredential = await createUserWithEmailAndPassword(
    //       auth,
    //       userData.email,
    //       userData.role,
    //       tempPassword
    //     );

    //     await sendEmailVerification(userCredential.user);
    //     alert("A verification email has been sent. Please check your inbox.");

    //     alert("Please verify your email to complete your registration.");
    //     continueButton.value = "Sent";
    //   } catch (error) {
    //     console.error(
    //       "Error during registration:",
    //       error.message || "An error occurred. Please try again."
    //     );
    //     errorss.value = error.response
    //       ? error.response.data.message
    //       : "An error occurred. Please try again.";
    //     // isLoading.value = 'Failed'
    //     continueButton.value = "Failed";
    //   }
    //   router.push("/next");
    // };
    const registerUser = async () => {
  validate();
  if (Object.keys(errors.value).length > 0) return;

  // Store user data in local storage
  Object.keys(model.value.user).forEach((key) => {
    localStorage.setItem(key, model.value.user[key]);
  });

  continueButton.value = "Loading...";

  const userData = {
    email: model.value.user.email,
    role: "user",
    name: model.value.user.name,
    phone_number: model.value.user.phone_number,
    city: model.value.user.city,
    sub_city: model.value.user.sub_city,
    location: model.value.user.location
  };

  try {
    // Generate a temporary password
    const tempPassword = Math.random().toString(36).slice(-8);
    localStorage.setItem("temporaryPassword", tempPassword);

    const auth = getAuth();
    
    // Create user with email and temporary password
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      userData.email,
      tempPassword 
    );

    const db = getFirestore();
    // Store user role and info in Firestore
    await setDoc(doc(db, "users", userCredential.user.uid), userData);

    // Get the token from Firebase
    const token = await userCredential.user.getIdToken();
    console.log("User Token:", token); 

    // Combine user data with the token
    const userWithToken = {
      ...userData,
      token
    };
    console.log("User Data with Token:", userWithToken);

    // Optionally store this combined object in localStorage
    localStorage.setItem("userWithToken", JSON.stringify(userWithToken));

    // Send email verification
    await sendEmailVerification(userCredential.user);
    alert("A verification email has been sent. Please check your inbox.");

    // Redirect to the next page after successful registration
    continueButton.value = "Sent";
    router.push("/next");
  } catch (error) {
    console.error(
      "Error during registration:",
      error.message || "An error occurred. Please try again."
    );
    errors.value = error.response
      ? error.response.data.message
      : "An error occurred. Please try again.";
    continueButton.value = "Failed";
  }
};
    watch(isButtonDisabled, (newValue) => {
      if (newValue) {
        console.log("Button is disabled");
      } else {
        console.log("Button is enabled");
      }
    });

    return {
      base_url,
      model,
      registerUser,
      isButtonDisabled,
      errors,
      validate,
      continueButton,
    };
  },
};
</script>
