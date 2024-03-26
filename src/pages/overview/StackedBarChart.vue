<template>

  <v-card rounded="xl" color="surface-variant" min-height="400" flat>
    <v-card-title>
      <h2>请求详情</h2>
    </v-card-title>
    <v-card-text>
      <div>
        <canvas ref="canvasRef"></canvas>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Chart, registerables } from 'chart.js';
import {getOverview} from "../../api/methods/logs";

Chart.register(...registerables);

const canvasRef = ref(null);

const data = ref([]);

const colors = [
  '#F9E09F', '#FAF1F4', '#DDE6CD', '#D9E3F8', '#E9E5AC',
  '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50',
  '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800',
  '#FF5722', '#FF5722', '#9C27B0'
];
function getRandomMaterialColor() {
  let index = Math.floor(Math.random() * colors.length);
  return colors[index];
}

onMounted(async () => {
  const response = await getOverview()
  data.value = response.overview

  const models = [...new Set(data.value.flatMap(item => item.usages.map(u => u.model)))];
  const labels = data.value.map(d => d.date);
  const datasets = models.map(model => ({
    label: model,
    data: data.value.map(d => {
      const modelData = d.usages.find(u => u.model === model);
      return modelData ? modelData.count : 0;
    }),
    backgroundColor: getRandomMaterialColor(),
  }));

  new Chart(canvasRef.value, {
    type: 'bar',
    data: {
      labels,
      datasets,
    },
    options: {
      responsive: true,
      scales: {
        x: {
          beginAtZero: true,
          stacked: true,
        },
        y: {
          beginAtZero: true,
          stacked: true,
        }
      }
    }
  });
});
</script>
