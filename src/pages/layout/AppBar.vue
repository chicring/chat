<script setup lang="ts">
import { useTheme } from 'vuetify'
import {nextTick, onMounted, ref} from "vue";
import {store} from "../../store/store";
import router from "../../router";

const theme = useTheme()
const darkMode = ref(false)

function toggleTheme () {
  theme.global.name.value = theme.global.current.value.dark ? 'myCustomLightTheme' : 'myCustomDarkTheme'
  darkMode.value = !darkMode.value
}

function logout() {
  store.actions.LogOut(store)
  nextTick(() => {
    router.replace('/login')
  })
}

</script>

<template>
  <v-app-bar flat app>
    <v-app-bar-nav-icon @click.stop="store.state.isDrawerOpen = !store.state.isDrawerOpen" color="tertiary">

    </v-app-bar-nav-icon>

    <v-app-bar-title>
      <v-img src="/src/assets/logo.svg" alt="Logo"
             max-width="95"
      ></v-img>
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

    <v-btn
      v-if="!store.state.user.token"
      class="ml-2"
      to="/login"
    >
      <v-icon>mdi-login</v-icon>
      <v-tooltip
        activator="parent"
        location="bottom"
      >登录</v-tooltip>
    </v-btn>

    <v-btn
      v-if="store.state.user.token"
      class="ml-2"
      @click="logout"
    >
      <v-icon>mdi-logout</v-icon>
      <v-tooltip
        activator="parent"
        location="bottom"
      >退出登录</v-tooltip>
    </v-btn>


  </v-app-bar>
</template>

<style scoped>

</style>
