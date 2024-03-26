<script setup lang="ts">
import {nextTick, ref} from 'vue'
import { doLogin  } from "../api/methods/user";
import {store} from "../store/store";
import router from "../router";

const form = ref(false)
const account = ref()
const password = ref()
const loading = ref(false)

const onSubmit = () => {
  if (!form.value) return
  loading.value = true

  doLogin(account.value, password.value).then(res =>{
    localStorage.setItem('token', res.token)
    store.actions.setToken(store)
    loading.value = false

    nextTick(() => {
      router.replace('/')
    })

  })

}

function required (v) {
  return !!v || '不能为空'
}

</script>

<template>
  <v-container class="fill-height align-center justify-center ">

      <v-col cols="12" md="6">
        <v-card class="px-6 py-8" rounded="xl">
          <v-card-title class="text-center mb-5">
            <h2>登录</h2>
          </v-card-title>
          <v-form
            v-model="form"
            @submit.prevent="onSubmit"
          >
            <v-text-field
              v-model="account"
              :readonly="loading"
              :rules="[required]"
              class="mb-2"
              label="Account"
              clearable
              rounded="xl"
              variant="outlined"
            ></v-text-field>

            <v-text-field
              v-model="password"
              :readonly="loading"
              :rules="[required]"
              label="Password"
              placeholder="Enter your password"
              clearable
              rounded="xl"
              variant="outlined"
            ></v-text-field>

            <br>

            <v-btn
              :disabled="!form"
              :loading="loading"
              color="success"
              size="large"
              type="submit"
              variant="elevated"
              block
              height="56"
            >
              Sign In
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
  </v-container>
</template>

<style scoped>

</style>
