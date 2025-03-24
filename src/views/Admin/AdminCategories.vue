<script setup>
import AdminLayout from "@/layout/AdminLayout.vue";
import technology_icon from "/images/AdminPage/technology_icon.png";
import Catering_Services from "/images/AdminPage/Catering_Services.png";
import AdminDonutChart from "@/components/Admin/AdminDonutChart.vue";
</script>

<template>
  <AdminLayout>
    <div class="">
      <div class="grid xl:grid-cols-2 items-center">
        <div class="">
          <h1 class="text-3xl font-bold">Activities</h1>
          <div
            class="grid md:grid-cols-2 gap-4 text-white mt-4 w-full max-w-[300px] md:max-w-[550px] mx-auto"
          >
            <div
              class="bg-[#705ad3] w-full py-2 text-center px-4 rounded-2xl space-y-4"
            >
              <p class="font-semibold text-lg uppercase">
                least used categories
              </p>
              <div
                class="flex w-full items-center uppercase justify-between px-4"
              >
                <img :src="technology_icon" alt="technology_icon" />
                <p class="font-black">Technology</p>
              </div>
            </div>
            <div
              class="bg-[#c3b9f4] w-full py-2 text-center px-4 rounded-2xl space-y-4"
            >
              <p class="font-semibold text-lg uppercase">
                mostly used categories
              </p>
              <div
                class="flex w-full items-center uppercase justify-between px-4"
              >
                <img :src="Catering_Services" alt="technology_icon" />
                <p class="font-black">Catering Services</p>
              </div>
            </div>
          </div>
        </div>

        <AdminDonutChart />
      </div>
    </div>
  </AdminLayout>
</template>
