<script setup>
import { ref, onMounted } from "vue";
import UserLayoutUser from "@/layout/UserLayoutUser.vue";
import Modal from "@/components/UserProfile/Modal.vue";
import { useAuthStore } from "@/stores/auth";
import axios from "axios";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import MapComponent from "@/components/MapComponent.vue"; // Import MapComponent

const authStore = useAuthStore();

const $toast = useToast();

const isProfileInfoModal = ref(false);
const userInfoString = localStorage.getItem("userInfo");
const user = ref(JSON.parse(userInfoString));
const imageFile = ref(null);
const loading = ref(false);
const showMap = ref(false); // Add ref for map visibility
const selectedLatLng = ref({ lat: null, lng: null }); // Add ref for selected location
const locationInfo = ref(
  localStorage.getItem("locationInfo") || "No location added"
);
const locationMessage = ref(
  localStorage.getItem("locationMessage") || "Select Location"
);

onMounted(() => {
  // Initialize local state with user data
  nameInput.value = user.value.name;
  phoneInput.value = user.value.phone_number;
  cityInput.value = user.value.city;
  subCityInput.value = user.value.sub_city;
  profilePictureUrl.value = user.value.profile_picture_url;
  // Initialize selectedLatLng from user data if available
  if (user.value.location) {
    try {
      const location = JSON.parse(user.value.location);
      selectedLatLng.value = { lat: location.lat, lng: location.lng };
    } catch (error) {
      console.error("Error parsing location:", error);
    }
  }
});

const nameInput = ref("");
const phoneInput = ref("");
const cityInput = ref("");
const subCityInput = ref("");
const profilePictureUrl = ref("");

const saveProfile = async () => {
  try {
    loading.value = true;
    const userId = localStorage.getItem("user_id");

    let imageUrl = profilePictureUrl.value;
    if (imageFile.value) {
      const cloudinaryResponse = await uploadImageToCloudinary(imageFile.value);
      imageUrl = cloudinaryResponse.secure_url;
    }

    // Stringify the location data
    const locationString = JSON.stringify({
      lat: selectedLatLng.value.lat,
      lng: selectedLatLng.value.lng,
    });

    const userData = {
      ...user.value,
      name: nameInput.value,
      phone_number: phoneInput.value,
      city: cityInput.value,
      sub_city: subCityInput.value,
      profile_picture_url: imageUrl,
      location: locationString, // Save the stringified location
    };

    const response = await axios.put(
      `https://bizethio-backend-production-4c6c.up.railway.app/api/users/${userId}`,
      userData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    console.log("User Information updated:", response.data);
    $toast.success("Profile updated successfully!", {
      position: "top",
    });

    // Update local storage
    localStorage.setItem("userInfo", JSON.stringify(userData));
    user.value = userData; // Update the user ref
  } catch (error) {
    console.error(
      "Error updating user information:",
      error.response || error.message
    );
    $toast.error("Failed to update profile.", {
      position: "top",
    });
  } finally {
    loading.value = false;
    isProfileInfoModal.value = false;
  }
};

const uploadImageToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "my_unsigned_preset");

  try {
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dwh8v2zhg/image/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Specify the content type
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error uploading image:", error);
    $toast.error("Failed to upload image.", {
      position: "top",
    });
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
    const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!validImageTypes.includes(file.type)) {
      $toast.error("Please upload a valid image (JPEG, PNG, GIF)", {
        position: "top",
      });
      return;
    }

    imageFile.value = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      profilePictureUrl.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const handleClose = () => {
  showMap.value = false;
};

const handleLocationSelected = (latlng) => {
  selectedLatLng.value = latlng;
  locationInfo.value = "Location added Successfully";
  localStorage.setItem("locationInfo", locationInfo.value);
  locationMessage.value = "Change Location";
  localStorage.setItem("locationMessage", locationMessage.value);
  showMap.value = false;
};
</script>

