<template>
  <UserLayoutUser>
    <div class="lg:px-20 mb-40 lg:w-9/10 lg:mx-auto lg:pt- lg:pb-80">
      <div class="bg-white h-4/5 lg:h-6/7 w-11/12 lg:w-8/9 mb-10 p-2 mt-4 ml-7 rounded-2xl">
        <p class="font-semibold lg:font-bold lg:ml-4">Edit Profile</p>
        <div
          class="bg-gradient-to-l from-[#1B7590] to-[#1B7B90] relative h-[400px] w-11/12 lg:w-8/9 mx-auto mb-4 rounded-2xl p-20 ">
          <div class="ml-28">
            <div
              class="w-20 h-8 rounded-bl-4xl bg-white absolute top-0 right-0 rounded-tr-xl border-2 border-[#176678] text-[#1B7B90] text-xs font-semibold text-center pt-1">
              <p>{{ userInformations.verification_status }}</p>
            </div>
          </div>
          <div v-if="loading" class="flex justify-center items-center py-20">
            <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-white -mt-8"></div>
          </div>
          <div v-else-if="!userInformations" class="flex justify-center items-center py-20">
            <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-gray-400" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 20c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z" />
            </svg>
          </div>
          <div v-else class="flex lg:-ml-20 ">
            <div class="relative flex justify-center">
              <img :src="userInformations.profile_picture_url" alt="Profile Picture"
                class="-ml-18 -mt-6 w-16 h-16 rounded-full md:w-24 md:h-24 md:ml-10 lg:w-72 lg:h-64 lg:rounded-md lg:-mt-14" />
              <i @click="triggerImageUpload"
                class="fa-solid fa-camera-retro cursor-pointer text-gray-200 absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 md:text-lg lg:text-2xl"></i>
            </div>
            <input type="file" ref="fileInput" accept="image/*" class="hidden" @change="handleImageUpload" />
            <div class="text-white -mt-6 lg:ml- -ml-2 w-11/12">
              <div class="flex ml-4 w-56 mt-6 md:ml-20">
                <div class="text-[12px] font-normal text-gray-100 md:text-[16px]">
                  <p class="mb-3 -mt-1">Name</p>
                  <!-- <p class="mb-3">Email</p> -->
                  <p class="mb-2">Phone</p>
                  <p class="mb-3">City</p>
                  <p class="mb-3 pt-2">Subcity</p>
                  <!-- <p class="mb-3">Location</p> -->
                </div>
                <div class="text-[12px] w-5/6 font-normal text-gray-100 -mt-4 ml-5 md:text-[16px]">
                  <input type="text" v-model="userInformations.name" class="border-b-2 w-56 outline-none h-9"
                    placeholder="Enter your name" />
                  <!-- <input
                    type="email"
                    v-model="userInformations.email"
                    class="border-b-2 w-56 outline-none h-9"
                    placeholder="Enter your email"
                  /> -->
                  <input type="text" v-model="userInformations.phone_number"
                    class="border-b-2 w-56 mt-1 outline-none h-9" placeholder="Enter your phone number" />
                  <input type="text" v-model="userInformations.city" class="border-b-2 w-56 outline-none h-9"
                    placeholder="Enter your city" />
                  <input type="text" v-model="userInformations.sub_city" class="border-b-2 w-56 outline-none h-9"
                    placeholder="Enter your subcity" />
                </div>
              </div>
            </div>
          </div>


          <div class="flex -ml-14 absolute md:h-10 mt-10 lg:ml-8 lg:mt-14 w-80 lg:w-full md:w-full md:-mt-1 md:mx-auto">
            <div @click="backToProfile"
              class="flex ml-16 bg-[#075E86] cursor-pointer hover:bg-[#6291a7] rounded-lg px-4 w-16 h-10 md:10 md:ml-72 lg:ml-6 lg:w-20 lg:mx-auto">
              <button class="text-[14px] font-normal text-white lg:text-center ml-2 cursor-pointer">
                back
              </button>
            </div>
            <router-link to="/ChangePassword" class="flex bg-[#075E86]  hover:bg-[#6291a7] w-36 py-2 px-2 rounded-lg">
              <p class="text-[14px] text-center w-30 mx-auto lg:mt- font-normal text-white">Change Password</p>
            </router-link>
            <div @click="saveUserInfo"
              class="flex ml-16 cursor-pointer bg-[#075E86] hover:bg-[#6291a7] rounded-lg px-4 lg:px-6 w-16 h-10 md:10 md:ml-72 lg:ml-10 lg:w-20 lg:mx-auto">
              <button class="text-[14px] font-normal cursor-pointer text-white lg:text-center ml-2 lg:ml-0"
                :disabled="loading">
                <span class="-ml-3.5" v-if="loading">Uploading</span>
                <span v-else>Save</span>
              </button>
            </div>
          </div>


          <div class="text-white lg:ml-28  lg:-mt-4 -ml-2 w-11/12">
            <div class="flex ml-4 w-56 mt-6 md:ml-20 lg:ml-56">
              <div class="text-[12px] font-normal text-gray-100 md:text-[16px]">

              </div>
              <div class="text-[12px] w-5/6 font-normal cursor-pointer text-gray-100 -mt-4 ml-5 md:text-[16px]">
                <button @click="showMap = !showMap"
                  class="text-xs bg-[#075E86] hover:bg-[#6291a7] rounded-lg w-56 outline-none h-9 cursor-pointer text-white">
                  Select Location
                </button>
                <!-- {{ userInformations.location }} -->
              </div>
            </div>
          </div>
          <div v-if="showMap" class="modal">
            <div class="modal-content"> 

              <MapComponent :currentLocation="selectedLatLng" @close="handleClose"
                @location-selected="handleLocationSelected" />
            </div>
          </div>
        </div>

      </div>
    </div>
  </UserLayoutUser>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from "axios";
