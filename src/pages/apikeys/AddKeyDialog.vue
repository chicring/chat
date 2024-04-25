<script setup lang="ts">

import {ref} from "vue";
import {createApiKey} from "../../api/methods/apikey";
import {success} from "../../components/ToastMessage/Message";

const name = ref('')
const date = ref(Date.now())
const emit = defineEmits(['created']);
function submit() {
  console.log(date.value)

  createApiKey(name.value, date.value).then(() => {
    success('创建成功')
    emit('created')
  }).catch(() => {
    console.log('创建失败')
  })
}
</script>

<template>

      <v-btn
        color="primary"
        rounded="pill"
        class="pe-2"
        prepend-icon="mdi-account-multiple-outline"
        variant="flat"
      >
        <div class="text-none font-weight-regular">
          创建key
        </div>

        <v-dialog activator="parent" max-width="600">
          <template v-slot:default="{ isActive }">
            <v-card rounded="lg">
              <v-card-title class="d-flex justify-space-between align-center">
                <div class="text-h5 text-medium-emphasis ps-2">
                  创建key
                </div>

                <v-btn
                  icon="mdi-close"
                  variant="text"
                  @click="isActive.value = false"
                ></v-btn>

              </v-card-title>

              <v-divider class="mb-4"></v-divider>

              <v-card-text>

                <v-text-field
                  label="渠道名称"
                  hide-details
                  variant="outlined"
                  color="primary"
                  rounded="lg"
                  class="mb-4"
                  v-model="name"
                >
                </v-text-field>

                <TimePicker v-model="date" label="有效期" />

              </v-card-text>

              <v-divider class="mt-2"></v-divider>

              <v-card-actions class="my-2 d-flex justify-end">
                <v-btn
                  class="text-none"
                  rounded="xl"
                  text="取消"
                  @click="isActive.value = false"
                ></v-btn>

                <v-btn
                  class="text-none"
                  color="primary"
                  rounded="xl"
                  text="提交"
                  variant="flat"
                  @click="submit(); isActive.value = false"
                ></v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-btn>
</template>

<style scoped>

</style>