<template>
  <UserLayoutUser>
    <div
      class="rounded-2xl border border-gray-200 p-5 lg:p-6 max-w-[1200px] mx-auto xl:space-y-16"
    >
      <h3 class="mb-5 text-lg font-semibold text-gray-800 lg:mb-7">Profile</h3>
      <div>
        <div
          class="p-5 mb-6 border border-black/40 shadow-theme-lg rounded-2xl lg:p-6"
        >
          <div
            class="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between"
          >
            <div class="flex flex-col items-center w-full gap-6 xl:flex-row">
              <div
                class="w-20 h-20 overflow-hidden border border-gray-200 rounded-full"
              >
                <img :src="user.profile_picture_url" alt="user" />
              </div>
              <div class="order-3 xl:order-2">
                <h4
                  class="mb-2 text-lg font-semibold text-center uppercase text-gray-800 ark:text-white/90 xl:text-left"
                >
                  {{ user.name }}
                </h4>
              </div>
            </div>
            <button
              :onclick="authStore.logout"
              class="flex justify-center items-center min-w-fit max-w-fit bg-red-500 text-white hover:bg-red-800 cursor-pointer p-2 rounded-lg"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>

      <div>
        <div
          class="p-5 mb-6 border border-black/40 shadow-theme-lg rounded-2xl ark:border-gray-800 lg:p-6"
        >
          <div
            class="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between"
          >
            <div>
              <h4
                class="text-lg font-semibold text-gray-800 capitalize lg:mb-6"
              >
                Personal Information
              </h4>

              <div
                class="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32"
              >
                <div>
                  <p
                    class="mb-2 text-xs leading-normal text-gray-500 ark:text-gray-400"
                  >
                    Name
                  </p>
                  <p class="text-sm font-medium text-gray-800 uppercase">
                    {{ user.name }}
                  </p>
                </div>

                <div>
                  <p
                    class="mb-2 text-xs leading-normal text-gray-500 ark:text-gray-400"
                  >
                    Email address
                  </p>
                  <p class="text-sm font-medium text-gray-800">
                    {{ user.email }}
                  </p>
                </div>

                <div>
                  <p
                    class="mb-2 text-xs leading-normal text-gray-500 ark:text-gray-400"
                  >
                    Phone
                  </p>
                  <p class="text-sm font-medium text-gray-800 capitalize">
                    {{ user.phone_number }}
                  </p>
                </div>
              </div>
            </div>

            <button class="edit-button" @click="isProfileInfoModal = true">
              <svg
                class="fill-current"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
                  fill=""
                />
              </svg>
              Edit
            </button>
          </div>
        </div>
        <Modal v-if="isProfileInfoModal" @close="isProfileInfoModal = false">
          <template #body>
            <div
              class="no-scrollbar relative min-w-full translate-x-12 w-full xs:min-w-0 mx-auto max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 ark:bg-gray-900 lg:p-11 2xl:translate-x-16"
            >
              <!-- close btn -->
              <button
                @click="isProfileInfoModal = false"
                class="transition-color absolute right-5 top-5 z-999 flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600 ark:bg-gray-700 ark:bg-white/[0.05] ark:text-gray-400 ark:hover:bg-white/[0.07] ark:hover:text-gray-300"
              >
                <svg
                  class="fill-current"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M6.04289 16.5418C5.65237 16.9323 5.65237 17.5655 6.04289 17.956C6.43342 18.3465 7.06658 18.3465 7.45711 17.956L11.9987 13.4144L16.5408 17.9565C16.9313 18.347 17.5645 18.347 17.955 17.9565C18.3455 17.566 18.3455 16.9328 17.955 16.5423L13.4129 12.0002L17.955 7.45808C18.3455 7.06756 18.3455 6.43439 17.955 6.04387C17.5645 5.65335 16.9313 5.65335 16.5408 6.04387L11.9987 10.586L7.45711 6.04439C7.06658 5.65386 6.43342 5.65386 6.04289 6.04439C5.65237 6.43491 5.65237 7.06808 6.04289 7.4586L10.5845 12.0002L6.04289 16.5418Z"
                    fill=""
                  />
                </svg>
              </button>
              <div class="px-2 pr-14">
                <h4
                  class="mb-2 text-2xl font-semibold text-gray-800 capitalize"
                >
                  Edit Personal Information
                </h4>
                <p class="mb-6 text-sm text-gray-500 ark:text-gray-400 lg:mb-7">
                  Update your details to keep your profile up-to-date.
                </p>
              </div>
              <form class="flex flex-col">
                <div class="custom-scrollbar h-[458px] overflow-y-auto p-2">
                  <div class="mt-7">
                    <h5
                      class="mb-5 text-lg font-medium text-gray-800 capitalize lg:mb-6"
                    >
                      Personal Information
                    </h5>

                    <div
                      class="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2"
                    >
                      <div class="col-span-2 lg:col-span-1">
                        <label
                          class="mb-1.5 block text-sm font-medium text-gray-700 ark:text-gray-400"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          v-model="nameInput"
                          class="ark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 ark:border-gray-700 ark:bg-gray-900 capitalize ark:placeholder:text-white/30 ark:focus:border-brand-800"
                        />
                      </div>

                      <div class="col-span-2 lg:col-span-1">
                        <label
                          class="mb-1.5 block text-sm font-medium text-gray-700 ark:text-gray-400"
                        >
                          Phone
                        </label>
                        <input
                          type="text"
                          v-model="phoneInput"
                          class="ark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 ark:border-gray-700 ark:bg-gray-900 capitalize ark:placeholder:text-white/30 ark:focus:border-brand-800"
                        />
                      </div>
                    </div>
                    <div class="px-2 pr-14 mt-8">
                      <h4 class="mb-2 text-2xl font-semibold text-gray-800">
                        Edit Address
                      </h4>
                    </div>
                    <div class="flex flex-col">
                      <div class="px-2 overflow-y-auto custom-scrollbar">
                        <div
                          class="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2"
                        >
                          <div>
                            <label
                              class="mb-1.5 block text-sm font-medium text-gray-700"
                            >
                              City
                            </label>
                            <input
                              type="text"
                              v-model="cityInput"
                              class="ark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 ark:border-gray-700 ark:bg-gray-900 ark:placeholder:text-white/30 ark:focus:border-brand-800"
                            />
                          </div>

                          <div>
                            <label
                              class="mb-1.5 block text-sm font-medium text-gray-700"
                            >
                              Sub City
                            </label>
                            <input
                              type="text"
                              v-model="subCityInput"
                              class="ark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 ark:border-gray-700 ark:bg-gray-900 ark:placeholder:text-white/30 ark:focus:border-brand-800"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="mt-7 lg:flex justify-around items-center">
                      <div class="">
                        <h5
                          class="mb-5 text-lg font-medium text-gray-800 capitalize lg:mb-6"
                        >
                          Profile Picture
                        </h5>
                        <div class="flex items-center">
                          <img
                            :src="profilePictureUrl"
                            alt="Profile Picture"
                            class="w-20 h-20 rounded-full mr-4"
                          />
                          <div>
                            <button
                              @click="triggerImageUpload"
                              class="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-white hover:bg-primaryColor sm:w-auto cursor-pointer"
                            >
                              Change Picture
                            </button>
                            <input
                              type="file"
                              accept="image/*"
                              class="hidden"
                              @change="handleImageUpload"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="">
                        <h5
                          class="mb-5 text-lg font-medium text-gray-800 capitalize lg:mb-6"
                        >
                          Location
                        </h5>
                        <!-- <p v-if="selectedLatLng.lat && selectedLatLng.lng">
                          Selected Location: Lat: {{ selectedLatLng.lat }}, Lng:
                          {{ selectedLatLng.lng }}
                        </p> -->
                        <button
                          @click="showMap = true"
                          class="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-white hover:bg-primaryColor sm:w-auto cursor-pointer"
                        >
                          {{ locationMessage }}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                  <button
                    @click="isProfileInfoModal = false"
                    type="button"
                    class="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-white hover:bg-primaryColor sm:w-auto cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    @click="saveProfile"
                    type="button"
                    class="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-white hover:bg-primaryColor sm:w-auto cursor-pointer"
                    :disabled="loading"
                  >
                    <span v-if="loading">Saving...</span>
                    <span v-else>Save Changes</span>
                  </button>
                </div>
              </form>
            </div>
          </template>
        </Modal>
        <div v-if="showMap" class="modal">
          <div class="modal-content">
            <MapComponent
              :currentLocation="selectedLatLng"
              @close="handleClose"
              @location-selected="handleLocationSelected"
            />
          </div>
        </div>
      </div>

      <div>
        <div
          class="p-5 border border-black/40 shadow-theme-lg rounded-2xl ark:border-gray-800 lg:p-6"
        >
          <div
            class="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between"
          >
            <div>
              <h4 class="text-lg font-semibold text-gray-800 lg:mb-6">
                Address
              </h4>

              <div
                class="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32"
              >
                <div>
                  <p class="mb-2 text-xs leading-normal text-gray-500">
                    Country
                  </p>
                  <p class="text-sm font-medium text-gray-800 capitalize">
                    Ethiopia
                  </p>
                </div>

                <div>
                  <p class="mb-2 text-xs leading-normal text-gray-500">
                    Sub City
                  </p>
                  <p class="text-sm font-medium text-gray-800 capitalize">
                    {{ user.sub_city }}
                  </p>
                </div>

                <div>
                  <p class="mb-2 text-xs leading-normal text-gray-500">City</p>
                  <p class="text-sm font-medium text-gray-800 capitalize">
                    {{ user.city }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </UserLayoutUser>
</template>

<style scoped></style>
