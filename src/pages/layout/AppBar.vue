<script setup lang="ts">
import { useTheme } from 'vuetify'
import {onMounted, ref} from "vue";
import {store} from "../../store/store";

const theme = useTheme()
const darkMode = ref(false)

function toggleTheme () {
  theme.global.name.value = theme.global.current.value.dark ? 'myCustomLightTheme' : 'myCustomDarkTheme'
  darkMode.value = !darkMode.value
}

onMounted(() => {
  store.actions.setToken(store)
})
</script>

<template>
  <v-app-bar flat>
    <v-app-bar-nav-icon @click.stop="store.state.isDrawerOpen = !store.state.isDrawerOpen" color="tertiary">

    </v-app-bar-nav-icon>

    <v-app-bar-title>On Chat</v-app-bar-title>

    <v-switch
        v-model="darkMode"
        false-icon="mdi-weather-sunny"
        true-icon="mdi-weather-night"
        @click="toggleTheme"
        hide-details
        inset
      >
    </v-switch>

    <v-btn
      class="ml-2"
      min-width="0"
      icon="mdi-account"
      to="/login"
    >
    </v-btn>

  </v-app-bar>
</template>

<style scoped>

</style>
