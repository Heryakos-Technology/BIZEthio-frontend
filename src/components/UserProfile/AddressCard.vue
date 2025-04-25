<script setup>
import { ref } from "vue";
import Modal from "./Modal.vue";

const isProfileAddressModal = ref(false);

const userInfoString = localStorage.getItem("userInfo");

const user = JSON.parse(userInfoString);

const saveProfile = () => {
  // Implement save profile logic here
  console.log("Profile saved");
  isProfileInfoModal.value = false;
};
</script>
<template>
  <div>
    <div
      class="p-5 border border-black/40 shadow-theme-lg rounded-2xl ark:border-gray-800 lg:p-6"
    >
      <div
        class="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between"
      >
        <div>
          <h4 class="text-lg font-semibold text-gray-800 lg:mb-6">Address</h4>

          <div
            class="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32"
          >
            <div>
              <p class="mb-2 text-xs leading-normal text-gray-500">Country</p>
              <p class="text-sm font-medium text-gray-800 capitalize">
                Ethiopia
              </p>
            </div>

            <div>
              <p class="mb-2 text-xs leading-normal text-gray-500">Sub City</p>
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
</template>

<style></style>
