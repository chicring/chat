<script setup lang="ts">

import {ref} from "vue";
import {doRegister} from "../../api/methods/user";
import {success} from "../../components/ToastMessage/Message";

const register =ref({
  form: false,
  account: null,
  email: null,
  password: null,
  loading: false,
  showPwd: false
})

const RegisterSubmit = () =>{
  if (!register.value.form) return

  register.value.loading = true;

  doRegister(register.value.account, register.value.password, register.value.email)
    .then(res => {
      success('注册成功');
      register.value.loading = false;
    })
    .catch(error => {
      register.value.loading = false;
      console.log(error);
    })
}

function required (v) {
  return !!v || '不能为空'
}
</script>

<template>
  <v-container class="fill-height align-center justify-center">
    <v-col cols="12" md="6">
      <v-card class="px-6 py-8" rounded="xl" >
        <v-card-title class="text-center mb-5">
          <v-img src="/src/assets/logo.svg" alt="Logo"
                 max-height="50"
          ></v-img>
          <v-divider class="my-3"></v-divider>
          <h4 class="text-primary">注册</h4>
        </v-card-title>
        <v-form
          v-model="register.form"
          @submit.prevent="RegisterSubmit"
        >
          <v-text-field
            v-model="register.account"
            :readonly="register.loading"
            :rules="[required]"
            class="mb-2"
            label="Account"
            clearable
            rounded="xl"
            variant="outlined"
          ></v-text-field>

          <v-text-field
            v-model="register.email"
            :readonly="register.loading"
            :rules="[required]"
            class="mb-2"
            label="Email"
            clearable
            rounded="xl"
            variant="outlined"
          ></v-text-field>

          <v-text-field
            v-model="register.password"
            :readonly="register.loading"
            :rules="[required]"
            label="Password"
            clearable
            placeholder="Enter your password"
            rounded="xl"
            variant="outlined"
            :append-inner-icon="register.showPwd ? 'mdi-eye' : 'mdi-eye-off'"
            :type="register.showPwd ? 'text' : 'password'"
            @click:append-inner="register.showPwd = !register.showPwd"
          ></v-text-field>

          <br>

          <v-btn
            :disabled="!register.form"
            :loading="register.loading"
            color="primary"
            size="large"
            type="submit"
            variant="elevated"
            block
            flat
            height="56"
          >
            注册
          </v-btn>
        </v-form>

        <v-btn
          size="large"
          type="submit"
          variant="text"
          block
          height="56"
          class="mt-2"
          to="/login"
        >
          登录
        </v-btn>
      </v-card>
    </v-col>
  </v-container>
</template>

<style scoped>

</style>