import UserLayoutUser from "@/layout/UserLayoutUser.vue";
import MapComponent from "@/components/MapComponent.vue";
import { useRouter } from 'vue-router';

export default {
  components: {
    UserLayoutUser,
    MapComponent,
  },
  setup() {
    const userInformations = ref([null]);
    const imageFile = ref(null);
    const showMap = ref(false);
    const loading = ref(true);
    const selectedLatLng = ref({ lat: null, lng: null });
    const router = useRouter();

    const fetchUserInfo = async () => {
      loading.value = true;
      try {
        const userId = localStorage.getItem("user_id");
        if (!userId) {
          console.error("User ID not found in localStorage");
          return;
        }

        const response = await axios.get(`https://bizethio-backend-production-944c.up.railway.app/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        userInformations.value = response.data;
        localStorage.setItem("userInformations", JSON.stringify(userInformations.value));
        console.log("User Informations:", userInformations.value);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
      finally {
        loading.value = false;
      }
    };

    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            selectedLatLng.value = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            userInformations.value.location = selectedLatLng.value;
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

    const saveUserInfo = async () => {
      try {
        loading.value = true;
        const userId = localStorage.getItem("user_id");

        let imageUrl = userInformations.value.profile_picture_url;
        if (imageFile.value) {
          const cloudinaryResponse = await uploadImageToCloudinary(imageFile.value);
          imageUrl = cloudinaryResponse.secure_url;
        }

        const locationString = JSON.stringify({
          lat: selectedLatLng.value.lat,
          lng: selectedLatLng.value.lng,
        });
        const userData = {
          ...userInformations.value,
          profile_picture_url: imageUrl,
          location: locationString,
        };

        const response = await axios.put(`https://bizethio-backend-production-944c.up.railway.app/api/users/${userId}`, userData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        console.log("User Information updated:", response.data);
        alert("Profile updated successfully!");
      } catch (error) {
        console.error("Error updating user information:", error.response || error.message);
        alert("Failed to update profile.");
      } finally {
        loading.value = false;
      }
    };

    // const uploadImageToCloudinary = async (file) => {
    //   const formData = new FormData();
    //   formData.append('file', file);
    //   formData.append('upload_preset', 'my_unsigned_preset');

    //   const response = await axios.post('https://api.cloudinary.com/v1_1/dwh8v2zhg/image/upload', formData);
    //   return response.data;
    // };

    // const triggerImageUpload = () => {
    //   const fileInput = document.querySelector('input[type="file"]');
    //   fileInput.click();
    // };
    const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'my_unsigned_preset');

    try {
        const response = await axios.post('https://api.cloudinary.com/v1_1/dwh8v2zhg/image/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data' // Specify the content type
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error; // Rethrow the error for further handling if needed
    }
};

const triggerImageUpload = () => {
    const fileInput = document.querySelector('input[type="file"]');
    fileInput.click();
};

    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!validImageTypes.includes(file.type)) {
          alert('Please upload a valid image (JPEG, PNG, GIF)');
          return;
        }

        imageFile.value = file;
        const reader = new FileReader();
        reader.onload = (e) => {
          userInformations.value.profile_picture_url = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    };

    const backToProfile = () => {
      router.push("/UserProfile");
    };

    const handleClose = () => {
      showMap.value = false;
    };

    const handleLocationSelected = (latlng) => {
      selectedLatLng.value = latlng;
      userInformations.value.location = {
        lat: latlng.lat,
        lng: latlng.lng
      };
      console.log('Selected Location:', selectedLatLng.value);
      if(userInformations.value.location.lat!== null&&userInformations.value.location.lng!== null){

showMap.value = false;
locationInfo.value = 'Location added Sucessfully '
localStorage.setItem('locationInfo',locationInfo.value)
locationMessage.value = 'Change Location'
localStorage.setItem('locationMessage',locationMessage.value)
}
    };

    onMounted(() => {
      fetchUserInfo();
      getCurrentLocation();
      localStorage.getItem('userInformations') && (userInformations.value = JSON.parse(localStorage.getItem('userInformations')));
    });

    return {
      userInformations,
      imageFile,
      loading,
      showMap,
      selectedLatLng,
      fetchUserInfo,
      getCurrentLocation,
      saveUserInfo,
      uploadImageToCloudinary,
      triggerImageUpload,
      handleImageUpload,
      backToProfile,
      handleClose,
      handleLocationSelected,
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