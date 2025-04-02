<script setup>
import Logo from "@/components/icons/Logo.vue";
import { ref, onMounted, watch } from "vue";
import DashboardIcon from "/images/AdminPage/dashboard_icon.png";
import CompaniesIcon from "/images/AdminPage/companies_icon.png";
import RatingIcon from "/images/AdminPage/rating_icon.png";
import userIcons from "/images/AdminPage/users_icon.png";
import userIcon from "/images/AdminPage/user_icon.png";
import CategoriesIcon from "/images/AdminPage/categories_icon.png";
import { useAuthStore } from "@/stores/auth";
// Removed import { logout } from "@/auth";

const authStore = useAuthStore();
 
const showDropdown = ref(false);

const user_name = localStorage.getItem("user_name");


 

const isSidebarOpen = ref(false);
const sidebar = ref(null);

const handleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

 
const handleLogout = async () => {
  try {
    await authStore.logout();
  
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

watch(isSidebarOpen, (newValue) => {
  if (newValue) {
    document.body.classList.add("no-scroll");
  } else {
    document.body.classList.remove("no-scroll");
  }
});

// Prevent wheel scrolling on the sidebar
onMounted(() => {
  if (sidebar.value) {
    sidebar.value.addEventListener(
      "wheel",
      (event) => {
        event.preventDefault();
      },
      { passive: false }
    );
  }
});
</script>

<template>
  <div class="bg-[#e4e8ff]">
    <div class="h-screen w-full overflow-y pt-10 px-4 relative text-base">
      <!-- Mobile Sidebar -->
      <div
        class="w-full bg-white z-10 fixed top-0 left-0 py-1 flex px-3 justify-between items-center md:py-3 lg:px-8"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="size-9 fill-primaryColor md:opacity-0"
          fill="#000000"
          viewBox="0 0 256 256"
          @click="handleSidebar"
        >
          <path
            d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,109.66-32,32a8,8,0,0,1-11.32-11.32L148.69,136H88a8,8,0,0,1,0-16h60.69l-18.35-18.34a8,8,0,0,1,11.32-11.32l32,32A8,8,0,0,1,173.66,133.66Z"
          ></path>
        </svg>
        <div class="flex gap-x-4 items-center relative">
          <p class="font-semibold">Welcome, {{ user_name }}</p>
          <div
            class="flex gap-x-1 items-end cursor-pointer hover:font-bold transition-all ease-linear duration-200"
            @click="toggleDropdown"
          >
            <img :src="userIcon" alt="" class="size-6" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="size-5 fill-gray-600"
              viewBox="0 0 256 256"
            >
              <path
                d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"
              ></path>
            </svg>
          </div>

          <!-- Dropdown Menu -->
          <div
            v-if="showDropdown"
            class="absolute bg-white shadow-md rounded-md py-2 px-4 right-0 top-full mt-2 w-32 z-50"
          >
            <div
              @click="handleLogout"
              class="flex items-center gap-x-2 text-red-600 cursor-pointer hover:font-bold transition-all ease-linear duration-200 py-1 hover:bg-gray-100 px-1 rounded"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Log out
            </div>
          </div>
        </div>
      </div>

      <div class="md:hidden">
        <!-- Mobile sidebar content -->

        <div
          class="absolute bottom-0 z-50 text-white h-screen w-full pt-2 px-4 left-0 bg-darkBlue overscroll-contain overflow-y-auto max-w-[425px]"
          ref="sidebar"
          :class="{ hidden: !isSidebarOpen }"
        >
          <!-- ... existing sidebar content ... -->
        </div>
      </div>

      <!-- Desktop Navbar -->
      <div
        class="md:flex fixed flex-col pt-24 px-4 bg-darkBlue h-screen w-[300px] z-50 top-0 left-0 text-white hidden"
      >
        <Logo class="w-[180px] fill-white" />
        <div class="px-8 mt-16">
          <ul class="text-2xl space-y-10">
            <li
              class="flex cursor-pointer hover:font-bold transition-all ease-linear duration-200 items-center gap-2"
            >
              <div class="bg-lightBlue p-2 rounded-lg">
                <svg
                  class="size-4 fill-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"
                  />
                </svg>
              </div>
              Menu
            </li>
            <RouterLink
              :to="{ name: 'AdminProfile' }"
              class="flex cursor-pointer hover:font-bold transition-all ease-linear duration-200 gap-x-2 items-center"
            >
              <div class="bg-lightBlue p-1 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeWidth="{1.5}"
                  stroke="currentColor"
                  class="size-6 fill-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
              </div>
              Profile
            </RouterLink>
            <li
              class="flex cursor-pointer hover:font-bold transition-all ease-linear duration-200 gap-x-2 items-center"
            >
              <img :src="DashboardIcon" alt="" class="size-6" />
              Dashboard
            </li>
          </ul>
          <ul class="ml-8 text-xl mt-8 space-y-8">
            <RouterLink
              :to="{ name: 'CampanyDashBord' }"
              class="flex cursor-pointer hover:font-bold transition-all ease-linear duration-200 gap-x-2 items-center"
            >
              <img :src="RatingIcon" alt="" class="size-6" />Companies
            </RouterLink>
            <RouterLink
              :to="{ name: 'AdminUsers' }"
              class="flex cursor-pointer hover:font-bold transition-all ease-linear duration-200 gap-x-2 items-center"
            >
              <img :src="userIcons" alt="" class="size-6" />Users
            </RouterLink>
            <RouterLink
              :to="{ name: 'AdminCategories' }"
              class="flex cursor-pointer hover:font-bold transition-all ease-linear duration-200 gap-x-2 items-center"
            >
              <img :src="CompaniesIcon" alt="" class="size-6" />Categories
            </RouterLink>
            <RouterLink
              :to="{ name: 'AdminRating' }"
              class="flex cursor-pointer hover:font-bold transition-all ease-linear duration-200 gap-x-2 items-center"
            >
              <img :src="CompaniesIcon" alt="" class="size-6" />Rating
            </RouterLink>
          </ul>

          <!-- Logout button in sidebar -->
          <div
            @click="handleLogout"
            class="flex items-center gap-x-2 text-red-400 cursor-pointer hover:font-bold transition-all ease-linear duration-200 mt-12 hover:text-red-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="size-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Log out
          </div>
        </div>
      </div>
      <div class="pt-16 md:ml-[300px] bg-[#e4e8ff]">
        <slot />
      </div>
    </div>
  </div>
</template>

<style>
/* Add this to your global CSS (e.g., style.css) */
.no-scroll {
  overflow: hidden;
}
</style>
