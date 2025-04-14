<script setup>
import Header from "@/components/HomeView/Header.vue";
import Footer from "@/components/Footer.vue";

const navLinks = [
  { name: "Home", label: "Profile" },
  { name: "Home", label: "Home" },
];
</script>

<template>
  <Header :navLinks="navLinks" />
  <div class="pt-[50px] md:pt-[90px]">
    <slot />
  </div>
  <Footer />
</template>
