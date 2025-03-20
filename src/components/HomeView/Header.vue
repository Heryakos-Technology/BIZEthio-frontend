<script setup>
import router from "@/router";
import { ref, onMounted, onUnmounted, watch } from "vue";
import { RouterLink, useRoute } from "vue-router";
import Logo from "@/components/icons/Logo.vue";

const route = useRoute();

const isSidebarOpen = ref(false);

const isNavbarVisible = ref(true);
let lastScrollPosition = 0;

const handleSidebarOpen = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
  console.log(isSidebarOpen.value);
};

const navLinks = [
  { name: "RegistrationPage", label: "Campany Registration",path:'registration' },
  { name: "UserRegistration1", label: "signup" ,path:'signup'},
  { name: "UserProfile", label: "Profile",path:'UserProfile' },
  { name: "UserLanding", label: "UserLanding",path:'UserLanding' },
  { name: "SignIn", label: "sign in",path:'signin' },
];

// const handleScroll = () => {
//   const currentScrollPosition = window.scrollY;

//   if (
//     currentScrollPosition > lastScrollPosition &&
//     currentScrollPosition > 30
//   ) {
//     isNavbarVisible.value = false;
//   } else if (currentScrollPosition < lastScrollPosition) {
//     isNavbarVisible.value = true;
//   }

//   lastScrollPosition = currentScrollPosition;
// };

// onMounted(() => {
//   window.addEventListener("scroll", handleScroll);
// });

// onUnmounted(() => {
//   window.removeEventListener("scroll", handleScroll);
// });

// watch(isSidebarOpen, (newValue) => {
//   document.body.style.overflow = newValue ? "hidden" : "auto";
// });

// onUnmounted(() => {
//   document.body.style.overflow = "auto";
// });
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
      class="fixed top-0 left-0 z-50 flex w-full items-center justify-between bg-white px-4 p-1 md:hidden"
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
        <svg
          @click="handleSidebarOpen"
          class="mt-4 mr-5 ml-auto size-7 fill-[#91e5ff]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"
          />
        </svg>
        <ul class="mt-48 space-y-2 text-center text-3xl text-white">
          <li v-for="(item, index) in navLinks" :key="index">
            <RouterLink :to="{ name: item.name }" @click="handleSidebarOpen">
              {{ item.label }}
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
    <!-- Desktop Heading -->
    <div
      class="bg-gradient-to-b from-[#8ae4ff] via-[#bfecfc] to-[#eafaff] border-b px-3 py-2"
    >
      <div
        class="mx-auto hidden h-full cursor-pointer items-center justify-around md:flex max-w-[80%]"
      >
        <RouterLink
          v-for="(item, index) in navLinks"
          :key="index"
          :to="{ name: item.name }"
          class="relative py-1"
          :class="{
            ' font-semibold': item.name === route.name,
          }"
        >
          {{ item.label }}
        </RouterLink>

        <RouterLink :to="{ name: 'Home' }">
          <button
            class="cursor-pointer rounded-full bg-[#1B7590] px-8 py-1 font-medium text-white lg:px-10"
          >
            Get Started
          </button>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
