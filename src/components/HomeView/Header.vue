<script setup>
import router from "@/router";
import { ref, onMounted, onUnmounted, watch, defineProps } from "vue";
import { RouterLink, useRoute } from "vue-router";
import Logo from "@/components/icons/Logo.vue";

const userId = localStorage.getItem("user_id");

const route = useRoute();

const isSidebarOpen = ref(false);

const isNavbarVisible = ref(true);
let lastScrollPosition = 0;

const handleSidebarOpen = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
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
    ],
  },
});
</script>

<template>
  <div
    class="z-50 w-full transition-transform duration-300 ease-in-out md:fixed"
    :class="{
      '-translate-y-full md:-translate-y-[calc(100%+20px)]': !isNavbarVisible,
    }"
  >
    <!-- Mobile Header -->
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
        <div class="flex gap-x-10 px-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-8 fill-white"
            viewBox="0 0 256 256"
          >
            <path
              d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24ZM74.08,197.5a64,64,0,0,1,107.84,0,87.83,87.83,0,0,1-107.84,0ZM96,120a32,32,0,1,1,32,32A32,32,0,0,1,96,120Zm97.76,66.41a79.66,79.66,0,0,0-36.06-28.75,48,48,0,1,0-59.4,0,79.66,79.66,0,0,0-36.06,28.75,88,88,0,1,1,131.52,0Z"
            ></path>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-8 fill-white"
            viewBox="0 0 256 256"
          >
            <path
              d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"
            ></path>
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

            <div class="absolute top-0 left-0 h-3 w-8 bg-black"></div>
          </li>
        </ul>

        <RouterLink :to="{ name: 'SignIn' }" class="w-fit mx-auto mt-16">
          <button
            class="cursor-pointer rounded-md bg-[#1B7590] px-12 py-3 font-medium text-white"
          >
            Get Started
          </button>
        </RouterLink>
      </div>
    </div>
    <!-- Desktop Heading -->
    <div
      class="bg-gradient-to-b from-[#8ae4ff] via-[#bfecfc] to-[#eafaff] border-b px-3 py-2"
    >
      <div
        class="mx-auto hidden h-full py-2 cursor-pointer items-center justify-around lg:flex xl:max-w-[90%]"
      >
        <Logo class="w-[120px]" />
        <RouterLink
          v-for="(item, index) in props.navLinks"
          :key="index"
          :to="{ name: item.name }"
          class="relative py-1 text-lg hover:font-bold hover:underline transition-all duration-300 ease-linear"
          :class="{
            ' font-semibold': item.name === route.name,
          }"
        >
          {{ item.label }}
        </RouterLink>
        <div class="flex items-center gap-x-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="size-8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
          <RouterLink :to="{ name: 'UserProfile' }" v-if="userId">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="size-8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </RouterLink>

          <RouterLink
            v-if="!userId"
            :to="{ name: 'SignIn' }"
            class="cursor-pointer rounded-full bg-[#1B7590] px-6 py-2 font-medium text-white lg:px-6"
          >
            Get Started
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
