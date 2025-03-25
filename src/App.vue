<script setup>
import MediaUpload from "./components/MediaUpload.vue";
import Header from "@/components/HomeView/Header.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <!-- <Header /> -->
  <div
    class="w-full bg-gradient-to-b from-[#8ae4ff] via-[#bfecfc] to-[#eafaff]"
  >
    <RouterView />
  </div>
  <!-- <Footer /> -->
</template>
