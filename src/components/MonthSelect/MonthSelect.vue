<script setup lang="ts">

import {ref, watch} from "vue";
import Dayjs from "dayjs";

defineProps<{
  // 固定名称 modelValue
  modelValue: String,

}>()
const emit = defineEmits(['update:modelValue'])

const selectedMonth = ref("");
const months = Array.from({length: 12}, (v, i) => `${new Date().getFullYear()}-${(i + 1).toString().padStart(2, '0')}`)

watch(selectedMonth, () => {

  emit('update:modelValue', selectedMonth.value)
})
</script>

<template>
  <v-select
    v-model="selectedMonth"
    :items="months"
    density="compact" variant="outlined"
  >
  </v-select>
</template>

<style scoped>

</style>
