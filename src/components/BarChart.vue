<template>
    <div class="chart-container">
      <Bar v-if="chartData.labels.length" :data="chartData" :options="chartOptions" />
      <p v-else>Loading chart...</p>
    </div>
  </template>
  
  <script>
  import { defineComponent, ref, watch } from "vue";
  import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
  } from "chart.js";
  import { Bar } from "vue-chartjs";
  
  // Register Chart.js components
  ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
  
  export default defineComponent({
    components: {
      Bar,
    },
    setup() {
     
      const chartData = ref({
        labels: [],
        datasets: [],
      });
  
     
      const chartOptions = ref({
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      });
  
     
      setTimeout(() => {
        chartData.value.labels = ["M", "T", "W", "T", "F", "S", "S"];
        chartData.value.datasets = [
          {
            label: "Approved",
            backgroundColor: "#007bff",
            data: [80, 50, 15, 40, 25, 20, 30],
            
          },
          {
            label: "Ban",
            backgroundColor: "#ff4d4d",
            data: [45, 48, 10, 45, 18, 60, 15],
          },
        ];
      }, 1000);
  
      // Watch for changes in chartData
      watch(chartData, (newVal) => {
        console.log("Updated chartData:", newVal);
      });
  
      return {
        chartData,
        chartOptions,
      };
    },
  });
  </script>
  
  <style scoped>
  .chart-container {
    position: relative;
    height: 50vh; 
 
  }
  </style>

  