<script setup lang="ts">
import {useSettingStore,Config} from "../../store/setting";
import {computed, nextTick, onMounted, ref, watch, watchEffect} from "vue";
import OpenAI from "../../assets/icon/OpenAI.vue";

const setting = ref({
  baseApiUrl: '',
  apiKey: '',
  models: [],
  config: {} as Config
})
// computed(() => ({
//   baseApiUrl: useSettingStore.state.baseApiUrl,
//   apiKey: useSettingStore.state.apiKey,
//   models: useSettingStore.state.models,
//   config: useSettingStore.state.config as Config
// }))
const showApiKey = ref(false)

function toggleVisibility(index: number) {

  if (items.value[index].model === 'apiKey') {
    showApiKey.value = !showApiKey.value;
    items.value[index].icon = showApiKey.value ? 'mdi-eye' : 'mdi-eye-off';
    items.value[index].type = showApiKey.value ? 'text' : 'password';
  }
}

const items = ref([
  {
    label: '接口地址',
    subtitle: '需要包含http(s)://',
    placeholder: 'Base API URL',
    model: 'baseApiUrl',
    labelCols: '8',
    inputCols: '4',
    icon: '',
    type: 'text'
  },
  {
    label: 'Api key',
    subtitle: '使用自定义的OpenAI key',
    placeholder: 'API key',
    model: 'apiKey',
    labelCols: '8',
    inputCols: '4',
    icon: 'mdi-eye-off',
    type: 'password'
  },
  {
    label: '自定义模型',
    subtitle: '添加可使用的模型',
    placeholder: 'gpt-3',
    model: 'models',
    labelCols: '8',
    inputCols: '4',
    icon: '',
    type: 'text'
  }
])

const configItems = ref([
  {
    label: '随机性 Temperature',
    subtitle: '0-1之间的值',
    placeholder: '0.6',
    model: 'temperature',
    min: 0,
    max: 1,
    step: 0.1,
    labelCols: '8',
    inputCols: '4',
    type: 'slider'
  },
  {
    label: '核采样 top_p',
    subtitle: '0-1之间的值，0.5是一个不错的默认值，部分模型不能设置为1',
    placeholder: '0.5',
    model: 'top_p',
    min: 0,
    max: 1,
    step: 0.1,
    labelCols: '8',
    inputCols: '4',
    icon: '',
    type: 'slider'
  },
  {
    label: '最大回复长度',
    subtitle: '最大回复长度',
    placeholder: '最大回复长度',
    model: 'max_tokens',
    labelCols: '10',
    inputCols: '2',
    icon: '',
    type: 'text'
  },
  {
    label: '话题新鲜度 presence_penalty',
    subtitle: '值越高，模型越倾向于生成新的话题',
    placeholder: '0.6',
    model: 'presence_penalty',
    min: -2,
    max: 2,
    step: 0.1,
    labelCols: '8',
    inputCols: '4',
    icon: '',
    type: 'slider'
  },
  {
    label: '频率惩罚度 frequency_penalty',
    subtitle: '值越高，模型越倾向于避免重复',
    placeholder: '1.0',
    model: 'frequency_penalty',
    min: -2,
    max: 2,
    step: 0.1,
    labelCols: '8',
    inputCols: '4',
    icon: '',
    type: 'slider'
  },
  {
    label: '附带历史信息 max_history',
    subtitle: '附带历史信息数量',
    placeholder: '4',
    min: 0,
    max: 10,
    step: 1,
    model: 'max_history',
    labelCols: '8',
    inputCols: '4',
    icon: '',
    type: 'slider'

  }
])

let isInitialLoad = true;

watch(() => setting.value, async (value, oldValue) => {
  if (!isInitialLoad) { // 防止第一次执行
    await useSettingStore.actions.updateSetting(useSettingStore, value)
  }
  isInitialLoad = false;
}, { deep: true })

onMounted(async () => {
  setting.value = { ...useSettingStore.state }
  await nextTick();
  isInitialLoad = false;
})
</script>

<template>
  <v-sheet>

    <v-card class="ma-2" rounded="xl" border="md" flat>

      <v-card-title>
        <v-icon>mdi-cog-outline</v-icon> 基本设置
      </v-card-title>

      <v-card-text>
        <v-row no-gutters>
          <template v-for="(item, index) in items" :key="index">
            <v-col :cols="item.labelCols">
              <v-list-subheader class="text-medium-emphasis">
                <strong>{{ item.label }}</strong>
              </v-list-subheader>
              <v-list-item-subtitle>{{ item.subtitle }}</v-list-item-subtitle>
            </v-col>

            <v-col :cols="item.inputCols">
              <v-text-field
                :placeholder="item.placeholder"
                v-model="setting[item.model]"
                rounded="lg"
                variant="outlined"
                density="comfortable"
                :append-inner-icon="item.icon"
                :type="item.type"
                @click:append-inner="toggleVisibility(index)"
              >
              </v-text-field>
            </v-col>
          </template>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card class="mx-2 mt-4" rounded="xl" border="md" flat>

      <v-card-title>
        <v-icon>mdi-chat-processing-outline</v-icon> 对话设置
      </v-card-title>

      <v-card-text>
        <v-row no-gutters>
          <template v-for="(item, index) in configItems" :key="index">
            <v-col :cols="item.labelCols">
              <v-list-subheader class="text-medium-emphasis">
                <strong>{{ item.label }}</strong>
              </v-list-subheader>
              <v-list-item-subtitle>{{ item.subtitle }}</v-list-item-subtitle>
            </v-col>

            <v-col :cols="item.inputCols">
              <v-text-field
                v-if="item.type === 'text'"
                :placeholder="item.placeholder"
                v-model="setting.config[item.model]"
                rounded="lg"
                variant="outlined"
                density="comfortable"
                type="number"
                :append-inner-icon="item.icon"
                :type="item.type"
                @click:append-inner="toggleVisibility(index)"
              >
              </v-text-field>
              <v-slider
                v-else
                v-model="setting.config[item.model]"
                :max="item.max"
                :min="item.min"
                :step="item.step"
                thumb-label
                hide-details
              >
                <template v-slot:append>
                  <v-text-field
                    v-model="setting.config[item.model]"
                    density="compact"
                    style="width: 70px"
                    type="number"
                    hide-details
                    single-line
                    rounded="lg"
                    variant="outlined"
                  ></v-text-field>
                </template>
              </v-slider>
            </v-col>

          </template>
        </v-row>
      </v-card-text>
    </v-card>


    <v-card class="mx-2 mt-4" rounded="xl" border="md" flat>
      <v-card-text>
        <v-row no-gutters justify="space-between">
          <v-col cols="3">
            <v-list-subheader class="text-medium-emphasis">
              <strong>重置所有设置</strong>
            </v-list-subheader>
            <v-list-item-subtitle>重置所有设置到默认值</v-list-item-subtitle>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="1">
            <v-btn flat text="立即重置"></v-btn>
          </v-col>
        </v-row>

        <v-row no-gutters justify="space-between">
          <v-col cols="3" align-self="center">
            <v-list-subheader class="text-medium-emphasis">
              <strong>删除所有聊天记录</strong>
            </v-list-subheader>
            <v-list-item-subtitle>删除所有聊天记录</v-list-item-subtitle>
          </v-col>
          <v-spacer></v-spacer>

          <v-col cols="1" align-self="center">
            <v-btn flat text="立即删除"></v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-footer>

    </v-footer>
  </v-sheet>
</template>

<style scoped>

</style>
