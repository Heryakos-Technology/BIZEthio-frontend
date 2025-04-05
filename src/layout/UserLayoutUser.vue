<script setup>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <Navbar />
  <div class="pt-[50px]  md:pt-[90px]">
    <slot />
  </div>
  <Footer />
</template>
