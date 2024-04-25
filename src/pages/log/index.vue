<script setup lang="ts">

import {ref} from "vue";
import {getLogs} from "../../api/methods/logs";
import {createQuery} from "./LogQuery";
import {formatDate} from "../../util/formatDate";

const logs = ref([])
const myPage = ref(0)
const size = ref(10)
const loading = ref(false)
const totalItems = ref(10)

const query = ref({
  "channelId": null,
  "channelType": null,
  "channelName": null,
  "model": null,
  "userId": null,
  "startTime": 0,
  "endTime": 4070880000
})

const headers = [
  // { title: 'Id', value: 'id' },
  { title: '时间', value: 'createdAt' , align: "center"},
  { title: '渠道ID', value: 'channelId' ,sortable: false, align: "center"},
  { title: '渠道类型', value: 'channelType' ,sortable: false, align: "center"},
  { title: '渠道名称', value: 'channelName' ,sortable: false, align: "center"},
  { title: '用户ID', value: 'userId' ,sortable: false, align: "center"},
  // { title: '用户名', value: 'username' ,sortable: false},
  { title: 'Model', value: 'model' ,sortable: false, align: "center"},
  { title: '总token', value: 'totalToken' ,sortable: false, align: "center"},
  { title: '提示token', value: 'promptTokens' ,sortable: false, align: "center"},
  { title: '完成token', value: 'completionTokens' ,sortable: false, align: "center"},
  { title: '输入', value: 'inputText' ,sortable: false, align: "center"},
  { title: '输出', value: 'outputText' ,sortable: false},
  { title: 'IP', value: 'ip' , align: "center"},
  { title: '用时', value: 'consumeTime' , align: "center"},
]

// let logQuery = createQuery({page: myPage.value, size: size.value})

async function loadItems({ page, itemsPerPage }) {
  loading.value = true
  let logQuery = createQuery({page: page, size: itemsPerPage,  ...query.value})
  logs.value = await getLogs(logQuery)

  if(myPage.value < page){
    myPage.value = page
    totalItems.value = totalItems.value + logs.value.length
  }
  loading.value = false
}

function search() {
  logs.value = []   //设定你的数据源到初始状态
  myPage.value = 0   //将当前页码重置为初始值
  size.value = 10   //将每页显示的数据条数重置为初始值
  totalItems.value = 10  //重置数据总数为初始值
  loadItems({ page: 1, itemsPerPage: 10})
}
function resetTable() {
  logs.value = []   //设定你的数据源到初始状态
  myPage.value = 0   //将当前页码重置为初始值
  size.value = 10   //将每页显示的数据条数重置为初始值
  totalItems.value = 10  //重置数据总数为初始值
  resetQuery()
  loadItems({ page: 1, itemsPerPage: 10})
}
function resetQuery() {
  query.value = {
    "channelId": null,
    "channelType": null,
    "channelName": null,
    "model": null,
    "userId": null,
    "startTime": 189277261,
    "endTime": 4070880000
  }
}

function getColor (consumeTime) {
  if (consumeTime > 30) return 'red'
  else if (consumeTime > 20) return 'orange'
  else return 'green'
}
</script>

<template>
  <v-container>
    <v-card flat rounded="xl">
      <v-card-title>
        <h3>日志</h3>
      </v-card-title>

      <v-card-text>
        <v-row dense>

          <v-col cols="12" md="3">
            <v-text-field v-model="query.channelId" color="outline" bg-color="surface-variant" rounded="xl" variant="outlined" label="渠道id" ></v-text-field>
          </v-col>

          <v-col cols="12" md="3">
            <v-text-field v-model="query.channelName" color="outline" bg-color="surface-variant" rounded="xl" variant="outlined" label="渠道名称" ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field v-model="query.channelType" color="outline" bg-color="surface-variant" rounded="xl" variant="outlined" label="渠道类型" ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field v-model="query.model" color="outline" bg-color="surface-variant" rounded="xl" variant="outlined" label="模型" ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field v-model="query.userId" color="outline" bg-color="surface-variant" rounded="xl" variant="outlined" label="用户id" ></v-text-field>
          </v-col>

          <v-col cols="12" md="3">
            <TimePicker v-model="query.startTime" label="开始时间" />
          </v-col>

          <v-col cols="12" md="3">
            <TimePicker class="rounded-xl" v-model="query.endTime" label="结束时间" />
          </v-col>
        </v-row>
        <div class="justify-end d-flex">
          <v-btn flat color="secondary" dark @click="resetTable" class="mr-2">
            <v-icon left>mdi-refresh</v-icon>
            重置
          </v-btn>

          <v-btn flat color="primary" dark @click="search">
            <v-icon left>mdi-magnify</v-icon>
            搜索
          </v-btn>
        </div>

      </v-card-text>
    </v-card>

    <v-data-table-server
                  color="primary"
                  hover
                  v-model:items-per-page="size"
                  :headers="headers"
                  :items="logs"
                  :loading="loading"
                  :items-per-page-options= "[5, 10, 15, 20]"
                  :items-length="totalItems"
                  class="mt-4 rounded-xl"
                  items-per-page-text="每页:"
                  @update:options="loadItems"
    >

      <template #item.consumeTime="{ value }">
        <v-chip :color="getColor(value)" rounded>
          {{ value }} s
        </v-chip>
      </template>

      <template #item.channelType="{ value }">
        <v-chip rounded size="small" color="primary" variant="outlined">
          {{ value }}
        </v-chip>
      </template>

      <template #item.model="{ value }">
        <v-chip rounded size="small" color="primary">
          {{ value }}
        </v-chip>
      </template>

      <template #item.createdAt="{ item }">
        <span>{{ formatDate(item.createdAt) }}</span>
      </template>

      <template #item.inputText="{ value }">

        <span
          class="d-inline-block text-truncate"
          style="max-width: 60px;"
        >
          {{value}}
          <v-tooltip
            activator="parent"
            location="top"
            close-delay="200"
            class="font-weight-bold"
          >
            {{value}}
          </v-tooltip>
        </span>


      </template>

      <template v-slot:item.outputText="{ value }">
        <span
          class="d-inline-block text-truncate"
          style="max-width: 60px;"
        >
          {{value}}
          <v-tooltip
            activator="parent"
            location="top"
            close-delay="200"
            class="font-weight-bold"
          >
            {{value}}
          </v-tooltip>
        </span>
      </template>
      <template v-slot:no-data>
        <span>没有数据</span>
      </template>
    </v-data-table-server>
  </v-container>
</template>

<style scoped>

</style>
