import {reactive} from 'vue'

import {localStorageKey} from "../repository/constant";

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

export const useSettingStore  =reactive(
{
  state: {
     baseApiUrl: '',
     apiKey: '',
     models: [],
     config: {} as Config,
  },

  actions: {
    async initSetting(useSettingStore) {
      useSettingStore.state.config = {
        stream: true,
        model: "gpt-4",
        temperature: 0.7,
        top_p: 0.8,
        stop: null,
        max_tokens: 2000,
      };
      localStorage.setItem(localStorageKey.Setting, JSON.stringify(useSettingStore.state));
    },

    async loadSetting(useSettingStore) {
      const setting = localStorage.getItem(localStorageKey.Setting);
      if (setting) {
        console.log("加载设置");
        useSettingStore.state = JSON.parse(setting);
      } else {
        console.log("初始化设置");
        await this.initSetting(useSettingStore);
      }
    },


    async updateSetting(useSettingStore, setting) {
      useSettingStore.state = setting;
      localStorage.setItem(localStorageKey.Setting, JSON.stringify(useSettingStore.state));
    },

  }
})


