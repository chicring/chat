<script setup lang="ts">
import {nextTick, ref} from 'vue'
import {doLogin, doRegister, getUserInfo} from "../api/methods/user";
import {store} from "../store/store";
import router from "../router";
import {success} from "../components/ToastMessage/Message";


const login =ref({
  form: false,
  account: null,
  password: null,
  loading: false,
  showPwd: false
})

const register =ref({
  form: false,
  account: null,
  email: null,
  password: null,
  loading: false,
  showPwd: false
})

const Reset =ref({
  form: false,
  email: null,
  code: null,
  password: null,
  loading: false,
  showPwd: false
})

const step = ref(0)

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

const RegisterSubmit = () =>{
  if (!register.value.form) return

  register.value.loading = true;

  doRegister(register.value.account, register.value.password, register.value.email)
    .then(res => {
      success('注册成功');
      register.value.loading = false;
      step.value = 0;
    })
    .catch(error => {
      register.value.loading = false;
      console.log(error);
    })
}

const ResetSubmit = () =>{
  if (!Reset.value.form) return

  Reset.value.loading = true;

  doRegister(Reset.value.email, Reset.value.password, Reset.value.code)
    .then(res => {
      success('重置成功');
      Reset.value.loading = false;
      step.value = 0;
    })
    .catch(error => {
      Reset.value.loading = false;
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

        <v-window v-model="step">
          <v-window-item :value="0">
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
                  <a>忘记密码?</a>
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
                @click="step = 1"
              >
                注册
              </v-btn>

            </v-card>
          </v-window-item>

          <v-window-item :value="1">
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
                @click="step = 0"
              >
                登录
              </v-btn>
            </v-card>
          </v-window-item>

          <v-window-item :value="2">
            <v-card class="px-6 py-8" rounded="xl" >
              <v-card-title class="text-center mb-5">
                <v-img src="/src/assets/logo.svg" alt="Logo"
                       max-height="50"
                ></v-img>
                <v-divider class="my-3"></v-divider>
                <h4 class="text-primary">重置密码</h4>
              </v-card-title>
              <v-form
                v-model="Reset.form"
                @submit.prevent="ResetSubmit"
              >
                <v-text-field
                  v-model="Reset.email"
                  :readonly="Reset.loading"
                  :rules="[required]"
                  class="mb-2"
                  label="Email"
                  clearable
                  rounded="xl"
                  variant="outlined"
                ></v-text-field>

                <v-text-field
                  v-model="Reset.code"
                  :readonly="Reset.loading"
                  :rules="[required]"
                  class="mb-2"
                  label="Code"
                  clearable
                  rounded="xl"
                  variant="outlined"
                ></v-text-field>

                <v-text-field
                  v-model="Reset.password"
                  :readonly="Reset.loading"
                  :rules="[required]"
                  label="Password"
                  clearable
                  placeholder="Enter your password"
                  rounded="xl"
                  variant="outlined"
                  :append-inner-icon="Reset.showPwd ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="Reset.showPwd ? 'text' : 'password'"
                  @click:append-inner="Reset.showPwd = !Reset.showPwd"
                ></v-text-field>

                <br>

                <v-btn
                  :disabled="!Reset.form"
                  :loading="Reset.loading"
                  color="primary"
                  size="large"
                  type="submit"
                  variant="elevated"
                  block
                  flat
                  height="56"
                >
                  重置
                </v-btn>
              </v-form>

              <v-btn
                size="large"
                type="submit"
                variant="text"
                block
                height="56"
                class="mt-2"
                @click="step = 0"
              >
                登录
              </v-btn>
            </v-card>
          </v-window-item>
        </v-window>

      </v-col>
  </v-container>
</template>

<style scoped>

</style>
