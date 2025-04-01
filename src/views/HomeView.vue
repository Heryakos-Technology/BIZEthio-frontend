<script setup>
import CallToActionSection from "@/components/HomeView/CallToActionSection.vue";
import CategoriesSection from "@/components/HomeView/CategoriesSection.vue";
import ForYourSection from "@/components/HomeView/ForYourSection.vue";
import HeroSection from "@/components/HomeView/HeroSection.vue";
import UserLayout from "@/layout/UserLayout.vue";
import { onMounted } from "vue";

 
onMounted(() => {
  window.scrollTo(0, 0);
});
</script>

<template>
  <UserLayout>
    <div class="pt-7">
      <HeroSection />
      <CategoriesSection />
      <ForYourSection />
      <CallToActionSection />
    </div>
  </UserLayout>
</template>
