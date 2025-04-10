<template>
  <UserLayout>
    <div class="border-b-1 border-b-gray-600 py-2 lg:-mt-10"></div>
    <div class="block md:hidden md:mt-96">
      <p class="text-center text-2xl mt-4">
        Welcome to <span class="text-[#2178AC]">BIZEthio</span>
      </p>
      <p class="text-sm font-medium px-10 text-center mt-2">
        Connect, Discover, and Grow with AI-Powered Local Business Listings!
      </p>
    </div>

    <!-- desktop -->

    <div class="px-4">
      <div class="flex">
        <div class="hidden md:block bg-gradient-to-r from-[#0087e1] to-[#2178AC] relative w-1/3 -ml-4">
          <p class="text-2xl font-medium text-white mt-16 w-11/12 px-10 text-center">
            Connect, Discover, and Grow with AI-Powered Local Business Listings!
          </p>
          <div style="height: 350px"
            class="ml-10 mt-6 rounded-3xl w-56 bg-gradient-to-b from-[#e8fffe] to-[#00D2EA] shadow-sm">
            <i class="fa-solid fa-robot text-4xl mt-16 text-[#2178AC] ml-4"></i>
            <p class="font-semibold text-lg ml-6 mt-4">AI-Powered Experience</p>
            <p class="font-medium text-sm mt-2 mb-2 text-center">
              Smarter Searches, Better Results
            </p>
            <p class="text-xs mt-4 w-48 text-center mx-auto">
              Our AI-driven platform helps you discover the best businesses with
              personalized recommendations.
            </p>
          </div>

          <div
            class="h-56 mb-20 lg:mb-96 mt-10 ml-4 shadow-sm rounded-4xl w-11/12 bg-gradient-to-l from-[#FFFFFF] to-[#00D2EA]">
            <div class="flex">
              <div class="lg:ml-6 md:ml-5 mt-20">
                <div class="lg:w-16 md:w-10 w-10 h-1 ml-6 bg-[#1b6489] rounded-full mb-3"></div>
                <div class="lg:w-24 md:w-10 w-10 h-1 -ml-4 bg-gray-300 rounded-full mb-3"></div>
                <div class="lg:w-24 md:w-10 w-10 -ml-4 h-1 bg-gray-300 rounded-full mb-3"></div>
                <div class="lg:w-24 md:w-10 w-10 ml-2 h-1 bg-[#1b6489] rounded-full mb-3"></div>
                <div class="lg:w-24 md:w-10 w-10 h-1 bg-gray-300 rounded-full mb-3"></div>
              </div>
              <div class="lg:ml-">
                <i class="fa-solid fa-key text-4xl ml-20 mt-6 text-[#2178AC]"></i>
                <p
                  class="text-xs font-bold text-center mt-4 lg:text-sm lg:font-bold lg:text-center lg:mt-4 md:text-xs md:font-bold md:text-center md:mt-4">
                  Your Security, Our Priority
                </p>
                <p class="text-xs lg:ml-6 mt-4">
                  We protect your data with advanced encryption, ensuring
                  privacy
                </p>
              </div>
            </div>
          </div>

          <img src="/Bottom Desogn Card.png" alt="" class="absolute bottom-0 left-0 mt-44" />
        </div>
        <div v-if="!showPassword" class="ml-20 w-2/3">
          <p class="text-center text-3xl font-bold mt-4">
            Welcome to <span class="text-[#2178AC]">BIZEthio</span>
          </p>

          <div class="lg:flex md:flex w-full">
            <div class="lg:px-4 md:px-4 mt-4 w-11/12 mx-auto">
              <div class="flex">
                <p class="">Owner name</p>
                <p class="text-red-600 text-2xl font-medium ml-2">*</p>
              </div>
              <input v-model="companies.owner_name" type="text" @input="validateFields"
                class="w-11/12 outline-none mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md pl-2" />
              <p v-if="errors.owner_name" class="text-red-500 text-sm">
                {{ errors.owner_name }}
              </p>
            </div>

            <div class="lg:px-4 md:px-4 mt-4 w-11/12 mx-auto">
              <div class="flex">
                <p class="">Company name</p>
                <p class="text-red-600 text-2xl font-medium ml-2">*</p>
              </div>
              <input v-model="companies.name" type="text" @input="validateFields"
                class="w-11/12 outline-none mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md pl-2" />
              <p v-if="errors.name" class="text-red-500 text-sm">
                {{ errors.name }}
              </p>
            </div>
          </div>
          <div class="lg:flex md:flex">
            <div class="lg:px-6 md:px-6 px-2.5 mt-4 w-full lg:-ml-2 md:-ml-2">
              <div class="flex">
                <p class="">Description</p>
                <p class="text-red-600 text-2xl font-medium ml-2">*</p>
              </div>
              <!-- <input v-model="description" type="textArea" class="w-11/12 outline-none h-32 bg-transparent border-2 border-[#60b5e6] rounded-md pl-2"> -->
              <textarea v-model="companies.description" name="description" id="" cols="30" rows="6"
                @input="validateFields"
                class="border-2 border-[#60b5e6] rounded-md w-11/12 px-2 outline-none h-34 pt-1"></textarea>
              <p v-if="errors.description" class="text-red-500 text-sm">
                {{ errors.description }}
              </p>
            </div>

            <div class="container">
              <div class="lg:px-3 px-3 md:px-3 -ml-1 mr-1 mt-4 mx-auto">
                <div class="flex">
                  <p class="">Contact Phone</p>
                  <p class="text-red-600 text-2xl font-medium ml-2">*</p>
                </div>
                <input v-model="companies.contact_phone" type="text" @input="handlePhoneInput"
                  class="w-11/12 outline-none mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md pl-2" />
                <p v-if="errors.contact_phone" class="text-red-500 text-sm">
                  {{ errors.contact_phone }}
                </p>
              </div>

              <div class="px-3 -ml-1 mr-1 mt-4 mx-auto">
                <div class="lg:flex md:flex">
                  <label class="">Category</label><br />
                  <p class="text-red-600 text-2xl font-medium ml-1">*</p>
                </div>

                <select name="category" v-model="companies.category_id" @change="validateFields"
                  class="cursor-pointer w-11/12 mx-auto h-10 p-1 bg-transparent border-2 border-[#60b5e6] rounded-md transition-all duration-300 focus:outline-none hover:bg-[#eaf8ff] placeholder:text-center">
                  <option value="">Select category</option>
                  <option v-for="category in categories" :key="category.id" :value="category.id">
                    {{ category.name }}
                  </option>
                </select>
                <p v-if="errors.category_id" class="text-red-500 text-sm">
                  {{ errors.category_id }}
                </p>
              </div>
            </div>
          </div>
          <div class="lg:flex md:flex">
            <div class="lg:px-4 md:px-4 mt-4 w-11/12 mx-auto">
              <div class="flex">
                <p class="">Email</p>
                <p class="text-red-600 text-2xl font-medium ml-2">*</p>
              </div>
              <input v-model="companies.contact_email" type="text" @input="handleEmail"
                class="w-11/12 outline-none mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md pl-2" />
              <p v-if="errors.contact_email" class="text-red-500 text-sm">
                {{ errors.contact_email }}
              </p>
            </div>

            <div class="lg:px-4 md:px-4 mt-4 w-11/12 mx-auto">
              <div class="flex">
                <p class="">Operating Hours</p>
                <p class="text-red-600 text-2xl font-medium ml-2">*</p>
              </div>
              <input v-model="companies.operating_hours" type="text" @input="validateFields"
                class="w-11/12 outline-none mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md pl-2" />
              <p v-if="errors.operating_hours" class="text-red-500 text-sm">
                {{ errors.operating_hours }}
              </p>
            </div>
          </div>
          <div class="lg:flex md:flex">
            <div class="lg:px-4 md:px-4 mt-4 w-11/12 mx-auto">
              <div class="flex">
                <label class="text-md">Country</label><br />
                <p class="text-red-600 text-2xl font-medium ml-2">*</p>
              </div>
              <select name="country" v-model="companies.country" @change="validateFields"
                class="cursor-pointer w-11/12 mx-auto h-10 p-1 bg-transparent border-2 border-[#60b5e6] rounded-md transition-all duration-300 focus:outline-none hover:bg-[#eaf8ff] placeholder:text-center">
                <option value="">Select country</option>
                <option 
                  class="border-[#84d2ffb7] rounded-lg mt-2">
                  Ethiopia
                </option>
              </select>
              <p v-if="errors.country" class="text-red-500 text-sm">
                {{ errors.country }}
              </p>
            </div>
            <!-- <div class="lg:px-4 md:px-4 mt-4 w-11/12 mx-auto">
              <div class="flex">
                <label class="text-md">Country</label><br />
                <p class="text-red-600 text-2xl font-medium ml-2">*</p>
              </div>
              <select name="country" v-model="companies.country" @change="validateFields"
                class="cursor-pointer w-11/12 mx-auto h-10 p-1 bg-transparent border-2 border-[#60b5e6] rounded-md transition-all duration-300 focus:outline-none hover:bg-[#eaf8ff] placeholder:text-center">
                <option value="">Select country</option>
                <option v-for="country in countries" :key="country.id" :value="country.name"
                  class="border-[#84d2ffb7] rounded-lg mt-2">
                  {{ country.name }}
                </option>
              </select>
              <p v-if="errors.country" class="text-red-500 text-sm">
                {{ errors.country }}
              </p>
            </div> -->

            <div class="lg:px-4 md:px-4 mt-4 w-11/12 mx-auto">
              <div class="flex">
                <p class="">Address</p>
                <p class="text-red-600 text-2xl font-medium ml-2">*</p>
              </div>
              <input v-model="companies.address" type="text" @input="validateFields"
                class="w-11/12 outline-none mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md pl-2" />
              <p v-if="errors.address" class="text-red-500 text-sm">
                {{ errors.address }}
              </p>
            </div>
          </div>
          <div class="lg:flex md:flex">
            <div class="lg:px-4 md:px-4 mt-4 w-11/12 mx-auto">
              <div class="flex">
                <p class="">Region</p>
                <p class="text-red-600 text-2xl font-medium ml-2">*</p>
              </div>
              <input v-model="companies.region" type="text" @input="validateFields"
                class="w-11/12 outline-none mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md pl-2" />
              <p v-if="errors.region" class="text-red-500 text-sm">
                {{ errors.region }}
              </p>
            </div>
            <div class="lg:px-4 md:px-4 mt-4 w-11/12 mx-auto">
              <div class="flex">
                <p class="">City</p>
                <p class="text-red-600 text-2xl font-medium ml-2">*</p>
              </div>
              <input v-model="companies.city" type="text" @input="validateFields"
                class="w-11/12 outline-none mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md pl-2" />
              <p v-if="errors.city" class="text-red-500 text-sm">
                {{ errors.city }}
              </p>
            </div>
          </div>
          <!-- image -->
          <div class="lg:flex md:flex">
            <div class="lg:px-4 md:px-4 mt-4 w-11/12 mx-auto">
              <div class="flex">
                <p class="">License URL</p>
                <p class="text-red-600 text-2xl font-medium ml-2">*</p>
              </div>
              <input v-model="companies.license_url" type="text" @input="validateFields"
                class="w-11/12 outline-none mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md pl-2" />
              <p v-if="errors.license_url" class="text-red-500 text-sm">
                {{ errors.license_url }}
              </p>
            </div>
            <div class="lg:px-4 md:px-4 mt-4 w-11/12 mx-auto">
              <div class="flex">
                <p class="mb-2">Website</p>
              </div>
              <input v-model="companies.website" type="text"
                class="w-11/12 outline-none mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md pl-2" />
              <p v-if="errors.website" class="text-red-500 text-sm">
                {{ errors.website }}
              </p>
            </div>
          </div>
          <div class="lg:flex lg:px-4 md:px-4 mt-4 lg:w-full md:w-1/2">
            <div class="lg:px-4 -ml-4 md:px-4 mt-full md:w-1/2">
              <div class="flex">
                <p class="mb-2">Upload Image</p>
              </div>

              <input v-model="companies.images" type="text"
                class="w-11/12 hidden h-10 bg-transparent border-2 border-[#60b5e6] rounded-md"
                placeholder="Upload images" readonly />

              <!-- Hidden file input for selecting images -->
              <input type="file" @change="handleFileChange" ref="fileInput" class="hidden" multiple />

              <!-- Button to trigger file input -->
              <button @click="triggerFileInput"
                class="mt-2 ml- bg-[#409cd0] hover:scale-105 hover:bg-[#6b8ea1] transition-all duration-300 cursor-pointer text-white rounded-md px-4 py-2">
                Browse
              </button>

              <div v-if="imageUrl && imageUrl.length" class="mt-4">
                <h3 class="text-green-600">Image Uploaded successfully!</h3>
                <div v-for="(url, index) in imageUrl" :key="index">
                  <img :src="url" alt="Uploaded Image" class="mt-2 w-full h-auto rounded-md" />
                </div>
              </div>

              <p v-if="errors.images" class="text-red-500 text-sm">
                {{ errors.images }}
              </p>

              <p v-if="isUploading" class="mt-2 ml-4 text-green-600">
                Uploading...
              </p>
            </div>
            <div class="text-[12px]  font-normal cursor-pointer text-gray-100 mt-8 ml-8 md:text-[16px]">
             <div class="-mt-8">
              <p class="text-black mb-2">Location</p>
                <button @click="showMap = !showMap"
                  class="mt-2 ml- bg-[#409cd0] hover:scale-105 hover:bg-[#6b8ea1] transition-all duration-300 cursor-pointer text-white rounded-md px-4 py-2">
                  Select Location
                </button>
                <div v-if="showMap" class="modal">
                <div class="modal-content">

                  <MapComponent2 :currentLocation="selectedLatLng" @close="handleClose"
                  @location-selected="handleLocationSelected">
                  </MapComponent2>
                </div>
          </div>
             </div>
                <!-- {{ userInformations.location }} -->
              </div>
          </div>
          <!-- end of image -->

          <div class="lg:px-7 md:px-7 mt-4">
            <div class="">
              <div class="md:w-56 mt-6">
                <p class="md:text-s md:w-40 lg:-ml-3">Social Media Links</p>
              </div>
              <div></div>
              <div class="lg:flex mt-4 -ml-3">
                <input v-model="socialMediaLinks.facebook" type="text" placeholder="Facebook "
                  class="w-56 h-10 bg-transparent outline-none pl-2 border-2 border-[#60b5e6] rounded-md mb-4 mr-6" />
                <input v-model="socialMediaLinks.Instagram" type="text" placeholder="Instagram "
                  class="w-56 h-10 bg-transparent outline-none pl-2 border-2 border-[#60b5e6] rounded-md mb-4 mr-6" />
                <input v-model="socialMediaLinks.LinkedIn" type="text" placeholder="LinkedIn"
                  class="w-56 h-10 bg-transparent outline-none pl-2 border-2 border-[#60b5e6] rounded-md mb-4" />
              </div>
            </div>
          </div>
          <div  v-if="!registeredUser" class="mt-10 lg:ml-20 -ml-40 md:-ml-10">
  <button @click="registerCompany"
 
    class="bg-[#2178AC] mb-2 hover:bg-[#6291a7] ml-40 py-3 cursor-pointer transition-all duration-300 px-26 md:px-32 lg:px-40 -mt-80 md:ml-20 rounded-md text-white text-md">
    {{ changeNaxt }}
  </button>
  <p v-if="emailError" class="text-red-500 mt-2">{{ emailError }}</p>
