<script setup lang="ts">

import {computed, onMounted, ref} from "vue";
import { VSparkline } from 'vuetify/labs/VSparkline'
import {getLogCountDetail, getOverview} from "../../api/methods/logs";
import StackedBarChart from "./StackedBarChart.vue";


const logCountDetail = ref({})

const counts = computed(() => logCountDetail.value?.list?.map(item => item.count) || []);
const labels = computed(() => logCountDetail.value?.list?.map(item => item.date) || []);
const lastCount = computed(() => counts.value[counts.value.length - 1]);

const overview = ref({})

onMounted(async () => {
  logCountDetail.value = await getLogCountDetail()
  overview.value = await getOverview()
})

</script>

<template>
  <v-container>

    <v-row>
      <v-col cols="12" md="6">
        <v-card color="primary"  rounded="xl">

          <template v-slot:title>
            <div class="d-flex">
              <div class=" mr-4">
                今日请求量:
              </div>
              <h2>{{lastCount}}</h2>
            </div>
          </template>

          <v-card-text>
              <v-sheet
                color="rgba(0, 0, 0, .12)"
                rounded="xl"
              >
                <v-sparkline
                  :model-value="counts"
                  color="rgba(255, 255, 255, .7)"
                  height="100"
                  padding="24"
                  stroke-linecap="round"
                  show-labels
                  smooth
                >
                  <template v-slot:label="item">
                    {{ labels[item.index] }}: {{ counts[item.index] }}
                  </template>
                </v-sparkline>
              </v-sheet>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card color="primary" min-height="170" rounded="xl">
          <v-card-title>
            <h2>系统信息</h2>
          </v-card-title>
          <v-card-text>
            <div class="d-flex">
              <p>用户数量: 1</p>
              <p>渠道数量: 1</p>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

    </v-row>

    <v-row>
      <v-col cols="12" md="8">
        <StackedBarChart></StackedBarChart>
      </v-col>

      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>
            <h2>使用排行</h2>
          </v-card-title>
          <v-card-text>
            <p>Overview page</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>


  </v-container>

</template>

<style scoped>

</style>
