<script setup lang="ts">

import Drawer from "../chatPages/layout/Drawer.vue";
import AppBar from "../chatPages/layout/AppBar.vue";
import View from "../chatPages/layout/View.vue";

import {useSettingStore} from "../pininStore/setting";
import {onBeforeMount} from "vue";

const settingStore = useSettingStore();

onBeforeMount(async () => {
  await settingStore.initSetting();
})
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
