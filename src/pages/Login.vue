<script setup lang="ts">
import { ref } from 'vue'

const form = ref(false)
const account = ref(null)
const password = ref(null)
const loading = ref(false)

function onSubmit () {
  if (!form.value) return
  loading.value = true
  setTimeout(() => (loading.value = false), 2000)
}
function required (v) {
  return !!v || '不能为空'
}

</script>

<template>
  <div style="height: calc(100vh - 64px);">
    <v-row  align="center" justify="center" class="fill-height">
      <v-col cols="12" sm="3">
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
    </v-row>
  </div>
</template>

<style scoped>

</style>
