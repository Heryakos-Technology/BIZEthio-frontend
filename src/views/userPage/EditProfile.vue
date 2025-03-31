<template>
  <UserLayout>
    <div class="lg:px-20 mb-40 lg:w-9/10 lg:mx-auto lg:pt-24 lg:pb-80">
      <div
        class="bg-white h-4/5 lg:h-6/7 w-11/12 lg:w-8/9 mb-10 p-2 mt-4 ml-7 rounded-2xl"
      >
        <p class="font-semibold lg:font-bold lg:ml-4">Edit Profile</p>
        <div
          class="bg-gradient-to-l from-[#1B7590] to-[#1B7B90] relative h-[400px] w-11/12 lg:w-8/9 mx-auto mb-4 rounded-2xl p-20 "
        >
          <div class="ml-28">
            <div class="w-20 h-8 rounded-bl-4xl bg-white absolute top-0 right-0 rounded-tr-xl border-2 border-[#176678] text-[#1B7B90] text-xs font-semibold text-center pt-1">
              <p>{{ userInformations.verification_status }}</p>
            </div>
          </div>
          <div class="flex lg:-ml-20">
            <img
              :src="userInformations.profile_picture_url"
              alt="Profile Picture"
              class="-ml-18 -mt-6 w-16 h-16 rounded-full md:w-24 md:h-24 md:ml-10 lg:w-64 lg:h-64 lg:-mt-16"
            />
            <i
            @click="triggerImageUpload"
              class="fa-solid fa-camera-retro cursor-pointer text-gray-200 mt-6 -ml-3 md:text-lg md:-ml-2 md:mt-10 lg:text-2xl lg:mt-32 lg:-ml-8"
            ></i>
            <input
              type="file"
              ref="fileInput"
              accept="image/*"
              class="hidden"
              @change="handleImageUpload"
            />
            <div class="text-white -mt-6 lg:ml- -ml-2 w-11/12">
              <div class="flex ml-4 w-56 mt-6 md:ml-20">
                <div
                  class="text-[12px] font-normal text-gray-100 md:text-[16px]"
                >
                  <p class="mb-3">Name</p>
                  <p class="mb-3">Email</p>
                  <p class="mb-2">Phone</p>
                  <p class="mb-3">City</p>
                  <p class="mb-3">Subcity</p>
                  <!-- <p class="mb-3">Location</p> -->
                </div>
                <div
                  class="text-[12px] w-5/6 font-normal text-gray-100 -mt-4 ml-5 md:text-[16px]"
                >
                  <input
                    type="text"
                    v-model="userInformations.name"
                    class="border-b-2 w-56 outline-none h-9"
                    placeholder="Enter your name"
                  />
                  <input
                    type="email"
                    v-model="userInformations.email"
                    class="border-b-2 w-56 outline-none h-9"
                    placeholder="Enter your email"
                  />
                  <input
                    type="text"
                    v-model="userInformations.phone_number"
                    class="border-b-2 w-56 outline-none h-9"
                    placeholder="Enter your phone number"
                  />
                  <input
                    type="text"
                    v-model="userInformations.city"
                    class="border-b-2 w-56 outline-none h-9"
                    placeholder="Enter your city"
                  />
                  <input
                    type="text"
                    v-model="userInformations.sub_city"
                    class="border-b-2 w-56 outline-none h-9"
                    placeholder="Enter your subcity"
                  />
                  <!-- <input
                    type="text"
                    v-model="userInformations.location"
                    class="border-b-2 w-56 outline-none h-9"
                    placeholder="Enter your location"
                  /> -->
                </div>
              </div>
            </div>
          </div>
          
        
          
          <div
            class="flex -ml-14 absolute md:h-10 mt-10 lg:ml-8 lg:mt-16 w-80 lg:w-full md:w-full md:-mt-1 md:mx-auto"
          >
            <div
              class="flex ml-16 bg-[#075E86] hover:bg-[#6291a7] rounded-lg px-4 w-16 h-10 md:10 md:ml-72 lg:ml-6 lg:w-20 lg:mx-auto"
            >
              <button
                @click="backToProfile"
                class="text-[14px] font-normal text-white lg:text-center ml-2 cursor-pointer"
              >
                back
              </button>
            </div>
            <div class="flex bg-[#075E86]  hover:bg-[#6291a7] w-36 py-2 px-2 rounded-lg">
              <router-link
                to="/ChangePassword"
                class="text-[14px] text-center w-30 mx-auto lg:mt- font-normal text-white"
                >Change Password</router-link
              >
            </div>
            <div
              class="flex ml-16 bg-[#075E86] hover:bg-[#6291a7] rounded-lg px-4 lg:px-6 w-16 h-10 md:10 md:ml-72 lg:ml-10 lg:w-20 lg:mx-auto"
            >
              <button
               
                @click="saveUserInfo"
                class="text-[14px] font-normal cursor-pointer text-white lg:text-center ml-2 lg:ml-0"
                :disabled="loading"
              >
              <span class="-ml-3.5" v-if="loading">Uploading</span>
              <span v-else>Save</span>
              </button>
            </div>
          </div>

          <div class="text-white  lg:ml-48 lg:-mt-4 -ml-2 w-11/12">
          <div class="flex ml-4 w-56 mt-6 md:ml-20">
            <div class="text-[12px] font-normal text-gray-100 md:text-[16px]">
              <p class="mb-3">Location</p>
            </div>
            <div class="text-[12px] w-5/6 font-normal cursor-pointer text-gray-100 -mt-4 ml-5 md:text-[16px]">
              <button 
                @click="showMap = !showMap" 
                class=" text-xs bg-[#075E86] hover:bg-[#6291a7] rounded-lg w-56 outline-none h-9 cursor-pointer  text-white"
              >
                {{ userInformations.location || 'Select Location' }}
              </button>
            </div>
          </div>
        </div>
        <div v-if="showMap">
          <MapComponent @close="handleClose" @location-selected="handleLocationSelected" />
        </div>
          <!-- //////// -->
        </div>
        </div>
      </div>

  </UserLayout>
