<script setup>
import { ref } from "vue";

// Chart data and options
const series = ref([48, 32, 20]); // Percentages: frequently used, occasionally used, rarely used

const chartOptions = ref({
  chart: {
    type: "donut",
    height: 250,
  },
  labels: ["frequently used", "occasionally used", "rarely used"],
  colors: ["#22C55E", "#FACC15", "#EF4444"], // Green, Yellow, Red (matching the image)
  legend: {
    position: "bottom",
    fontSize: "14px",
    fontFamily: "Inter, sans-serif",
    labels: {
      colors: "#4B5563", // Gray color for legend text
    },
  },
  dataLabels: {
    enabled: true,
    formatter: function (val) {
      return val + "%";
    },
    style: {
      fontSize: "14px",
      fontFamily: "Inter, sans-serif",
      fontWeight: "bold",
      colors: ["#FFFFFF"], // White text for the percentage labels
    },
  },
  plotOptions: {
    pie: {
      donut: {
        size: "65%", // Adjust the thickness of the donut
        labels: {
          show: false, // Hide the center label (if you want to show a total, you can enable this)
        },
      },
    },
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          height: 200,
        },
        legend: {
          position: "bottom",
        },
      },
    },
  ],
});
</script>

<template>
  <div class="p-6 w-[90%] max-w-[370px] xs:mx-auto lg:mt-16 lg:max-w-[450px]">
    <!-- Donut Chart -->
    <div class="bg-white rounded-lg shadow-md p-4">
      <apexchart
        type="donut"
        :options="chartOptions"
        :series="series"
        height="250"
      />
    </div>
  </div>
</template>

<style scoped>
/* Optional: Add custom styles if needed */
</style>
