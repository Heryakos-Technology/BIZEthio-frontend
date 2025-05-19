<template>
  <div>
    <canvas ref="pieChartCanvas"></canvas>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { Chart, registerables } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(...registerables);
Chart.register(ChartDataLabels); // Register the data labels plugin

export default {
  props: {
    chartData: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const pieChartCanvas = ref(null);
    let pieChartInstance = null;

    const renderChart = () => {
      if (pieChartInstance) {
        pieChartInstance.destroy(); // Destroy previous instance if exists
      }
      
      pieChartInstance = new Chart(pieChartCanvas.value, {
        type: 'pie',
        data: props.chartData,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Company Status',
            },
            datalabels: {
              formatter: (value, context) => {
                const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                const percentage = ((value / total) * 100).toFixed(2) + '%';
                return `${value} (${percentage})`; // Display value and percentage
              },
              color: '#fff',
            },
          },
        },
      });
    };

    onMounted(() => {
      renderChart();
    });

    watch(() => props.chartData, () => {
      renderChart(); // Re-render the chart when chartData changes
    });

    return {
      pieChartCanvas,
    };
  },
};
</script>

<style>
canvas {
  max-width: 600px;
  margin: auto;
}
</style>