</div>
<div v-if="registeredUser" class="mt-10 lg:ml-20 -ml-40 md:-ml-10">
<button @click="registeredUser2"

    class="bg-[#2178AC] mb-2 hover:bg-[#6291a7] ml-40 py-3 cursor-pointer transition-all duration-300 px-26 md:px-32 lg:px-40 -mt-80 md:ml-20 rounded-md text-white text-md">
    {{ changeNaxt }}
  </button>
  <p v-if="emailError" class="text-red-500 mt-2">{{ emailError }}</p>
</div>
</div>
        
        <div ref="cardSection" v-if="showPassword" class="w-1/3 mx-auto">
          <!-- <CompRegPasswordView /> -->
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
                class="bg-[#2178AC] mb-32 lg:mb-0 hover:bg-[#6291a7] ml-2 lg:ml-4 py-2 cursor-pointer transition-all duration-300 lg:mt-4 hover:scale-105 px-6 mt-10 md:ml-20 rounded-md text-white text-md">
                Back
              </button>
            </div>
            <p v-if="showRegistrationError" class="text-red-600 mt-2 text-center">An error occured. please try again!</p>
            <div class="-mt-2">
              <button @click="submitForm"
                class="bg-[#2178AC] mb-32 hover:bg-[#6291a7] ml-40 lg:ml-24 py-3 cursor-pointer transition-all duration-300 hover:scale-105 px-10 mt-10 lg:mt-6 md:ml-20 rounded-md text-white text-md">
                {{ this.changeRegister }}
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>

    
  </UserLayout>
