<script setup lang="ts">

import {onMounted, ref} from "vue";
import {getKnowledgeBaseFile} from "../../api/methods/knowledgeBase";

const props = defineProps({
    id: {required: true, type: Number}
  }
)

const list = ref([])

const headers = [
  { title: 'Id', value: 'id' , align: "center"},
  { title: '名称', value: 'name' , align: "center"},
  { title: '状态', value: 'status' , align: "center"},
  { title: '创建时间', value: 'createTime' , align: "center"},
  { title: '更新时间', value: 'updateTime' , align: "center"},
  { title: '操作', key: 'actions', sortable: false },
]

function fileStatus(status: number) {
  switch (status) {
    case 0:
      return '向量处理中'
    case 1:
      return '已完成'
    case 2:
      return '失败'
    default:
      return '未知'
  }
}

function getColor (value: number) {
  switch (value) {
    case 0:
      return 'info'
    case 1:
      return 'success'
    case 2:
      return 'error'
    default:
      return 'warning'
  }
}

function deleteItem(id : number) {
  console.log(id)
}

onMounted(async () => {
  console.log(props.id)
  list.value = await getKnowledgeBaseFile(props.id)
  console.log(list.value)
})
</script>

<template>


  <v-container>

    <v-card rounded="xl" flat>

      <v-card-title>
        <h3>知识库文件</h3>
      </v-card-title>

      <v-card-subtitle>
        知识库文件是知识库的基本组成部分。
      </v-card-subtitle>

      <v-card-actions class="justify-end">
        <v-btn variant="flat">上传文档</v-btn>
      </v-card-actions>
    </v-card>

    <v-data-table :items="list"
                  class="mt-4 rounded-xl"
                  :headers="headers"
                  item-key="id"
    >
      <template #item.status="{ value }">
        <v-chip rounded="xl" :color="getColor(value)">
          {{ fileStatus(value) }}
        </v-chip>
      </template>

      <template #item.actions="{ item }">

        <MenuDropdown @delete="deleteItem(item.id)"></MenuDropdown >

      </template>

    </v-data-table>


  </v-container>

</template>

<style scoped>

</style>
