<script setup lang="ts">

import {ref} from "vue";
import {deleteChannelPermission, getChannelPermission} from "../../api/methods/permission";
import {success} from "../../components/ToastMessage/Message";
import AddPermission from "./AddPermission.vue";

const headers = [
  { title: '用户ID', value: 'userId' , align: "center"},
  { title: '用户名', value: 'username' ,sortable: false, align: "center"},
  { title: '渠道ID', value: 'channelId' ,sortable: false, align: "center"},
  { title: '渠道名称', value: 'channelName' ,sortable: false, align: "center"},
  { title: '渠道类型', value: 'channelType' ,sortable: false, align: "center"},
  { title: '操作', value: 'action' ,sortable: false, align: "center"},

]

const loading = ref(false)
const data = ref({
  total: 0,
  pageSize: 10,
  currentPage: 1,
  list: []
})

const search = ref({
  page: 1,
  size: 10,
  search: null,
})

async function getLogs() {
  data.value = await getChannelPermission( search.value )
}

async function loadItems({ page, itemsPerPage }) {
  search.value.page = page
  search.value.size = itemsPerPage
  await getLogs()
}

function deleteItem(id : number){
  deleteChannelPermission(id)
    .then(() => {
      success('删除成功')
      getLogs()
    })
  console.log(id)
}

</script>

<template>
<v-container>
  <v-card rounded="xl" flat>
    <v-card-title><h3>用户权限</h3></v-card-title>
    <v-card-subtitle>管理用户可使用的渠道</v-card-subtitle>
    <v-card-actions class="justify-end">
    </v-card-actions>
  </v-card>

  <v-row class="mt-4">
    <v-col cols="4">
      <v-text-field
        v-model="search.search"
        density="compact"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="solo"
        rounded="lg"
        flat
        hide-details
        single-line
      >
      </v-text-field>
    </v-col>

    <v-spacer></v-spacer>

    <v-col cols="1">
      <AddPermission></AddPermission>
    </v-col>
  </v-row>

  <v-data-table-server
    color="primary"
    hover
    v-model:items-per-page="data.pageSize"
    :headers="headers"
    :items="data.list"
    :loading="loading"
    :items-per-page-options= "[5, 10, 15, 20]"
    :items-length="data.total"
    :search="search.search"
    class="mt-4 rounded-xl"
    items-per-page-text="每页:"
    @update:options="loadItems"
  >
    <template #item.channelType="{ value }">
      <v-chip rounded size="small" color="primary" label class="font-weight-medium" >
        {{ value }}
      </v-chip>
    </template>

    <template #item.action="{ item }">
      <MenuDropdown @delete="deleteItem(item.id)"></MenuDropdown >
    </template>
  </v-data-table-server>
</v-container>
</template>

<style scoped>

</style>
