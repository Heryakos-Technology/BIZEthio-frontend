<script setup>
import Header from "@/components/HomeView/Header.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <Header />
  <div class="pt-[50px] md:pt-[90px]">
    <slot />
  </div>
  <Footer />
</template>
