<script setup>
import UserLayout from "@/layout/UserLayout.vue";
import { onMounted } from "vue";

onMounted(() => {
  window.scrollTo(0, 0);
});
</script>

<template>
  <UserLayout>
    <div class="min-h-screen">CompanyDetail</div>
  </UserLayout>
</template>
