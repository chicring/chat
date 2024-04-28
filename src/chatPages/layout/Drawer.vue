<script setup lang="ts">
import {getEmailAvatar} from "../../util/EmailAvatar";

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
      <v-row class="mb-3" no-gutters>
        <v-col cols="9">
          <v-card height="70">
            <template #image>
              <v-avatar :image="getEmailAvatar('3081044735@qq.com')"></v-avatar>
            </template>
            <v-card-text >

            </v-card-text>
          </v-card>
        </v-col>
          <v-spacer></v-spacer>
        <v-col cols="2" align-self="end">
          <v-btn size="small" variant="plain" to="/chat/setting">
            <v-icon>mdi-cog</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </template>
  </v-navigation-drawer>
</template>

<style scoped>

</style>
