<script setup lang="ts">
import {ref} from "vue";
import {useDebounce, useThrottle} from "../../util/debounceAndThrottle.";
import {resetPwdByEmail, sendCode} from "../../api/methods/user";
import {error, success, info} from "../../components/ToastMessage/Message";

const Reset = ref({
  form: false,
  email: null,
  code: null,
  password: null,
  loading: false,
  showPwd: false
})

const loading = ref(false)
const countdown = ref(null)
let timer = null

const askCode = useDebounce((email: string) => {
  if (!email) {
    info('请输入邮箱')
    return
  }
  loading.value = true
  sendCode(email).then(() => {
    success('发送成功')
    countdown.value = 60
    timer = setInterval(() => {
      countdown.value--
      if (countdown.value === 0) {
        clearInterval(timer)
        countdown.value = null
        loading.value = false
      }
    }, 1000)
  })
}, 300)

const onSubmit = async () => {
  if (!Reset.value.form) return
  Reset.value.loading = true;
  await resetPwdByEmail(Reset.value.email, Reset.value.code, Reset.value.password)
    .then(() => {
      success('重置成功')
      Reset.value.loading = false;
    }).catch(() => {
      error('重置失败')
      Reset.value.loading = false;
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
          <h4 class="text-primary">重置密码</h4>
        </v-card-title>
        <v-form
          v-model="Reset.form"
          @submit.prevent="onSubmit"
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
          >
                <template v-slot:append-inner>
                  <v-btn flat size="large" rounded="xl" @click="askCode(Reset.email)" :disabled="loading">
                    {{ countdown !== null ? `${countdown}秒后重新发送` : '发送验证码' }}
                  </v-btn>
                </template>
          </v-text-field>


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
