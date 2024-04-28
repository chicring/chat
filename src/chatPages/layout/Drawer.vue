<script setup lang="ts">

import {store} from "../../store/store";
</script>

<template>
  <v-navigation-drawer
    floating
  >

    <template #prepend>
      <v-img src="/src/assets/logo.svg" alt="Logo"
             max-width="95"
             class="mt-3 mb-5"
      ></v-img>
    </template>

    <v-btn
      block
      color="primary"
      prepend-icon="mdi-plus"
      variant="tonal"
      rounded="lg"
      size="large"
    >
      <strong>新对话</strong>
    </v-btn>

    <v-divider class="my-3"></v-divider>


    <v-list>
      <v-list-item
        color="primary"
        rounded="lg"
      >
        <v-list-item-title>随便聊聊</v-list-item-title>
        <v-list-item-subtitle
        >
          1条对话
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>




    <template v-slot:append>
      <div class="mb-3">

        <v-btn variant="text">
          <v-icon>mdi-cog</v-icon>
        </v-btn>
      </div>

    </template>
  </v-navigation-drawer>
</template>

<style scoped>

</style>
