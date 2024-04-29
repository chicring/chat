import {defineStore} from "pinia";
import {ref} from "vue";
import {localStorageKey} from "./constant";


export interface Setting {
  baseApiUrl: string;
  apiKey: string;
  models: string[];
  config: Config;
}

export interface Config {
  stream: boolean;
  model: string;
  temperature: number;
  presence_penalty?: number;
  frequency_penalty?: number;
  top_p: number;
  top_k?: number;
  stop?: string;
  max_tokens: number;
  max_history: number;
  tools?: [];
}

const useSettingStore = defineStore(
  'setting',
  () =>{

    const setting = ref({} as Setting)

    async function initSetting() {
      setting.value.models = ['gpt-3.5-turbo','gpt-4'];
      setting.value.config = {
        stream: true,
        model: "gpt-4",
        temperature: 0.7,
        top_p: 0.8,
        stop: null,
        max_tokens: 2000,
      } as Config;
    }

    async function updateSetting(newSetting : Setting) {
      setting.value = newSetting;
    }

    async function resetSetting() {
      this.initSetting();
    }

    return {setting, initSetting, resetSetting, updateSetting}
  },
  {
    persist: {
      key: localStorageKey.Setting,
    }
  }
)
