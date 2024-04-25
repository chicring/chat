<script setup lang="ts">

</script>

<template>
  <v-main scrollable>
    <v-sheet class="rounded-t-xl" color="background-1" :style="{minHeight: 'calc(100vh - 64px)'}">
      <router-view />
    </v-sheet>
  </v-main>
</template>

<style scoped>

</style>
