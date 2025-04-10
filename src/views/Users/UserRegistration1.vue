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
              @input="handleInput "
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
          <div class="text-white lg:ml-28  lg:-mt-4 -ml-2 w-11/12">
            <div class="flex ml-4 w-56 mt-6 md:ml-20 lg:ml-56">
            
            </div>
          </div>
         
          <!-- <div class="mt-9">
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
          </div> -->
          <div class="text-[12px] w-5/6 font-normal cursor-pointer text-gray-100 -mt-4  md:text-[16px]">
                <button @click="showMap = !showMap"
                  class="text-md bg-[#038ba6] hover:bg-[#6291a7] rounded-lg w-56 outline-none h-10 cursor-pointer text-white mt-10">
                  Select Location
                </button>
                <!--{{ userInformations.location }}-->
              </div>
              <div v-if="showMap" class="modal">
                <div class="modal-content">

                  <MapComponent2 :currentLocation="selectedLatLng" @close="handleClose"
                  @location-selected="handleLocationSelected">
                  </MapComponent2>
                </div>
          </div>
          <div class="mx-auto w-1/2 mt-6 md:w-1/3 md:mx-auto">
            <button
            v-if="!registeredUser"
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
          <div class="mx-auto w-1/2 mt-6 md:w-1/3 md:mx-auto">
 
 <button
   v-if="registeredUser"
   class="bg-cyan-700 text-white px-14 py-2 rounded-lg text-lg cursor-pointer"
   @click="registeredUser2"
 >
   Next
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
                    @input="handleInput"
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
              <p class="text-cyan-400 mt-4">{{ locationInfo }}</p>
            
              <div class="text-[12px] w-5/6 font-normal cursor-pointer text-gray-100 -mt-4  md:text-[16px]">
                <button @click="showMap = !showMap"
                  class="text-md bg-[#23bbd9] hover:bg-[#6291a7] rounded-lg w-56 outline-none h-10 cursor-pointer text-black mt-10">
                 {{locationMessage}}
                </button>
                <!--{{ userInformations.location }}-->
              </div>
              <div v-if="showMap" class="modal">
                <div class="modal-content">

                  <MapComponent :currentLocation="selectedLatLng" @close="handleClose"
                  @location-selected="handleLocationSelected">
                  </MapComponent>
                </div>
          </div>
              <!-- <div class="text-white lg:ml-28  lg:-mt-4 -ml-2 w-11/12">
            <div class="flex ml-4 w-56 mt-6 md:ml-20 lg:ml-56">
              <div class="text-[12px] font-normal text-gray-100 md:text-[16px]">

              </div>
             
            </div>
          </div> -->
        
              <div class="mx-auto w-1/2 mt-6 md:w-1/3 md:mx-auto">

    <button
      v-if="!registeredUser"
      :disabled="isButtonDisabled"
      :class="{
        'bg-gray-200 cursor-not-allowed': isButtonDisabled,
        'bg-cyan-700 hover:bg-cyan-500 cursor-pointer': !isButtonDisabled,
      }"
      class="bg-cyan-700 text-white px-14 py-2 rounded-lg text-lg cursor-pointer mt-10"
      @click="registerUser"
    >
      {{ continueButton }}
    </button>
  </div>
  <div class="mx-auto w-1/2 mt-6 md:w-1/3 md:mx-auto">
 
    <button
      v-if="registeredUser"
      class="bg-cyan-700 text-white px-14 py-2 rounded-lg text-lg cursor-pointer"
      @click="registeredUser2"
    >
      Next
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
import MapComponent from "@/components/MapComponent.vue";
import MapComponent2 from "@/components/MapComponent2.vue";

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
    MapComponent,
    MapComponent2
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
    const userLocation = ref("")
    const errorss = ref("");
    const router = useRouter();
    const errors = ref({});
    const registeredUser = ref(false)
    const continueButton = ref("Continue")
    const currentEmail = ref('');
    const showMap = ref(false);
    const locationInfo = ref('');
    const storedEmail = ref('');
    const locationMessage = ref(localStorage.getItem('locationMessage') || 'Select Location')
    const selectedLatLng = ref({ lat: null, lng: null });
    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            selectedLatLng.value = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
          //  userInformations.value.location = selectedLatLng.value;
            console.log('Current Location:', selectedLatLng.value);
          },
          (error) => {
            console.error('Geolocation error:', error);
            alert('Unable to retrieve location.');
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
          }
        );
      } else {
        alert('Geolocation is not supported by your browser.');
      }
    };
    const handleClose = () => {
      showMap.value = false;
    };
    const handleInput = () => {
      validate();
      updateCurrentEmail();
    };
   

    const updateCurrentEmail = () => {
      storedEmail.value = localStorage.getItem('email'); 
     console.log('stored email',storedEmail.value)
     // Adjust this key as needed
     currentEmail.value = model.value.user.email
     console.log('email',currentEmail.value)
      currentEmail.value = model.value.user.email;
      registeredUser.value = false
    };
  // Check if the email has changed
  if (currentEmail !== storedEmail) {
    registeredUser.value = false; // Set registeredUser to false if the email has changed
  }


    const validate = () => {
      errors.value = {};
      if (!model.value.user.name) errors.value.name = "Name is required.";
      if (!model.value.user.email) errors.value.email = "Email is required.";
      if (!model.value.user.phone_number)
        errors.value.phone_number = "Phone number is required.";
      if (!model.value.user.city) errors.value.city = "City is required.";
      if (!model.value.user.sub_city)
        errors.value.sub_city = "Subcity is required.";
      // if (!model.value.user.location)
      //   errors.value.location = "Location is required.";
    };

    const isButtonDisabled = computed(() => {
      return (
        !model.value.user.name ||
        !model.value.user.email ||
        !model.value.user.phone_number ||
        !model.value.user.city ||
        !model.value.user.sub_city 
       // !model.value.user.location
      );
    });

    const registeredUser2 = ()=>{
    
  if (Object.keys(errors.value).length > 0) return;

  // Store user data in local storage
  // Object.keys(model.value.user).forEach((key) => {
  //   localStorage.setItem(key, model.value.user[key]);
  // });
  localStorage.setItem('name',model.value.user.name)
  localStorage.setItem('email',model.value.user.email)
  localStorage.setItem('phone_number',model.value.user.phone_number)
  localStorage.setItem('city',model.value.user.city)
  localStorage.setItem('sub_city',model.value.user.sub_city)
  model.value.user.location = JSON.stringify({
          lat: selectedLatLng.value.lat,
          lng: selectedLatLng.value.lng,
        });
  localStorage.setItem('location',model.value.user.location)
      router.push("/next");
    }
    const registerUser = async () => {
  validate();
  if (Object.keys(errors.value).length > 0) return;

  // Store user data in local storage
  // Object.keys(model.value.user).forEach((key) => {
  //   localStorage.setItem(key, model.value.user[key]);
  // });
  localStorage.setItem('name',model.value.user.name)
  localStorage.setItem('email',model.value.user.email)
  localStorage.setItem('phone_number',model.value.user.phone_number)
  localStorage.setItem('city',model.value.user.city)
  localStorage.setItem('sub_city',model.value.user.sub_city)
  localStorage.setItem('location',model.value.user.location)
 

  model.value.user.location = JSON.stringify({
          lat: selectedLatLng.value.lat,
          lng: selectedLatLng.value.lng,
        });
  continueButton.value = "Loading...";
  const userData = {
    email: model.value.user.email,
   // role: "admin",
    name: model.value.user.name,
    phone_number: model.value.user.phone_number,
    city: model.value.user.city,
    sub_city: model.value.user.sub_city,
    location: model.value.user.location,
    //location: locationString
  };

  try {
  
    const tempPassword = Math.random().toString(36).slice(-8);
    localStorage.setItem("temporaryPassword", tempPassword);

    const auth = getAuth();
    
    
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      userData.email,
      tempPassword 
    );

    const db = getFirestore();
   
    await setDoc(doc(db, "users", userCredential.user.uid), userData);
    const token = await userCredential.user.getIdToken();
    console.log("User Token:", token); 
    localStorage.setItem('token',token)

    const userWithToken = {
      ...userData,
      token
    };
    console.log("User Data with Token:", userWithToken);
    localStorage.setItem("userWithToken", JSON.stringify(userWithToken)); 
    model.value.user.location = userData.location
    localStorage.setItem('location',model.value.user.location)  
    await sendEmailVerification(userCredential.user);
    alert("A verification email has been sent. Please check your inbox.");
    registeredUser.value = true
    localStorage.setItem('registereduser',registeredUser.value )
    
    router.push("/next");
    continueButton.value = "Sent";
  } catch (error) {
    console.error( 
      
      "Error during registration:",
      error.message || "An error occurred. Please try again."
    );
    errors.value = error.response
    ? error.response.data.message
    : "An error occurred. Please try again.";
    alert(error.message)
    continueButton.value = "Submit";



  }
};
const handleLocationSelected = (latlng) => {
      selectedLatLng.value = latlng;
      model.value.user.location = {
        lat: latlng.lat,
        lng: latlng.lng
      };
      console.log('Selected Location:', selectedLatLng.value);
      console.log('user location',  model.value.user.location)
      if(model.value.user.location.lat!== null&&model.value.user.location.lng!== null){

        showMap.value = false;
        locationInfo.value = 'Location added Sucessfully '
        localStorage.setItem('locationInfo',locationInfo.value)
        locationMessage.value = 'Change Location'
        localStorage.setItem('locationMessage',locationMessage.value)
      }
    };

    watch(isButtonDisabled, (newValue) => {
      if (newValue) {
        console.log("Button is disabled");
      } else {
        console.log("Button is enabled");
      }
    });
    onMounted(() => {
      Object.keys(model.value.user).forEach((key) => {
        model.value.user[key] = localStorage.getItem(key) || "";
      });
      registeredUser.value =  localStorage.getItem('registereduser')
     console.log('registerd user',localStorage.getItem('registereduser'))
     getCurrentLocation();
     locationInfo.value  = localStorage.getItem('locationInfo')
    // locationMessage.value = localStorage.getItem('locationMessage')
     
    }); 
    return {
      base_url,
      model,
      registerUser,
      isButtonDisabled,
      errors,
      validate,
      continueButton,
      registeredUser,
      registeredUser2,
      currentEmail,
      handleInput,
      getCurrentLocation,
      handleLocationSelected,
      showMap,
      selectedLatLng,
      handleClose,
      locationInfo,
      locationMessage

    };
  },
};
</script>
<style>
.modal {
  display: flex;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #fff;
  margin: auto;
  margin-top:80px;
  padding: 10px;
  border: 1px solid #888;
  width: 80%;
  max-width: 600px;
  position: relative;
}

</style>