</template>

<script>
import axios from "axios";
import UserLayout from "@/layout/UserLayout.vue";
import MapComponent from "@/components/MapComponent.vue";
export default {
  components: {
    UserLayout,
    MapComponent,
  },
  data() {
    return {
      userInformations: {},
      imageFile: null,
      loading: false,
      showMap: false,
      selectedLatLng: { lat: null, lng: null },
    };
  },
  mounted() {
    this.fetchUserInfo();
  },
  methods: {
    handleClose() {
      this.showMap = false;
    },
    handleLocationSelected(latlng) {
  this.selectedLatLng = latlng;
  this.userInformations.location = {
    lat: latlng.lat,
    lng: latlng.lng
  };
  console.log('Selected Location:', this.selectedLatLng);
},
    async fetchUserInfo() {
      try {
        const userId = localStorage.getItem("user_id");
        if (!userId) {
          console.error("User ID not found in localStorage");
          return;
        }

        const response = await axios.get(`/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        this.userInformations = response.data;
        console.log("User Informations:", this.userInformations);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    },

    backToProfile() {
      this.$router.push("/UserProfile");
    },

    async saveUserInfo() {
      try {
        this.loading = true;
        const userId = localStorage.getItem("user_id");

        let imageUrl = this.userInformations.profile_picture_url; 
        if (this.imageFile) {
          const cloudinaryResponse = await this.uploadImageToCloudinary(this.imageFile);
          imageUrl = cloudinaryResponse.secure_url; 
        }

        const locationString = JSON.stringify({
      lat: this.selectedLatLng.lat,
      lng: this.selectedLatLng.lng,
    });
        const userData = {
          ...this.userInformations,
          profile_picture_url: imageUrl, 
          location: locationString,
        };

        const response = await axios.put(`/api/users/${userId}`, userData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        console.log("User Information updated:", response.data);
        alert("Profile updated successfully!");
      } catch (error) {
        console.error("Error updating user information:", error.response || error.message);
        alert("Failed to update profile.");
      }finally {
    this.loading = false; 
  }
    },
    async uploadImageToCloudinary(file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'my_unsigned_preset'); 

      const response = await axios.post('https://api.cloudinary.com/v1_1/dwh8v2zhg/image/upload', formData);
      return response.data;
    },
    triggerImageUpload() {
      this.$refs.fileInput.click();
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!validImageTypes.includes(file.type)) {
          alert('Please upload a valid image (JPEG, PNG, GIF)');
          return;
        }

        this.imageFile = file;
        const reader = new FileReader();
        reader.onload = (e) => {
          this.userInformations.profile_picture_url = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
  },
};
</script>

<style>
</style>
