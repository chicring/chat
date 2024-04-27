<script setup lang="ts">

import StackedBarChart from "./ModelUsageStats.vue";
import Status from "./Status.vue";
import RequestCount from "./RequestCount.vue";
import ModelUsageRatio from "./ModelUsageRatio.vue";
import ChannelStat from "./ChannelStat.vue";
import UserUsageRatio from "./UserUsageRatio.vue";


</script>

<template>
  <v-container>

    <v-row>
      <v-col cols="12" md="6">
        <RequestCount></RequestCount>
      </v-col>

      <v-col cols="12" md="3">
        <Status></Status>
      </v-col>

      <v-col cols="12" md="3">
        <ChannelStat></ChannelStat>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="8">
        <StackedBarChart></StackedBarChart>
      </v-col>

      <v-col cols="12" md="4">
        <ModelUsageRatio></ModelUsageRatio>
      </v-col>

      <v-col cols="12" md="5">
        <UserUsageRatio></UserUsageRatio>
      </v-col>
    </v-row>

  </v-container>

</template>

<style scoped>

</style>
