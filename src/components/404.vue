<script setup lang="ts">
import { VEmptyState } from 'vuetify/labs/VEmptyState'
import router from "../router";


function onClickAction() {
  router.push('/')
}
</script>

<template>
  <v-empty-state
    action-text="回到主页"
    image="https://cdn.vuetifyjs.com/docs/images/components/v-empty-state/connection.svg"
    title="页面不存在"
    @click:action="onClickAction"
  ></v-empty-state>
</template>

<style scoped>

</style>