</template>
<script>
import axios from "axios";
// import CompRegPasswordView from '@/components/CompRegistration/CompRegPasswordView.vue'
// import CompRegformview from '@/components/CompRegistration/CompRegformview.vue'
import { login, register, updateUserPassword } from "../auth";
import UserLayout from "@/layout/UserLayout.vue";
import MapComponent from "@/components/MapComponent.vue";
import MapComponent2 from "@/components/MapComponent2.vue";

import {
  getAuth,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  sendEmailVerification

} from "firebase/auth";


export default {
  components: {
    UserLayout,
    // CompRegPasswordView,
    MapComponent,
    MapComponent2
    // CompRegformview
  },
  computed: {
    buttonClass() {
      return {
        "bg-gray-400 cursor-not-allowed": this.checkButtonDisabled,
        "bg-[#2178AC] hover:bg-[#6b8ea1] cursor-pointer":
          !this.checkButtonDisabled,
        "mb-32 ml-40 py-3 transition-all duration-300 px-40 rounded-md text-white text-md": true,
      };
    },
  },
  mounted() {
    this.fetchCategories();
    this.fetchCountries();
    this.checkButtonState();
    this.getCurrentLocation();
    //  locationInfo.value  = localStorage.getItem('locationInfo')
  },
  data() {
    return {
      selectedCountry: null,
      countries: [],
      error: null,
      categories: [],
      companies: {
        name: "",
        owner_name: "",
        description: "",
        password: "",
        password_confirmation: "",
        operating_hours: "",
        category_id: "",
        address: "",
        city: "",
        region: "",
        country: "",
        contact_phone: "",
        contact_email: "",
        website: "",
        license_url: "",
        social_media_links:
          "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css",
        status: "pending",
        rating_avg: "5",
        // token : '',

        images: {},
      },
      socialMediaLinks: {
        facebook: "",
        Instagram: "",
        LinkedIn: "",
      },
      images: "",
      file: null,
      imageUrl: null,
      cloudName: "dwh8v2zhg",
      apiKey: "934859592498419",
      isButtonDisabled: false,
      timeOutDuration: 2000,
      showPassword: false,
      isUploading: false,
      ImageButton: true,
      errors: {
        contact_phone: "",
        password:''
      },
      passwordStrengthMessages: [],
      contact_phone: "",
      showPasswordField: false,
      showConfirmPasswordField: false,
      changeNaxt: "next",
      changeRegister: "Register Company",
      showRegistrationError: false,
      emailInUse: false,
      registeredUser: false,
      currentEmail: '',
      storedEmail: '',
      // locationMessage: localStorage.getItem('locationMessage') || 'Select Location',
      selectedLatLng: {
        lat: null,
        lng: null,
      },
      location:'',
      showMap:false

    };
  },
  methods: {
    handleEmail() {
  if (this.validateFields()) {
    this.updateCurrentEmail();
  } else {
    console.log('Validation failed');
  }
},

registeredUser2() {
  this.showPassword = true;
},

     getCurrentLocation()  {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.selectedLatLng = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            console.log('Current Location:', this.selectedLatLng);
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
    },
    handleLocationSelected(latlng) {
      this.selectedLatLng = latlng;
      this.location = {
        lat: latlng.lat,
        lng: latlng.lng
      };
      console.log('Selected Location:', this.selectedLatLng);
      console.log('user location',  this.location)
      if(this.location.lat!== null&&this.location.lng!== null){

        this.showMap = false;
        this.locationInfo = 'Location added Sucessfully '
        localStorage.setItem('locationInfo',this.locationInfo)
        // this.locationMessage = 'Change Location'
        // localStorage.setItem('locationMessage',this.locationMessage)
      }
    },
     handleClose() {
      this.showMap = false;
    },
updateCurrentEmail() {
  this.storedEmail = localStorage.getItem('email');
  console.log('Stored email:', this.storedEmail);

  // Assuming companies.contact_email is correctly defined and accessible
  if (this.companies && this.companies.contact_email) {
    this.currentEmail = this.companies.contact_email;
    console.log('Current email:', this.currentEmail);
  } else {
    console.error('Contact email is not available');
  }

  this.registeredUser = false;
},

    togglePasswordVisibility() {
      this.showPasswordField = !this.showPasswordField;
    },
    toggleConfirmPasswordVisibility() {
      this.showConfirmPasswordField = !this.showConfirmPasswordField;
    },
    validatePhoneNumber(phoneNumber) {
      const phoneRegex =
        /^(\+?\d{1,3})?[- ]?(\(?\d{3}\)?[- ]?)?\d{3}[- ]?\d{4}$/;
      return phoneRegex.test(phoneNumber);
    },

    updatePhoneNumber() {
      if (!this.validatePhoneNumber(this.companies.contact_phone)) {
        this.errors.contact_phone = "Please enter a valid phone number.";
      } else {
        this.errors.contact_phone = "";
      }
    },
    checkPasswordStrength(password) {
      const strengthCriteria = [
        { regex: /.{6,}/, message: "At least 6 characters long." },
        { regex: /[A-Z]/, message: "At least one uppercase letter." },
        { regex: /[a-z]/, message: "At least one lowercase letter." },
        { regex: /[0-9]/, message: "At least one number." },
        {
          regex: /[!@#$%^&*(),.?":{}|<>]/,
          message: "At least one special character.",
        },
      ];

      const strengthMessages = [];
      strengthCriteria.forEach((criteria) => {
        if (!criteria.regex.test(password)) {
          strengthMessages.push(criteria.message);
        }
      });

      let strengthLabel = "";
      let strengthClass = "";

      if (strengthMessages.length === 0) {
        strengthLabel = "Strong";
        strengthClass = "text-green-500";
      } else if (strengthMessages.length <= 2) {
        strengthLabel = "Medium";
        strengthClass = "text-yellow-500";
      } else {
        strengthLabel = "Weak";
        strengthClass = "text-red-500";
      }

      return { label: strengthLabel, class: strengthClass };
    },

    handlePasswordInput() {
      this.validateFields();
      this.updatePasswordStrength();
    },
    handleConfirmPasswordInput() {
      this.validateFields();
    },
    handlePhoneInput() {
      this.validateFields();
      this.updatePhoneNumber();
    },

    updatePasswordStrength() {
      const { label, class: strengthClass } = this.checkPasswordStrength(
        this.companies.password
      );
      this.passwordStrengthLabel = label;
      this.passwordStrengthClass = strengthClass;
    },

    validateFields() {
      this.errors = {};
      if (!this.companies.owner_name)
        this.errors.owner_name = "Owner name is required";
      if (!this.companies.name) this.errors.name = "Company name is required";
      if (!this.companies.description)
        this.errors.description = "Description is required";
      if (!this.companies.contact_phone)
        this.errors.contact_phone = "Contact phone is required";
      if (!this.companies.contact_email)
        this.errors.contact_email = "Contact email is required";
      if (!this.companies.operating_hours)
        this.errors.operating_hours = "Operating hours are required";
      if (!this.companies.country)
        this.errors.country = "Country must be selected";
      if (!this.companies.category_id)
        this.errors.category_id = "Category must be selected";
      if (!this.companies.address) this.errors.address = "Address is required";
      if (!this.companies.region) this.errors.region = "Region is required";
      if (!this.companies.city) this.errors.city = "City is required";
      if (!this.companies.license_url)
        this.errors.license_url = "License URL is required";
      if (!this.companies.images || this.companies.images.length === 0)
        this.errors.images = "At least one image must be uploaded";

      if (this.showPassword) {
        if (!this.companies.password)
          this.errors.password = "Password is required";
        if (!this.companies.password_confirmation)
          this.errors.password_confirmation =
            "Password confirmation is required";
        if (
          this.companies.password &&
          this.companies.password_confirmation &&
          this.companies.password !== this.companies.password_confirmation
        )
          this.errors.password_mismatch = "Passwords do not match";
      }
    },
    checkButtonState() {
      return Object.keys(this.errors).length > 0;
    },

    nextShow() {
      this.validateFields();
      if (this.checkButtonState()) {
        console.log("Form is invalid, please correct the errors.");
      } else {
        this.nextStep = "next";
        this.showPassword = true;
        this.validateFields();
        // this.$refs.cardSection.scrollIntoView({ behavoir: 'smooth', block: 'start' })
      }
    },
    async registerCompany() {
  const companyData = {
    contact_email: this.companies.contact_email,
    password: this.companies.password,
  };

  try {
    this.changeNaxt = "loading...";
    this.emailError = ""; 

    const auth = getAuth();

   
    const signInMethods = await fetchSignInMethodsForEmail(auth, companyData.contact_email);
    if (signInMethods.length > 0) {
 
      this.emailInUse = true; 
      this.emailError = "Email is already in use. Please use a different email.";
      this.changeNaxt = "Next Page"; 
      return; 
    }

    const tempPassword = Math.random().toString(36).slice(-8);
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      companyData.contact_email,
      tempPassword
    );

    await sendEmailVerification(userCredential.user);
  alert("A verification email has been sent. Please check your inbox.");

  localStorage.setItem("temporaryPassword", tempPassword);

  const token = await userCredential.user.getIdToken();
  localStorage.setItem("firebaseToken", token);
  console.log("User Token:", token);

  localStorage.setItem("email", companyData.contact_email);
  
  localStorage.setItem("token", token);

    alert("Please verify your email to complete your registration.");
    this.changeNaxt = "Next"; 
    this.nextShow()
  } catch (error) {
    console.error("Error during registration:", error.message);
    this.emailError = error.message || "An error occurred. Please try again.";
  }
},
    async handleRegister() {
      const name = this.companies.name;
      const owner_name = this.companies.owner_name;
      const description = this.companies.description;
      const password = this.companies.password;
      const password_confirmation = this.companies.password_confirmation;
      const operating_hours = this.companies.operating_hours;
      const category_id = this.companies.category_id;
      const address = this.companies.address;
      const city = this.companies.city;
      const region = this.companies.region;
      const country = this.companies.country;
      const contact_phone = this.companies.contact_phone;
      const contact_email = this.companies.contact_email.trim().toLowerCase();
      const website = this.companies.website;
      const license_url = this.companies.license_url;
      const token = localStorage.getItem('token')

      const socialMediaLinks = {
        facebook: this.companies.social_media_links || "",
        instagram: this.companies.social_media_links || "",
        linkedin: this.companies.social_media_links || "",
      };

      const status = this.companies.status;
      const rating_avg = this.companies.rating_avg;
      const images = this.imageUrl
        ? JSON.stringify([this.imageUrl])
        : JSON.stringify([]);

      const companyData = {
        name,
        owner_name,
        description,
        // password,
        // password_confirmation,
        operating_hours,
        category_id,
        address,
        city,
        region,
        country,
        contact_phone,
        contact_email,
        website,
        license_url,
        social_media_links: JSON.stringify(socialMediaLinks),
        status,
        rating_avg,
        images,
        token
      };

      const auth = getAuth();

      try {
        const currentUser = auth.currentUser;

        if (!currentUser) {
          const tempPassword = Math.random().toString(36).slice(-8);
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            companyData.contact_email,
            tempPassword
          );
          await sendEmailVerification(userCredential.user);
          alert("A verification email has been sent. Please check your inbox.");
          localStorage.setItem("temporaryPassword", tempPassword);
          return;
        } else {
          await currentUser.reload();
          const password = this.companies.password
          if (currentUser.emailVerified) {
            const tempPassword = localStorage.getItem("temporaryPassword");
            const success = await updateUserPassword(
              contact_email,
              tempPassword,
              password
            );

            if (success) {
              const response = await axios.post(`https://bizethio-backend-production-944c.up.railway.app/api/company/register`, companyData, {
                headers: {
                  "Content-Type": "application/json",
                },
              });

              console.log("Company registered successfully", response.data);
              this.companies.password = "";
              this.companies.password_confirmation = "";
              this.changeRegister = "Register Company";
              this.$router.push("/signin");
            }
          } else {
            alert(
              "Your email is not verified. Please verify your email before registering again."
            );
            this.companies.password = "";
            this.companies.password_confirmation = "";
          }
        }
      } catch (error) {
        let errorMessage = 'An error occured. please try again'
        if (error.response) {
          errorMessage = error.response.data.message || errorMessage
        }
        this.showError(errorMessage);
        this.companies.password = "";
        this.companies.password_confirmation = "";
      }
    },
    showError(message) {
      this.errors = message;
      this.changeRegister = "Register Company";
      this.showRegistrationError = true
    },
    submitForm() {
      this.validateFields();
      if (!this.checkButtonState()) {
        this.changeRegister = "loading...";
        this.handleRegister();
        this.showError()
      }
    },

    hidepassword() {
      this.showPassword = false;
      this.changeNaxt = "next";
      this.registeredUser =true
    },

    triggerFileInput() {
      this.$refs.fileInput.click();
    },

    handleFileChange(event) {
      this.file = event.target.files;
      this.uploadImage();
    },

    async uploadImage() {
      if (!this.file || this.file.length === 0) return;

      this.isUploading = true;
      this.errors.images = null; // Clear previous errors

      const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`;
      const promises = [];

      for (const singleFile of this.file) {
        const formData = new FormData();
        formData.append("file", singleFile);
        formData.append("upload_preset", "my_unsigned_preset");

        promises.push(
          fetch(cloudinaryUrl, {
            method: "POST",
            body: formData,
          }).then((response) => response.json())
        );
      }

      try {
        const responses = await Promise.all(promises);
        console.log("Upload responses:", responses);
        this.imageUrl = responses.map((data) => data.secure_url);
        this.companies.images = JSON.stringify(this.imageUrl);
        console.log("Uploaded image URLs:", this.imageUrl);
      } catch (error) {
        console.error("Error uploading images:", error);
        this.errors.images = "Failed to upload images. Please try again.";
      } finally {
        this.isUploading = false;
      }
    },
    toggleImageButton() {
      this.ImageButton = false;
    },
    disableButtons() {
      this.isButtonDisabled = true;
      setTimeout(() => {
        this.isButtonDisabled = false;
      }, this.timeOutDuration);
    },
    checkButtonDisabled() {
      return !this.validateFields();
    },
    async fetchCategories() {
      try {
        const response = await axios.get("https://bizethio-backend-production-944c.up.railway.app/api/categories");
        this.categories = response.data;
        console.log("categoriessss", this.categories);
      } catch (error) {
        this.error = "Failed to fetch categories.";
        console.error(error);
      }
    },

    async fetchCountries() {
  try {
    const response = await axios.get("https://api.countrylayer.com/v2/all", {
      params: {
        access_key: "a8e3e4dae4186911b562e106bb4ca0d9" 
      }
    });
    
    this.countries = response.data;
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching countries:", error);
  }
}
  },
};
</script>
