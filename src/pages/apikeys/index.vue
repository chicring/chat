<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import AddKeyDialog from "./AddKeyDialog.vue";
import {deleteApiKey, getApiKey} from "../../api/methods/apikey";
import {formatDate} from "../../util/formatDate";
import {copyTextToClipboard} from "../../util/writeClipboard";
import {error, info, success} from "../../components/ToastMessage/Message";


const userKeys = ref([])
const switchStates = reactive([]);

const headers = [
  { title: 'Id', value: 'id' , align: "center"},
  { title: '名称', value: 'name' , align: "center"},
  { title: 'API Key', value: 'apiKey' , align: "center"},
  { title: '状态', value: 'enabled' , align: "start"},
  { title: '创建时间', value: 'createdAt' , align: "center"},
  { title: '过期时间', value: 'expiresAt' , align: "center"},
  { title: '操作', key: 'actions', sortable: false },
]

const dialogVisible = ref(false);
const selectedItemId = ref(null);
function confirm(id) {
  dialogVisible.value = true
  selectedItemId.value = id
}
async function deleteItem(value) {
  dialogVisible.value = value;
  if (value) {
    deleteApiKey(selectedItemId.value).then(() => {
      success('删除成功');
      userKeys.value = userKeys.value.filter((item) => item.id !== selectedItemId.value);
    })
  } else {
    info('用户取消了操作');
  }
  dialogVisible.value = false;
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
    <confirm-dialog
      :modelValue="dialogVisible"
      :text="{ title: '删除提示', msg: '确定要删除这项内容吗？' }"
      @update:modelValue="deleteItem"
    ></confirm-dialog>

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
      <template v-slot:item.apiKey="{ item }">
        <span>********</span>
        <v-btn icon="mdi-clipboard-text-multiple-outline"
               variant="text" color="primary"
               @click="copyTextToClipboard(item.apiKey)"
               size="small"
        >
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

      <template v-slot:item.actions="{ item }">

        <v-btn icon="mdi-delete" variant="text" @click="confirm(item.id)">

        </v-btn>
      </template>

      <template v-slot:no-data>
        <span>没有数据</span>
      </template>
    </v-data-table>
  </v-container>
</template>

<style scoped>

</style>
