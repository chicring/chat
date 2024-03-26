<script setup lang="ts">


import {ref} from "vue";
import {store} from "../../store/store";

const items = ref([
  { title: "概况", icon: "mdi-view-dashboard", to: "/" },
  { title: "API keys", icon: "mdi-key", to: "apikey" },
  { title: "渠道", icon: "mdi-source-branch", to: "channel" },
  { title: "日志", icon: "mdi-file-document-outline", to: "logs" },
  { title: "设置", icon: "mdi-cog", to: "setting" },
]);

const rail = ref(true)

</script>

<template>
  <v-navigation-drawer v-model="store.state.isDrawerOpen"
                       floating
                       v-if="$route.path !== '/login'"
                        :rail="rail"
                       @click="rail= false"
  >

    <v-list-item
      prepend-avatar="http://hk.hjong.cn:8089/i/2024/03/24/65ffe9b1b90db.png"
      title="超级驼鹿"
      nav
    >
      <template v-slot:append>
        <v-btn
          icon="mdi-chevron-left"
          variant="text"
          @click.stop="rail = !rail"
        ></v-btn>
      </template>
    </v-list-item>

    <v-divider></v-divider>

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
