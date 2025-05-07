<script setup>
import router from "@/router";
import Logo from "./icons/Logo.vue";
import { ref, onMounted, onUnmounted, watch, defineProps } from "vue";
const userId = localStorage.getItem("user_id");

const isSidebarOpen = ref(false);
const showOptions = ref(false);
const isNavbarVisible = ref(true);

const handleSidebarOpen = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
const signInOptions = () => {
  showOptions.value = !showOptions.value;
};
const props = defineProps({
  navLinks: {
    type: Array,
    default: () => [
      {
        name: "Home",
        label: "Home",
      },
      { name: "AboutUs", label: "About Us" },
      { name: "ContactUs", label: "Contact Us" },
    ],
  },
});
</script>
<template>
  <div class="">
    <div
      class="fixed top-0 left-0 z-50 flex w-full items-center justify-between md:py-3 bg-gradient-to-b from-[#8ae4ff] via-[#bfecfc] to-[#eafaff] px-4 py-2.5 lg:hidden"
    >
      <Logo class="w-[100px]" />
      <div @click="handleSidebarOpen" class="size-5 cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path
            d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"
          />
        </svg>
      </div>

      <!-- Mobile Sidebar -->
      <div
        class="fixed top-0 right-0 flex h-screen w-0 max-w-sm origin-right flex-col bg-black transition-all duration-700 ease-linear"
        :class="{ 'w-screen': isSidebarOpen }"
      >
        <div class="flex my-8 items-center justify-between px-4">
          <div
            class="bg-white w-fit h-fit px-2 py-1 flex justify-center items-center"
          >
            <Logo class="w-[100px]" />
          </div>
          <svg
            @click="handleSidebarOpen"
            class="size-7 fill-[#91e5ff]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"
            />
          </svg>
        </div>
        <ul
          class="mt-16 space-y-3 divide-primaryColor divide-y mx-auto text-3xl text-white"
        >
          <li
            v-for="(item, index) in props.navLinks"
            :key="index"
            class="py-1 relative"
          >
            <RouterLink :to="{ name: item.name }" @click="handleSidebarOpen">
              {{ item.label }}
            </RouterLink>
          </li>
        </ul>

        <RouterLink
          :to="{ name: 'SignIn' }"
          class="w-fit mx-auto mt-16"
          :class="{
            'hidden  w-fit': !isSidebarOpen,
          }"
        >
          <button
            class="cursor-pointer rounded-md bg-[#1B7590] px-12 py-3 font-medium text-white"
          >
            Get Started
          </button>
        </RouterLink>
      </div>
    </div>

    <div class="hidden lg:block pt-4">
      <div
        class="flex items-center w-[90%] max-w-[1000px] py-1 mx-auto rounded-full bg-[#C8EDF8] justify-between"
      >
        <div class="ml-8">
          <Logo class="w-[100px]" />
        </div>
        <ul class="flex gap-x-8 text-[16px] uppercase font-semibold">
          <li
            v-for="(item, index) in props.navLinks"
            :key="index"
            class="hover:font-bold transition-all duration-200 ease-linear group relative"
          >
            <RouterLink :to="{ name: item.name }" @click="handleSidebarOpen">
              {{ item.label }}
            </RouterLink>

            <div
              class="w-0 group-hover:w-full bottom-0-0 left-0 h-0.5 transition-all ease-linear duration-300 bg-black"
            ></div>
          </li>
        </ul>

        <button
          v-if="!userId"
          @click="signInOptions"
          class="cursor-pointer w-[160px] m-2 flex items-center justify-center rounded-full bg-[#1B7590]/80 px-6 py-2 font-medium text-white lg:px-6 hover:bg-primaryColor"
        >
          Get Started
        </button>

        <div v-else class="mt-3 lg:-ml-16 md:-ml-4">
          <router-link
            to="/UserProfile"
            class="fa-solid fa-user mr-4 -ml-14 text-gray-800 md:text-text-sm lg:text-xl"
          ></router-link>
        </div>
      </div>
      <div v-if="showOptions" class="ml-260 mt-5">
        <button
          @click="router.push('/signin')"
          class="text-blue-500 underline cursor-pointer hover:scale-110"
        >
          Sign In as a User
        </button>
        <br />
        <button
          @click="router.push('/CampanyLogin')"
          class="text-blue-500 underline mt-2 cursor-pointer hover:scale-110"
        >
          Sign In as a Campany
        </button>
      </div>
    </div>
  </div>
</template>
//:to="{ name: 'SignIn' }"
