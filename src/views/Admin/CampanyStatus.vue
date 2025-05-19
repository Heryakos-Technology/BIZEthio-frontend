<template>
  <AdminLayout>
    <div class="pb-10 px-5">
      <h1 class="mb-3 text-gray-500">Company Statistics</h1>
      <div class="flex justify-center items-center mb-3" v-if="loadingCampanies">
        <div class="loader"></div>
      </div>
      <p v-if="errors" class="text-red-400 text-xl text-center font-semibold">
        {{ errors }}
      </p>
      <div v-if="chartData.labels.length > 0" class="bg-white p-4 shadow-md">
        <PieChart :chartData="chartData" />
      </div>
      <p v-else class="text-center">Loading chart...</p>
    </div>
  </AdminLayout>
</template>

<script>
import AdminLayout from "@/layout/AdminLayout.vue";
import { defineComponent, onMounted, ref } from "vue";
import PieChart from "@/components/PieChart.vue"; 
import axios from "axios";

export default defineComponent({
  components: {
    AdminLayout,
    PieChart,
  },
  setup() {
    const campanies = ref([]);
    const loadingCampanies = ref(true);
    const errors = ref("");
    const chartData = ref({
      labels: [],
      datasets: [],
    });

    const fetchCampanies = async () => {
      try {
        const response = await axios.get(
          `https://bizethio-backend-production-d484.up.railway.app/api/companies`
        );
        campanies.value = response.data;
        localStorage.setItem("campanies", JSON.stringify(campanies.value));
        console.log("campanies", campanies.value);
        loadingCampanies.value = false;
      } catch (error) {
        console.log("Errors", error);
        loadingCampanies.value = false;
        errors.value = error.message;
      }
      if (campanies.value.length === 0) {
        errors.value = "No Companies Found";
      }
    };

    const fetchCompanyStats = async () => {
      await fetchCampanies();
      const stats = {
        approved: 0,
        rejected: 0,
      };

      campanies.value.forEach(campany => {
        if (campany.status === "approved") {
          stats.approved++;
        } else if (campany.status === "rejected") {
          stats.rejected++;
        }
      });

      return stats;
    };

    const updateCompanyStats = async () => {
      const stats = await fetchCompanyStats();
      chartData.value = {
        labels: ["Approved", "Rejected"],
        datasets: [
          {
            label: "Company Status",
            backgroundColor: ["#007bff", "#ff4d4d"],
            data: [stats.approved, stats.rejected],
          },
        ],
      };
    };

    onMounted(() => {
      updateCompanyStats();
    });

    return {
      loadingCampanies,
      errors,
      chartData,
    };
  },
});
</script>

<style>
.loader {
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>