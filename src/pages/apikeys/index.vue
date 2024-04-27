<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import AddKeyDialog from "./AddKeyDialog.vue";
import {deleteApiKey, getApiKey} from "../../api/methods/apikey";
import {formatDate} from "../../util/formatDate";
import {copyTextToClipboard} from "../../util/writeClipboard";
import {success} from "../../components/ToastMessage/Message";


const userKeys = ref([])

const headers = [
  { title: 'Id', value: 'id' , align: "center"},
  { title: '名称', value: 'name' , align: "center"},
  { title: 'API Key', value: 'apiKey' , align: "center"},
  { title: '状态', value: 'enabled' , align: "start"},
  { title: '创建时间', value: 'createdAt' , align: "center"},
  { title: '过期时间', value: 'expiresAt' , align: "center"},
  { title: '操作', key: 'actions', sortable: false },
]


function deleteItem(id : number) {
    deleteApiKey(id).then(() => {
      success('删除成功');
      userKeys.value = userKeys.value.filter((item) => item.id !== id);
    })
}

async function refreshKeys() {
  userKeys.value = await getApiKey();
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
        <AddKeyDialog @created="refreshKeys"></AddKeyDialog>
      </v-card-actions>
    </v-card>

    <v-data-table :items="userKeys"
                  class="mt-4 rounded-xl"
                  :headers="headers"
                  item-key="id"
    >
      <template #item.apiKey="{ item }">
        <span>********</span>
        <v-btn icon="mdi-clipboard-text-multiple-outline"
               variant="text" color="primary"
               @click="copyTextToClipboard(item.apiKey)"
               size="small"
        >
        </v-btn>
      </template>

      <template #item.enabled="{ item }">
        <v-switch v-model="item.enabled" color="secondary" hide-details></v-switch>
      </template>

      <template #item.createdAt="{ item }">
        <span>{{ formatDate(item.createdAt) }}</span>
      </template>


      <template #item.expiresAt="{ item }">
        <span>{{ formatDate(item.expiresAt) }}</span>
      </template>

      <template #item.actions="{ item }">
        <MenuDropdown @delete="deleteItem(item.id)"></MenuDropdown >
      </template>

      <template v-slot:no-data>
        <span>没有数据</span>
      </template>
    </v-data-table>
  </v-container>
</template>

<style scoped>

</style>
