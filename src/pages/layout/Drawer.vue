<script setup lang="ts">


import {ref} from "vue";

const items = ref([
  {
    title: "概况",
    icon: "mdi-home",
    to: "/"
  },

  {title: "日志",icon: "mdi-home", to: "logs"},
  {title: "渠道",icon: "mdi-home", to: "channel"},
  {title: "设置",icon: "mdi-home", to: "setting"},
])
</script>

<template>
  <v-navigation-drawer v-if="$route.path !== '/login'">
    <v-list nav >
      <v-list-item
        rounded="lg"
        v-for="(item, index) in items"
        :key="index"
        color="primary"
        :prepend-icon="item.icon"
        :title="item.title"
        exact
        :to="item.to"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>

</style>
