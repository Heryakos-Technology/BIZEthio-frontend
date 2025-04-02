<script setup>
import AdminLayout from "@/layout/AdminLayout.vue";
import technology_icon from "/images/AdminPage/technology_icon.png";
import Catering_Services from "/images/AdminPage/Catering_Services.png";
import AdminDonutChart from "@/components/Admin/AdminDonutChart.vue";
import AdminTable from "@/components/Admin/AdminTable.vue";
import { useAuthStore } from "@/stores/auth";

</script>

<template>
  <AdminLayout>
    <div class="pb-16 overflow-x-hidden xl:ml-16">
      <div class="grid xl:grid-cols-2 items-center">
        <div class="">
          <h1 class="text-3xl font-bold mb-8">Activities</h1>
          <div
            class="grid md:grid-cols-2 gap-4 text-white mt-4 w-full max-w-[290px] md:max-w-[550px] xs:mx-auto"
          >
            <div
              class="bg-[#705ad3] w-full py-2 text-center px-4 rounded-2xl space-y-4"
            >
              <p class="font-semibold md:text-sm lg:text-lg text-lg uppercase">
                least used categories
              </p>
              <div
                class="flex w-full items-center uppercase justify-between px-4"
              >
                <img :src="technology_icon" alt="technology_icon" />
                <p class="font-black md:text-sm lg:text-lg">Technology</p>
              </div>
            </div>
            <div
              class="bg-[#c3b9f4] w-full py-2 text-center px-4 rounded-2xl space-y-4"
            >
              <p class="font-semibold md:text-sm lg:text-lg text-lg uppercase">
                mostly used categories
              </p>
              <div
                class="flex w-full items-center uppercase justify-between px-4"
              >
                <img :src="Catering_Services" alt="technology_icon" />
                <p class="font-black md:text-sm lg:text-lg">
                  Catering Services
                </p>
              </div>
            </div>
          </div>
        </div>

        <AdminDonutChart />
        <AdminTable />
      </div>
    </div>
  </AdminLayout>
</template>
