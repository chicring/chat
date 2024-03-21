<script setup lang="ts">

import AddchannelDialog from "./AddchannelDialog.vue";
import Google from "../../assets/icon/Google.vue";
import MoonShot from "../../assets/icon/MoonShot.vue";
import OpenAI from "../../assets/icon/OpenAI.vue";
import Qwen from "../../assets/icon/Qwen.vue";
import ZhiPu from "../../assets/icon/ZhiPu.vue";
</script>

<template>
  <v-container>

    <div class="d-flex justify-space-between">
      <p>渠道</p>

      <AddchannelDialog></AddchannelDialog>
    </div>

    <Google></Google>
    <MoonShot></MoonShot>
    <OpenAI></OpenAI>
    <Qwen></Qwen>
    <ZhiPu></ZhiPu>
    <v-row align="center">
      <v-col cols="12" md="2">
        <v-select
          clearable
          chips
          label="渠道类型"
          :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
          hide-details
        ></v-select>
      </v-col>

      <v-col cols="12" md="2">
        <v-text-field
          label="渠道名称"
          hide-details
        >
        </v-text-field>
      </v-col>

      <v-col cols="12" md="2">
        <v-text-field
          label="站点"
          hide-details
        >
        </v-text-field>
      </v-col>

      <v-col>
        <v-btn>添加渠道</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>
