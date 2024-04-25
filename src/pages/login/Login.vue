<script setup lang="ts">

import {ref} from "vue";
import {doLogin, getUserInfo} from "../../api/methods/user";
import {store} from "../../store/store";
import {success} from "../../components/ToastMessage/Message";
import router from "../../router";

const login =ref({
  form: false,
  account: null,
  password: null,
  loading: false,
  showPwd: false
})

const onSubmit = () => {
  if (!login.value.form) return
  login.value.loading = true

  doLogin(login.value.account, login.value.password)
    .then(res => {
      localStorage.setItem('token', res.token);
      store.actions.setToken(store);
      login.value.loading = false;
      success('登录成功');
      return getUserInfo();  //将userInfo的请求返回，这样错误就会传递到下面的catch中
    })
    .then(res => {
      localStorage.setItem('user', JSON.stringify(res));
      store.actions.setUserInfo(store);
      router.replace('/');
    })
    .catch(error => {
      login.value.loading = false;
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
      <v-card class="px-6 py-8" rounded="xl">

      <v-card-title class="text-center mb-5">
        <v-img src="/src/assets/logo.svg" alt="Logo"
               max-height="50"
        ></v-img>
        <v-divider class="my-3"></v-divider>
        <h4 class="text-primary">登录</h4>
      </v-card-title>
      <v-form
        v-model="login.form"
        @submit.prevent="onSubmit"
      >
        <v-text-field
          v-model="login.account"
          :readonly="login.loading"
          :rules="[required]"
          class="mb-2"
          label="Account"
          clearable
          rounded="xl"
          variant="outlined"
        ></v-text-field>

        <v-text-field
          v-model="login.password"
          :readonly="login.loading"
          :rules="[required]"
          label="Password"
          clearable
          placeholder="Enter your password"
          rounded="xl"
          variant="outlined"
          :append-inner-icon="login.showPwd ? 'mdi-eye' : 'mdi-eye-off'"
          :type="login.showPwd ? 'text' : 'password'"
          @click:append-inner="login.showPwd = !login.showPwd"
        ></v-text-field>
        <v-card-subtitle>
          <a href="/reset" class="text-decoration-none">忘记密码?</a>
        </v-card-subtitle>

        <br>

        <v-btn
          :disabled="!login.form"
          :loading="login.loading"
          color="primary"
          size="large"
          type="submit"
          variant="elevated"
          block
          flat
          height="56"
        >
          登录
        </v-btn>
      </v-form>

      <v-btn
        size="large"
        type="submit"
        variant="text"
        block
        height="56"
        class="mt-2"
        to="/logon"
      >
        注册
      </v-btn>

    </v-card>
    </v-col>
  </v-container>
</template>

<style scoped>

</style>
