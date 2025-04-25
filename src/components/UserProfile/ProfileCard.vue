<script setup>
import { ref } from "vue";
import Modal from "./Modal.vue";
import ProfileImage from "/profilepic.png";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

const userInfoString = localStorage.getItem("userInfo");

const user = JSON.parse(userInfoString);

const isProfileInfoModal = ref(false);
</script>

<template>
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
</template>
