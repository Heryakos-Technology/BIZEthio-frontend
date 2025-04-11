<script setup>
import { ref, onMounted } from "vue";
import { useCategoryStore } from "@/stores/category";

const { getLeastPopularCategories, getMostPopularCategories } =
  useCategoryStore();

const popular_categories = ref([]);
const least_categories = ref([]);

onMounted(async () => {
  try {
    popular_categories.value = await getMostPopularCategories();
    least_categories.value = await getLeastPopularCategories();

    console.log("least_categories", least_categories.value);
    console.log("popular_categories", popular_categories.value);
    updateChartData();
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
});

const series = ref([0, 0, 0]); // Initialize with 0 values
const chartOptions = ref({
  chart: {
    type: "donut",
    height: 250,
  },
  labels: [
    popular_categories.value.length > 0
      ? popular_categories.value[0].name
      : "Most Popular",
    least_categories.value.length > 0
      ? least_categories.value[0].name
      : "Least Popular",
    popular_categories.value.length > 0
      ? popular_categories.value[popular_categories.value.length - 1].name
      : "Last Popular",
  ],
  colors: ["#22C55E", "#EF4444", "#3b82f6"], // Green, Red, Blue
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

const updateChartData = () => {
  if (popular_categories.value && least_categories.value) {
    const totalCategories =
      popular_categories.value.length + least_categories.value.length;

    const popularPercentage =
      popular_categories.value.length > 0 ? (1 / totalCategories) * 100 : 0;
    const leastPercentage =
      least_categories.value.length > 0 ? (1 / totalCategories) * 100 : 0;
    const lastPopularPercentage =
      popular_categories.value.length > 0 ? (1 / totalCategories) * 100 : 0;

    series.value = [popularPercentage, leastPercentage, lastPopularPercentage];
  }
};
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
