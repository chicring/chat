<script setup lang="ts">

import {onMounted, ref} from 'vue'
import {testDelay} from "../../api/methods/chat";
import {getAllAvailableModels} from "../../api/methods/overview";

const models = ref([])



onMounted(async () => {
  models.value = await getAllAvailableModels()

})
</script>

<template>
  <v-card color="primary" min-height="268" rounded="xl">
    <template #title>
      <div class="d-flex justify-space-between">
        <h5>可用模型</h5>
<!--        <v-btn icon="mdi-refresh"  flat size="small" @click="getTestTimes()"></v-btn>-->
      </div>
    </template>
    <v-divider></v-divider>
    <v-card-text>
      <v-chip-group column>
        <v-chip  size="small" rounded v-for="model in models" :key="model" >
          {{ model}}
        </v-chip>
      </v-chip-group>
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>
