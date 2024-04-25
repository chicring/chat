<script setup lang="ts">


import {ref} from "vue";
import {store} from "../../store/store";
import {getEmailAvatar} from "../../util/EmailAvatar";

const items = ref([
  { title: "概况", icon: "mdi-view-dashboard", to: "/" },
  { title: "API keys", icon: "mdi-key", to: "/apikey" },
  { title: "渠道", icon: "mdi-source-branch", to: "/channel" },
  { title: "模型", icon: "mdi-tablet-cellphone", to: "/model" },
  { title: "知识库", icon: "mdi-book", to: "/knowledge" },
  { title: "用户管理", icon: "mdi-account ", to: "/user" },
  { title: "日志", icon: "mdi-file-document-outline", to: "/logs" },
  { title: "设置", icon: "mdi-cog", to: "/setting" },
]);

const rail = ref(true)

</script>

<template>
  <v-navigation-drawer v-model="store.state.isDrawerOpen"
                       floating
                        :rail="rail"
                       @click="rail= false"
                       app
  >

    <v-list-item
      class="text-center"
      :prepend-avatar="getEmailAvatar(store.state.user.info.email)"
      :title="store.state.user.info.username"
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

    <v-list nav>
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


    <template v-slot:append>
      <v-card
        color="primary-container"
        append-icon="mdi-open-in-new"
        class="ma-2"
        href="https://github.com/chicring/OpenAI-Proxy-OnChat"
        prepend-icon="mdi-github"
        rel="noopener"
        subtitle="github"
        target="_blank"
        title="OnChat on GitHub"
      ></v-card>
    </template>

  </v-navigation-drawer>
</template>

<style scoped>

</style>
