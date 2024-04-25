<script setup lang="ts">

import {VSparkline} from "vuetify/labs/VSparkline";
import {computed, onMounted, ref} from "vue";

import {getRequestCount} from "../../api/methods/overview";


const logCountDetail = ref({})

const counts = computed(() => logCountDetail.value?.list?.map(item => item.count) || []);
const labels = computed(() => logCountDetail.value?.list?.map(item => item.date) || []);
const lastCount = computed(() => counts.value[counts.value.length - 1]);


onMounted(async () => {
  logCountDetail.value = await getRequestCount()

})

</script>

<template>
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
</template>

<style scoped>

</style>
