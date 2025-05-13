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

onMounted(async () => {
  await fetchUserInfo();
});

const fetchUserInfo = async () => {
  const userInfoString = localStorage.getItem("userInfo");
  userInfo.value = JSON.parse(userInfoString);
  tempUserInfo.value = { ...userInfo.value };
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
    $toast.error("Failed to update profile.", {
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
      <AdminCalendar />
      <div class=""></div>
      <AdminNotification />
    </div>

    <!-- Modal -->
    <div
      v-if="isModalOpen"
      class="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center"
      @click.self="closeModal"
    >
      <div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 class="text-2xl font-bold mb-4">Edit Profile</h2>

        <div class="mb-4">
          <label for="name" class="block text-gray-700 text-sm font-bold mb-2"
            >Name:</label
          >
          <input
            type="text"
            id="name"
            v-model="tempUserInfo.name"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div class="mb-4">
          <label for="phone" class="block text-gray-700 text-sm font-bold mb-2"
            >Phone Number:</label
          >
          <input
            type="text"
            id="phone"
            v-model="tempUserInfo.phone_number"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div class="mb-4">
          <label for="city" class="block text-gray-700 text-sm font-bold mb-2"
            >City:</label
          >
          <input
            type="text"
            id="city"
            v-model="tempUserInfo.city"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div class="mb-4">
          <label
            for="subcity"
            class="block text-gray-700 text-sm font-bold mb-2"
            >Subcity:</label
          >
          <input
            type="text"
            id="subcity"
            v-model="tempUserInfo.sub_city"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <!-- Image Upload -->
        <div class="mb-2">
          <label for="image" class="block text-gray-700 text-sm font-bold mb-1">
            Profile Picture:
          </label>
          <img
            :src="tempUserInfo.profile_picture_url"
            alt="Profile Picture"
            class="w-20 h-20 rounded-full mb-2"
          />
          <div
            class="relative w-52 h-36 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center overflow-hidden cursor-pointer hover:bg-gray-100"
          >
            <input
              type="file"
              id="image"
              class="absolute w-full h-full top-0 left-0 opacity-0 cursor-pointer"
              @change="onFileSelected"
              accept="image/*"
            />
            <img
              v-if="previewImage"
              :src="previewImage"
              alt="Preview"
              class="max-w-full max-h-full object-cover"
            />
            <div v-else class="text-gray-700 text-sm text-center p-2">
              Click or drag image here to upload
            </div>
          </div>
          <p v-if="uploaded" class="mt-2 text-green-500">{{ uploaded }}</p>
        </div>

        <div class="flex justify-end">
          <button
            class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
            type="button"
            @click="closeModal"
          >
            Cancel
          </button>
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            @click="saveChanges"
            :disabled="loading"
          >
            <span v-if="loading">Saving...</span>
            <span v-else>Save</span>
          </button>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>
