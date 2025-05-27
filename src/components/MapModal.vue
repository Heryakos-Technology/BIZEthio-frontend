<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-4 rounded-lg w-11/12 md:w-2/3 lg:w-1/2 relative">
      <button
        @click="$emit('close')"
        class="absolute top-2 right-2 text-gray-600 hover:text-black"
      >
        &times;
      </button>
      <iframe
        :src="mapSrc"
        width="100%"
        height="400"
        style="border:0;"
        allowfullscreen
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({
  mapSrc: String,
});
</script>
