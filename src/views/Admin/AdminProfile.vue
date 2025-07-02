<script setup>
import AdminLayout from "@/layout/AdminLayout.vue";
import admin_user_profile from "/images/AdminPage/admin_user_profile.png";
import admin_profile_setting from "/images/AdminPage/admin_profile_setting.png";
import AdminCalendar from "@/components/Admin/AdminCalendar.vue";
import AdminNotification from "@/components/Admin/AdminNotification.vue";
import { onMounted, ref } from "vue";
import axios from "axios";
import CryptoJS from "crypto-js";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import Modal from "@/components/UserProfile/Modal.vue"; // Import Modal Component

const userInfo = ref(null);
const isModalOpen = ref(false);
const imageFile = ref(null);
const loading = ref(false);
const tempUserInfo = ref(null);

// Cloudinary configuration
const uploadPreset = "my_unsigned_preset";
const cloudName = "dwh8v2zhg";
const file = ref(null);

const uploaded = ref("");
const previewImage = ref(null);

const $toast = useToast();

// Input refs for the modal
const nameInput = ref("");
const phoneInput = ref("");
const cityInput = ref("");
const subCityInput = ref("");
const profilePictureUrl = ref("");

onMounted(async () => {
  await fetchUserInfo();
});

const fetchUserInfo = async () => {
  const userInfoString = localStorage.getItem("userInfo");
  userInfo.value = JSON.parse(userInfoString);
  tempUserInfo.value = { ...userInfo.value };

  // Initialize input fields with user data
  nameInput.value = userInfo.value.name;
  phoneInput.value = userInfo.value.phone_number;
  cityInput.value = userInfo.value.city;
  subCityInput.value = userInfo.value.sub_city;
  profilePictureUrl.value = userInfo.value.profile_picture_url;

  console.log(userInfo.value);
};

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  tempUserInfo.value = { ...userInfo.value };
  clearImageUpload();
};

const updateUser = (updatedUser) => {
  userInfo.value = updatedUser;
  localStorage.setItem("userInfo", JSON.stringify(updatedUser));
  console.log("userInfo local", localStorage.getItem("userInfo"));
};

const saveChanges = async () => {
  try {
    loading.value = true;
    const userId = localStorage.getItem("user_id");

    let imageUrl = tempUserInfo.value.profile_picture_url;
    if (imageFile.value) {
      const cloudinaryResponse = await uploadImageToCloudinary(imageFile.value);
      imageUrl = cloudinaryResponse.secure_url;
    }

    const userData = {
      ...tempUserInfo.value,
      name: nameInput.value,
      phone_number: phoneInput.value,
      city: cityInput.value,
      sub_city: subCityInput.value,
      profile_picture_url: imageUrl,
    };

    const response = await axios.put(
      `https://bizethio-backend-production-d484.up.railway.app/api/users/${userId}`,
      userData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    

    console.log("User Information updated:", response.data);
    updateUser(response.data.user); // Update the user info
    closeModal();
    $toast.success("Profile updated successfully!", {
      position: "top",
    });
  } catch (error) {
    console.error(
      "Error updating user information:",
      error.response || error.message
    );
    $toast.error(error.response.data.message, {
      position: "top",
    });
  } finally {
    loading.value = false;
  }
};

const uploadImageToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const response = await axios.post(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    formData
  );
  return response.data;
};

const onFileSelected = (event) => {
  file.value = event.target.files[0];
  if (file.value) {
    previewImage.value = URL.createObjectURL(file.value);
    uploadFile();
  } else {
    previewImage.value = null;
  }
};

const uploadFile = async () => {
  uploaded.value = "Uploading Wait a Sec...";
  if (!file.value) return;

  const formData = new FormData();
  formData.append("file", file.value);
  formData.append("upload_preset", uploadPreset);

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData
    );
    uploaded.value = "Photo Uploaded Successfully";
    tempUserInfo.value.profile_picture_url = response.data.secure_url;
    imageFile.value = file.value;
  } catch (error) {
    uploaded.value = "Failed to upload photo";
    console.error("Error uploading file:", error.response.data);
  }
};

