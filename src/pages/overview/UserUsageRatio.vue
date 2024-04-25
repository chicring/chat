<script setup lang="ts">
import {onMounted, ref} from "vue";
import * as echarts from 'echarts';
import {getUserUsageRatio} from "../../api/methods/overview";

const data = ref();
const timestamp = ref();

onMounted(async () => {
    timestamp.value = Math.floor(Date.now() / 1000);
    data.value = await getUserUsageRatio(timestamp.value)

    const chart = echarts.init(document.getElementById('userUsagePie'));
    const option = {
      title: {
        text: data.value.date,
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
          name: '用户',
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['50%', '50%'],
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
          data: Object.entries(data.value.ratio).map(([name, value]) => ({name, value}))
        }
      ]
    };
  chart.setOption(option);
});

</script>

<template>
  <v-card rounded="xl" color="surface-variant">
    <v-card-title>
      <h5>用户使用占比</h5>
    </v-card-title>
    <v-card-text>
      <div id="userUsagePie" style="width: 100%;height:400px;"></div>
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>
