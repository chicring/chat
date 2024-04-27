<script setup lang="ts">

import {onMounted, ref} from 'vue'

import {getUsageToken} from "../../api/methods/overview";

const Usage = ref([])
const UsageYesterday = ref([])

let start = Math.floor(new Date().setHours(0, 0, 0, 0) / 1000)
let end = Math.floor(Date.now() / 1000)

let change = ref({
  value: '',
  color: '#2fc584'
})

onMounted(async () => {
  Usage.value = await getUsageToken(start, end)
  UsageYesterday.value = await getUsageToken(start - 86400, start)

  if (UsageYesterday.value?.total_tokens !== 0) {
    let percentageChange = ((Usage.value?.total_tokens - UsageYesterday.value?.total_tokens) / UsageYesterday.value.total_tokens) * 100
    change.value.value = percentageChange.toFixed(2) + '%'
    change.value.color = percentageChange < 0 ? '#2fc584' : '#da5656'
  } else {
    change.value.value = '0%'
  }
})
</script>

<template>
  <v-card color="primary" min-height="268" rounded="xl">

    <v-card-text>

      <h3>今日Token</h3>

      <div class="mt-3 d-flex">

        <div class="me-2 text-h6">{{Usage?.total_tokens}}</div>

        <v-chip
          :color="change.color"
          :prepend-icon="`mdi-arrow-${change.value.startsWith('-') ? 'down' : 'up'}`"
          size="small"
          label
        >
          <template v-slot:prepend>
            <v-icon size="10"></v-icon>
          </template>

          <span class="text-caption">{{ change.value }}</span>
        </v-chip>

      </div>

      <v-divider class="my-5"></v-divider>

      <h3>昨日Token</h3>
      <div class="mt-3">
        <strong class="text-h6">{{UsageYesterday?.total_tokens}}</strong>
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>
