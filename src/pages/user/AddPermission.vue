<script setup lang="ts">


import {ref} from "vue";

const data = ref({
  userId: null,
  channelId: null,
})
</script>

<template>
  <v-btn
    color="primary"
    prepend-icon="mdi-account-multiple-outline"
    variant="flat"
  >
    <div class="text-none font-weight-regular">
      添加
    </div>
    <v-dialog activator="parent" max-width="600">
      <template #default="{ isActive }">
        <v-card>
          <v-card-title>添加</v-card-title>
          <v-divider></v-divider>

          <v-card-text>
            <v-text-field
              label="用户id"
              hide-details
              variant="outlined"
              color="primary"
              rounded="lg"
              class="mb-4"
              v-model="data.userId"
            >
            </v-text-field>
            <v-text-field
              label="渠道id"
              hide-details
              variant="outlined"
              color="primary"
              rounded="lg"
              class="mb-4"
              v-model="data.channelId"
            >
            </v-text-field>
          </v-card-text>

          <v-card-actions class="justify-end">
            <v-btn
              class="text-none"
              rounded="xl"
              text="取消"
              variant="flat"
              @click="isActive.value = false"
            >
            </v-btn>
            <v-btn
              class="text-none"
              rounded="xl"
              color="primary"
              text="确定"
              @click="isActive.value = false"
            >
            </v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </v-btn>
</template>

<style scoped>

</style>
