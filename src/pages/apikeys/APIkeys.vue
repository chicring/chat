<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import AddKeyDialog from "./AddKeyDialog.vue";
import {getApiKey} from "../../api/methods/apikey";
import {formatDate} from "../../util/formatDate";

const userKeys = ref([])
const switchStates = reactive([]);



const headers = [
  { title: 'Id', value: 'id' , align: "center"},
  { title: '名称', value: 'name' , align: "center"},
  { title: 'API Key', value: 'apiKey' , align: "center"},
  { title: '状态', value: 'enabled' , align: "start"},
  { title: '创建时间', value: 'createdAt' , align: "center"},
  { title: '过期时间', value: 'expiresAt' , align: "center"},
]

const copyToClipboard = (value) => {
  console.log(value)
}

onMounted(async () => {
  userKeys.value = await getApiKey();
});

</script>

<template>
  <v-container>
    <v-card rounded="xl" flat>
      <v-card-title>Apikeys</v-card-title>
      <v-card-subtitle>使用API keys进行服务鉴权和使用记录</v-card-subtitle>
      <v-card-actions class="justify-end">
        <AddKeyDialog></AddKeyDialog>
      </v-card-actions>
    </v-card>

    <v-data-table :items="userKeys"
                  class="mt-4 rounded-xl"
                  :headers="headers"
                  item-key="id"
    >
      <template v-slot:item.apiKey="{ item }">
        <span>********</span>
        <v-btn icon="mdi-clipboard-text-multiple-outline" variant="text" color="primary" @click="copyToClipboard(item.apiKey)" size="small">
        </v-btn>
      </template>

      <template v-slot:item.enabled="{ item }">
        <v-switch v-model="item.enabled" color="secondary" hide-details></v-switch>
      </template>

      <template v-slot:item.createdAt="{ item }">
        <span>{{ formatDate(item.createdAt) }}</span>
      </template>


      <template v-slot:item.expiresAt="{ item }">
        <span>{{ formatDate(item.expiresAt) }}</span>
      </template>
    </v-data-table>
  </v-container>
</template>

<style scoped>

</style>
