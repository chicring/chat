<script setup lang="ts">

import {useTheme} from "vuetify";
import {ref} from "vue";

const theme = useTheme()
const darkMode = ref(false)

function toggleTheme () {
  theme.global.name.value = theme.global.current.value.dark ? 'myCustomLightTheme' : 'myCustomDarkTheme'
  darkMode.value = !darkMode.value
}

</script>

<template>
  <v-app-bar flat>
    <v-app-bar-title>
      <strong>随便聊聊</strong>
    </v-app-bar-title>

    <v-switch
      v-model="darkMode"
      false-icon="mdi-weather-sunny"
      true-icon="mdi-weather-night"
      @click="toggleTheme"
      hide-details
      inset
    >
    </v-switch>
  </v-app-bar>
</template>

<style scoped>

</style>
