<template>
  <v-app>

    <AppBar></AppBar>

    <Drawer></Drawer>

    <View></View>

  </v-app>
</template>

<script lang="ts" setup>
import View from "./layout/View.vue";
import AppBar from "./layout/AppBar.vue";
import Drawer from "./layout/Drawer.vue";
</script>
