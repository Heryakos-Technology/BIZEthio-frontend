<script setup>
import { ref } from "vue";

// Sample notification data
const notifications = ref({
  users: [
    { message: "Selam is logged out", color: "bg-purple-200" },
    { message: "betelhem tamru is logged in", color: "bg-yellow-200" },
    { message: "tamrat belete newly signed in", color: "bg-pink-200" },
  ],
  company: [
    { message: "rohaTech is newly registered", color: "bg-pink-200" },
    { message: "nextEthio has terminated its contract", color: "bg-blue-200" },
    { message: "vinc is now the 3rd top company", color: "bg-gray-200" },
  ],
  rating: [
    { message: "nextEthio got 5 stars", color: "bg-yellow-200" },
    { message: "rohaTech got 5 stars", color: "bg-blue-200" },
    { message: "semayawi cafe got 4 stars", color: "bg-pink-200" },
  ],
});
</script>

<template>
  <div class="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
    <!-- Users Section -->
    <div class="mb-6">
      <h2 class="text-lg font-bold text-gray-800 mb-3">users</h2>
      <div class="space-y-2">
        <div
          v-for="(notification, index) in notifications.users"
          :key="index"
          class="flex items-center p-3 rounded-md"
          :class="notification.color"
        >
          <div class="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
          <p class="text-sm text-gray-700">{{ notification.message }}</p>
        </div>
      </div>
    </div>

    <!-- Company Section -->
    <div class="mb-6">
      <h2 class="text-lg font-bold text-gray-800 mb-3">company</h2>
      <div class="space-y-2">
        <div
          v-for="(notification, index) in notifications.company"
          :key="index"
          class="flex items-center p-3 rounded-md"
          :class="notification.color"
        >
          <div class="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
          <p class="text-sm text-gray-700">{{ notification.message }}</p>
        </div>
      </div>
    </div>

    <!-- Rating Section -->
    <div class="mb-6">
      <h2 class="text-lg font-bold text-gray-800 mb-3">rating</h2>
      <div class="space-y-2">
        <div
          v-for="(notification, index) in notifications.rating"
          :key="index"
          class="flex items-center p-3 rounded-md"
          :class="notification.color"
        >
          <div class="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
          <p class="text-sm text-gray-700">{{ notification.message }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
