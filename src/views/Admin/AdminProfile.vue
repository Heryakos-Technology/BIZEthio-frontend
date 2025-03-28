<script setup>
import AdminLayout from "@/layout/AdminLayout.vue";
import admin_user_profile from "/images/AdminPage/admin_user_profile.png";
import admin_profile_setting from "/images/AdminPage/admin_profile_setting.png";
import AdminCalendar from "@/components/Admin/AdminCalendar.vue";
import AdminNotification from "@/components/Admin/AdminNotification.vue";
</script>

<template>
  <AdminLayout>
    <div class="grid lg:grid-cols-2 pb-16 pt-16">
      <div
        class="bg-white relative grid max-w-[400px] w-full pt-16 mt-32 mx-auto"
      >
        <div
          class="rounded-full size-48 bg-cover bg-center absolute top-[-150px] left-[25%]"
          :style="{ backgroundImage: `url(${admin_user_profile})` }"
        ></div>

        <div class="">
          <div class="px-10">
            <h1 class="font-bold text-center text-xl">Temesgen Beyene</h1>
            <div class="flex justify-between">
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
              +2519212121
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
              not_realmail@gmail.com
            </div>
            <div class="flex items-center gap-x-2 px-10 font-semibold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="size-8 fill-black"
                viewBox="0 0 256 256"
              >
                <path
                  d="M128,64a40,40,0,1,0,40,40A40,40,0,0,0,128,64Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,128Zm0-112a88.1,88.1,0,0,0-88,88c0,31.4,14.51,64.68,42,96.25a254.19,254.19,0,0,0,41.45,38.3,8,8,0,0,0,9.18,0A254.19,254.19,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25A88.1,88.1,0,0,0,128,16Zm0,206c-16.53-13-72-60.75-72-118a72,72,0,0,1,144,0C200,161.23,144.53,209,128,222Z"
                ></path>
              </svg>
              Addis Ababa , Cherkos
            </div>
          </div>
        </div>
        <button
          class="bg-[#241ee5] mx-auto my-6 text-white rounded-md px-8 py-2"
        >
          Edit Profile
        </button>
      </div>
      <AdminCalendar />
      <div class=""></div>
      <AdminNotification />
    </div>
  </AdminLayout>
</template>
