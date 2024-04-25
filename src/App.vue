<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>

  import {onMounted} from "vue";
  import {store} from "./store/store";

  onMounted(() => {
    store.actions.setToken(store)
    store.actions.setUserInfo(store)
  })
</script>
