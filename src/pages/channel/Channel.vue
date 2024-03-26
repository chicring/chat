<script setup lang="ts">

import AddchannelDialog from "./AddchannelDialog.vue";

</script>

<template>
  <v-container>

    <v-card flat rounded="xl">
      <v-card-title>
        <h3>渠道</h3>
      </v-card-title>

      <v-card-subtitle>
        优先级：
        1. 优先级越大，越优先使用
        2. 相同优先级下：创建时间越早，越优先使用

        代理：
        1. 必须在启动应用的时候设置代理才能启用
      </v-card-subtitle>

      <v-card-actions class="justify-end">
        <AddchannelDialog></AddchannelDialog>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<style scoped>

</style>
