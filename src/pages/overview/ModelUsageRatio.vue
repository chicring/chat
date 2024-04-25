<template>
  <v-card rounded="xl" color="surface-variant" min-height="400" flat>

    <template #title>

      <v-row justify="space-between" no-gutters>
        <v-col>
          <h5>
            模型占比
          </h5>
        </v-col>
      </v-row>
    </template>

    <v-card-text>
      <div id="PieChart" style="width: 100%;height:400px;"></div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import {getTotalModelUsageRatio} from "../../api/methods/overview";

const data = ref()

const date = ref()


onMounted(async () => {
  const timestampInSeconds = Math.floor(Date.now() / 1000);
  data.value = await getTotalModelUsageRatio(timestampInSeconds)
  date.value = data.value.date

  const chart = echarts.init(document.getElementById('PieChart'));
  const option = {
    title: {
      text: date.value,
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      left: 'center',
      bottom: 0
    },
    grid: {
      left: '2%',
      right: '2%',
      top: '3%',
      containLabel: true
    },
    series: [
      {
        name: '模型',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '38%'],
        avoidLabelOverlap: false,
        padAngle: 5,
        itemStyle: {
          borderRadius: 10
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: Object.entries(data.value.ratio).map(([name, value]) => ({ value, name })),
      }
    ]
  };

  chart.setOption(option);
})
</script>