const clearImageUpload = () => {
  file.value = null;
  uploaded.value = "";
  previewImage.value = null;
  imageFile.value = null;
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
</script>

<template>
  <AdminLayout>
    <div class="grid lg:grid-cols-2 pb-16 pt-8">
      <div
        class="bg-white relative grid max-w-[400px] w-full pt-16 mt-32 mx-auto"
      >
        <div
          class="rounded-full size-48 bg-cover bg-center absolute top-[-150px] left-[25%]"
          :style="{ backgroundImage: `url(${userInfo?.profile_picture_url})` }"
        ></div>

        <div class="">
          <div class="px-10">
            <h1 class="font-bold text-center uppercase text-xl">
              {{ userInfo?.name }}
            </h1>
            <div class="flex justify-between mt-4">
              <div class="flex gap-x-2 font-semibold items-center text-lg">
                <img
                  :src="admin_profile_setting"
                  :alt="admin_profile_setting"
                />
                Admin
              </div>
              <p class="text-green-500 font-bold">Active</p>
            </div>
          </div>

          <div class="border-t py-2 border-gray-500 space-y-4 mt-5">
            <div class="flex items-center gap-x-2 px-10 font-semibold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="size-8 fill-black"
                viewBox="0 0 256 256"
              >
                <path
                  d="M144.27,45.93a8,8,0,0,1,9.8-5.66,86.22,86.22,0,0,1,61.66,61.66,8,8,0,0,1-5.66,9.8A8.23,8.23,0,0,1,208,112a8,8,0,0,1-7.73-5.94,70.35,70.35,0,0,0-50.33-50.33A8,8,0,0,1,144.27,45.93Zm-2.33,41.8c13.79,3.68,22.65,12.54,26.33,26.33A8,8,0,0,0,176,120a8.23,8.23,0,0,0,2.07-.27,8,8,0,0,0,5.66-9.8c-5.12-19.16-18.5-32.54-37.66-37.66a8,8,0,1,0-4.13,15.46Zm81.94,95.35A56.26,56.26,0,0,1,168,232C88.6,232,24,167.4,24,88A56.26,56.26,0,0,1,72.92,32.12a16,16,0,0,1,16.62,9.52l21.12,47.15,0,.12A16,16,0,0,1,109.39,104c-.18.27-.37.52-.57.77L88,129.45c7.49,15.22,23.41,31,38.83,38.51l24.34-20.71a8.12,8.12,0,0,1,.75-.56,16,16,0,0,1,15.17-1.4l.13.06,47.11,21.11A16,16,0,0,1,223.88,183.08Zm-15.88-2s-.07,0-.11,0h0l-47-21.05-24.35,20.71a8.44,8.44,0,0,1-.74.56,16,16,0,0,1-15.75,1.14c-18.73-9.05-37.4-27.58-46.46-46.11a16,16,0,0,1,1-15.7,6.13,6.13,0,0,1,.57-.77L96,95.15l-21-47a.61.61,0,0,1,0-.12A40.2,40.2,0,0,0,40,88,128.14,128.14,0,0,0,168,216,40.21,40.21,0,0,0,208,181.07Z"
                ></path>
              </svg>
              {{ userInfo?.phone_number }}
            </div>
            <div class="flex items-center gap-x-2 px-10 font-semibold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="size-8 fill-black"
                viewBox="0 0 256 256"
              >
                <path
                  d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM203.43,64,128,133.15,52.57,64ZM216,192H40V74.19l82.59,75.71a8,8,0,0,0,10.82,0L216,74.19V192Z"
                ></path>
              </svg>
              {{ userInfo?.email }}
            </div>
            <div
              class="flex items-center gap-x-2 px-10 font-semibold uppercase"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="size-8 fill-black"
                viewBox="0 0 256 256"
              >
                <path
                  d="M128,64a40,40,0,1,0,40,40A40,40,0,0,0,128,64Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,128Zm0-112a88.1,88.1,0,0,0-88,88c0,31.4,14.51,64.68,42,96.25a254.19,254.19,0,0,0,41.45,38.3,8,8,0,0,0,9.18,0A254.19,254.19,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25A88.1,88.1,0,0,0,128,16Zm0,206c-16.53-13-72-60.75-72-118a72,72,0,0,1,144,0C200,161.23,144.53,209,128,222Z"
                ></path>
              </svg>
              {{ userInfo?.sub_city }}
            </div>
          </div>
        </div>
        <button
          class="bg-primaryColor hover:bg-primaryColor/90 mx-auto cursor-pointer my-6 text-white rounded-md px-8 py-2"
          @click="openModal"
        >
          Edit Profile
        </button>
      </div>
    </div>

    <Modal v-if="isModalOpen" @close="closeModal">
      <template #body>
        <div
          class="no-scrollbar relative min-w-full translate-x-12 w-full xs:min-w-0 mx-auto max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 ark:bg-gray-900 lg:p-11 2xl:translate-x-16"
        >
          <!-- close btn -->
          <button
            @click="closeModal"
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
            <h4 class="mb-2 text-2xl font-semibold text-gray-800 capitalize">
              Edit Personal Information
            </h4>
            <p class="mb-6 text-sm text-gray-500 ark:text-gray-400 lg:mb-7">
              Update your details to keep your profile up-to-date.
            </p>
          </div>
          <form class="flex flex-col">
            <div class="custom-scrollbar h-[458px] overflow-y-auto p-2">
              <div class="mt-3">
                <h5
                  class="mb-5 text-lg font-medium text-gray-800 capitalize lg:mb-6"
                >
                  Personal Information
                </h5>

                <div class="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
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
                <div class="flex  flex-col">
                  <div class="px-2 py-3 overflow-y-auto custom-scrollbar">
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
                <div class="mt-5 lg:flex justify-start items-center">
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
                </div>
              </div>
            </div>
            <div class="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <button
                @click="closeModal"
                type="button"
                class="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-white hover:bg-primaryColor sm:w-auto cursor-pointer"
              >
                Close
              </button>
              <button
                @click="saveChanges"
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
  </AdminLayout>
</template>
