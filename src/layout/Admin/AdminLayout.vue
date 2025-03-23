<script setup>
import Logo from "@/components/icons/Logo.vue";
import { ref, onMounted } from "vue";

const isSidebarOpen = ref(false);
const sidebar = ref(null);

const handleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
  console.log(isSidebarOpen.value);
};

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
  <div class="">
    <div class="h-screen w-full overflow-y pt-10 px-4 relative">
      <!-- Mobile Sidebar -->
      <div class="md:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="size-10 fill-primaryColor"
          fill="#000000"
          viewBox="0 0 256 256"
          @click="handleSidebar"
        >
          <path
            d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,109.66-32,32a8,8,0,0,1-11.32-11.32L148.69,136H88a8,8,0,0,1,0-16h60.69l-18.35-18.34a8,8,0,0,1,11.32-11.32l32,32A8,8,0,0,1,173.66,133.66Z"
          ></path>
        </svg>

        <div
          class="absolute bottom-0 text-white h-screen w-full z-10 pt-14 px-4 left-0 bg-darkBlue overscroll-contain overflow-y-hidden"
          ref="sidebar"
          :class="{ hidden: isSidebarOpen }"
        >
          <div class="flex w-full justify-between">
            <Logo class="w-[100px] fill-white" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="size-10 fill-primaryColor"
              viewBox="0 0 256 256"
              @click="handleSidebar"
            >
              <path
                d="M165.66,101.66,139.31,128l26.35,26.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"
              ></path>
            </svg>
          </div>
          <div class="px-8 mt-16">
            <ul class="text-2xl space-y-4">
              <li class="">Menu</li>
              <li class="">Profile</li>
              <li class="">Dashboard</li>
            </ul>
            <ul class="ml-8 text-xl space-y-3 mt-2">
              <li class="">Companies</li>
              <li class="">Users</li>
              <li class="">Categories</li>
              <li class="">Rating</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="ml-4">
        <slot />
      </div>
    </div>
  </div>
</template>
