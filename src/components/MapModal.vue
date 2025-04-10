<template>
  <div v-if="visible" class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
    <div class="bg-white rounded-lg p-4 w-11/12 lg:w-1/2">
      <button class="float-right text-xl font-bold text-gray-600" @click="close" aria-label="Close modal">X</button>
      <h3 class="text-xl font-bold mb-4">Location</h3>
      <iframe
        :src="mapSrc"
        width="100%"
        height="400"
        style="border:0;"
        allowfullscreen
        loading="lazy"
      ></iframe>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    mapSrc: {
      type: String,
      required: true,
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
/* Add any specific styling for the map modal here */
button {
  cursor: pointer;
}
</style>