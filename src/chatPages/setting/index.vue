<script setup lang="ts">
import {useSettingStore,Config} from "../../store/setting";
import {computed, onMounted, ref} from "vue";

const setting = computed(() => ({
  baseApiUrl: useSettingStore.state.baseApiUrl,
  apiKey: useSettingStore.state.apiKey,
  models: useSettingStore.state.models,
  config: useSettingStore.state.config as Config
}))


</script>

<template>
  <v-sheet>
    <v-row no-gutters>
      <v-col cols="12">
          <v-card flat>
            <v-card-text>
              <v-row>
                <v-col cols="7">
                  <v-list-subheader class="text-medium-emphasis">
                    <strong>Prefix for dollar currency</strong>
                  </v-list-subheader>
                  <v-list-item-subtitle>Prefix for dollar currency</v-list-item-subtitle>
                </v-col>

                <v-col cols="5">
                  <v-text-field
                    label="API key"
                    v-model="setting.baseApiUrl"
                    rounded="lg"
                    variant="outlined"
                  >
                  </v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12">

                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="API key"
                    v-model="setting.baseApiUrl"
                    rounded="xl"
                    variant="outlined"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="API key"
                    v-model="setting.baseApiUrl"
                    rounded="xl"
                    variant="outlined"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-btn>保存</v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<style scoped>

</style>
