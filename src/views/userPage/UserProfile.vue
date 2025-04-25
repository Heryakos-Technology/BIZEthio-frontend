<script setup>
import { ref } from "vue";
import ProfileCard from "@/components/UserProfile/ProfileCard.vue";
import PersonalInfoCard from "@/components/UserProfile/PersonalInfoCard.vue";
import AddressCard from "@/components/UserProfile/AddressCard.vue";
import UserLayoutUser from "@/layout/UserLayoutUser.vue";
</script>

<template>
  <UserLayoutUser>
    <div
      class="rounded-2xl border border-gray-200 p-5 lg:p-6 max-w-[1200px] mx-auto xl:space-y-16"
    >
      <h3 class="mb-5 text-lg font-semibold text-gray-800 lg:mb-7">Profile</h3>
      <profile-card />
      <personal-info-card />
      <address-card />
    </div>
  </UserLayoutUser>
</template>
