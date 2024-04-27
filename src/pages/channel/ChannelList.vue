<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import {deleteChannel, findAllChannel} from "../../api/methods/channel";
import {Channel_name} from "./Channel";
import { VNumberInput } from 'vuetify/labs/VNumberInput'
import {Model} from "./Model";
import {success} from "../../components/ToastMessage/Message";

const items = ref([])
const showKey = ref(false)

onMounted(async () => {
  let rawItems = await findAllChannel();
  rawItems.forEach(item => {
    let modelsArray = Object.keys(item.models).map(key => {
      return { title: key, value: item.models[key] };
    });
    item.models = modelsArray;
  });
  items.value = rawItems;
  console.log(items.value);
})


function updateItem(channelId : number){
  console.log(channelId)
}

function deleteItem(channelId : number){
  deleteChannel(channelId).then(() => {
    items.value = items.value.filter((item) => item.id !== channelId);
    success('删除成功')
    console.log('删除成功')
  }).catch(() => {
    console.log('删除失败')
  })
}

const itemsByType = computed(() => {
  return items.value.reduce((types, item) => {
    if (!types[item.type]) types[item.type] = [];
    types[item.type].push(item);
    return types;
  }, {});
});

const getIconAndNameByType = (type) => {
  const channel = Channel_name.find(channel => channel.type === type);
  return channel ? [channel.iconComponents, channel.name] : [null, ''];
};
</script>

<template>
  <v-sheet class="rounded-xl pa-1">
    <v-expansion-panels multiple flat variant="popout">
      <v-expansion-panel v-for="(typeData, type) in itemsByType" :key="type" color="mb-2">

        <v-expansion-panel-title>
          <div class="align-center d-flex">
            <component :is="getIconAndNameByType(type)[0]" />
            <strong class="ml-1">
              {{ getIconAndNameByType(type)[1] }}
            </strong>
          </div>
        </v-expansion-panel-title>

        <v-expansion-panel-text>
          <v-card v-for="item in typeData" :key="item.id" class="mb-4">
            <v-toolbar>
              <v-toolbar-title>
                {{ item.name }}
              </v-toolbar-title>
            </v-toolbar>

            <v-divider></v-divider>
            <v-card-text>
              <v-row justify="space-between" no-gutters >
                <v-col cols="12" md="6">
                  <strong>API Key</strong>
                  <p class="text-disabled">
                    使用自己的Api Key
                  </p>
                </v-col>
                <v-col cols="12" md="5">
                  <v-text-field
                    variant="outlined"
                    density="compact"
                    v-model="item.apiKey"
                    :append-inner-icon="showKey ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showKey ? 'text' : 'password'"
                    @click:append-inner="showKey = !showKey"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <strong>Base URL:</strong>
                  <p class="text-disabled">
                    必须包含 http(s)://
                  </p>
                </v-col>
                <v-col cols="12" md="5">
                  <v-text-field
                    variant="outlined"
                    density="compact"
                    v-model="item.baseUrl"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6" align-self="center">
                  <strong>Models:</strong>
                  <p class="text-disabled">
                    支持的模型
                  </p>
                </v-col>
                <v-col cols="12" md="5">
                  <v-select
                    v-model="item.models"
                    :items="Model"
                    clearable
                    variant="outlined"
                    color="primary"
                    multiple
                  >
                    <template #item="data">
                      <v-list-subheader v-if="data.props.header">
                        {{ data.props.header }}
                      </v-list-subheader>
                      <v-divider v-else-if="data.props.divider" />
                      <v-list-item v-else v-bind="data.props">
                      </v-list-item>
                    </template>
                    <template v-slot:selection="{ item }">
                      <v-chip rounded="lg">
                        <span>{{ item.title }}</span>
                      </v-chip>
                    </template>
                  </v-select>
                </v-col>

                <v-col cols="12" md="6">
                  <strong>Priority:</strong>
                  <p class="text-disabled">
                    渠道优先级
                  </p>
                </v-col>
                <v-col cols="12" md="5">
                  <v-number-input
                    :min="1"
                    :model-value="item.priority"
                    variant="outlined"
                    control-variant="stacked"
                    density="compact"
                  ></v-number-input>
                </v-col>

                <v-col cols="12" md="6">
                  <strong>Usage:</strong>
                  <p class="text-disabled">
                    使用量
                  </p>
                </v-col>
                <v-col cols="12" md="5">
                  <v-text-field
                    readonly
                    variant="outlined"
                    density="compact"
                    v-model="item.usage"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <strong>Enabled:</strong>
                  <p class="text-disabled">
                    是否启用
                  </p>
                </v-col>
                <v-col cols="12" md="5" >
                  <div class="justify-end d-flex">
                    <v-switch color="primary" hide-details v-model="item.enabled"></v-switch>
                  </div>
                </v-col>

                <v-col cols="12" md="6">
                  <strong>Proxy Enabled:</strong>
                  <p class="text-disabled">
                    是否启用代理，必须在启动应用的时候设置代理才能启用
                  </p>
                </v-col>
                <v-col cols="12" md="5" >
                  <div class="justify-end d-flex">
                    <v-switch color="primary" hide-details v-model="item.enableProxy"></v-switch>
                  </div>
                </v-col>
              </v-row>

              <span class="text-disabled">创建时间: {{item.createdAt}}</span>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn color="primary" class="mr-3" @click="deleteItem(item.id)">删除</v-btn>

              <v-btn color="primary" variant="flat">保存</v-btn>
            </v-card-actions>
          </v-card>
        </v-expansion-panel-text>
        <v-divider></v-divider>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-sheet>
</template>

<style scoped>
</style>
