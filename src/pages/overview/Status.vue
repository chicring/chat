<script setup lang="ts">

import { ref, onMounted } from 'vue';
import {getCountOfUsersByRole} from "../../api/methods/overview";

const data = ref();

onMounted(async () => {
    data.value = await getCountOfUsersByRole()
});

</script>

<template>
    <v-card color="primary" min-height="268" rounded="xl">
      <v-card-title>
        <h6>用户总数</h6>
        <h3>{{ data?.USER + data?.ADMIN }}</h3>
      </v-card-title>

      <v-card-subtitle>管理：{{data?.ADMIN}}</v-card-subtitle>
      <v-card-subtitle>用户：{{data?.USER}}</v-card-subtitle>

      <v-divider class="my-3"></v-divider>

      <v-card-title>
        <h6>渠道数量</h6>
        <h3>{{ data?.USER + data?.ADMIN }}</h3>
      </v-card-title>

<!--      <v-card-subtitle>管理：{{data?.ADMIN}}</v-card-subtitle>-->

    </v-card>



</template>

<style scoped>

</style>
