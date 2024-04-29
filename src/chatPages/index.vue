<script setup lang="ts">

import Drawer from "../chatPages/layout/Drawer.vue";
import AppBar from "../chatPages/layout/AppBar.vue";
import View from "../chatPages/layout/View.vue";

import {useSettingStore} from "../store/setting";
import {onBeforeMount} from "vue";

// onBeforeMount(async () => {
//   await useSettingStore.actions.loadSetting(useSettingStore)
// })
</script>

<template>
  <v-app class="w-75 mx-auto">
    <Drawer></Drawer>

    <AppBar></AppBar>

    <View></View>

  </v-app>
</template>

<style scoped>

</style>
