<template>
  <v-card rounded="xl" color="surface-variant" min-height="400" flat>
    <v-card-title>
      <h5>近7日请求详情</h5>
    </v-card-title>
    <v-card-text>
      <div id="myChart" style="min-height:400px;"></div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import {getModelUsageStats} from "../../api/methods/overview";

const data = ref()

onMounted(async () => {
  data.value = await getModelUsageStats()

  const models = new Set();
  data.value.list.forEach(item => {
    Object.keys(item.usages).forEach(model => {
      models.add(model);
    });
  });


  const chart = echarts.init(document.getElementById('myChart'));
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '2%',
      right: '2%',
      top: '3%',
      bottom:  '15%',
      containLabel: true
    },
    legend: {
      data:  Array.from(models),
      bottom: 0
    },
    xAxis: {
      data: data.value.list.map(item => item.date)
    },
    yAxis: {},
    series: Array.from(models).map(model => ({
      name: model,
      type: 'bar',
      stack: 'total',
      data: data.value.list.map(item => item.usages[model] || 0)
    }))
  };

  chart.setOption(option);
})
</script>
