<script setup lang="ts">

import {ref} from "vue";
import {Channel_name} from './Channel'
import {Model} from './Model'

const channels = ref(Channel_name)

const selectModels = ref()

</script>

<template>
  <div class="text-center">

    <v-btn-group
      color="primary"
      density="comfortable"
      rounded="pill"
      divided
    >
      <v-btn
        class="pe-2"
        prepend-icon="mdi-account-multiple-outline"
        variant="flat"
      >
        <div class="text-none font-weight-regular">
          添加渠道
        </div>

        <v-dialog activator="parent" max-width="600">
          <template v-slot:default="{ isActive }">
            <v-card rounded="lg">
              <v-card-title class="d-flex justify-space-between align-center">
                <div class="text-h5 text-medium-emphasis ps-2">
                  添加渠道
                </div>

                <v-btn
                  icon="mdi-close"
                  variant="text"
                  @click="isActive.value = false"
                ></v-btn>

              </v-card-title>

              <v-divider class="mb-4"></v-divider>

              <v-card-text>
                <v-select
                  clearable
                  label="渠道类型"
                  color="primary"
                  :items="channels"
                  item-title="name"
                  item-value="value"
                  return-object
                  variant="outlined"
                  hide-details
                  rounded="lg"
                  class="mb-4"
                >

                  <template v-slot:item="{ props, item }">

                    <v-list-item v-bind="props">
                      <template v-slot:title>
                        <strong v-bind="props">{{item.raw.name}}</strong>
                      </template>

                      <template v-slot:append>
                        <component v-bind="props" :is="item.raw.iconComponents"></component>
                      </template>
                    </v-list-item>
                  </template>
                </v-select>

                <v-text-field
                  label="渠道名称"
                  hide-details
                  variant="outlined"
                  color="primary"
                  rounded="lg"
                  class="mb-4"
                >
                </v-text-field>

                <v-text-field
                  label="渠道站点地址"
                  hide-details
                  variant="outlined"
                  rounded="lg"
                  color="primary"
                  class="mb-4"
                >
                </v-text-field>


                <v-select
                          v-model="selectModels"
                          :items="Model"
                          clearable
                          chips
                          label="添加模型"
                          variant="outlined"
                          hide-details
                          color="primary"
                          rounded="lg"
                          class="mb-4"
                          multiple
                >
                  <template #item="data">
                    <v-list-subheader v-if="data.props.header">
                      {{ data.props.header }}
                    </v-list-subheader>
                    <v-divider v-else-if="data.props.divider" />
                    <v-list-item v-else v-bind="data.props">
<!--                      <v-list-item-subtitle>-->
<!--                        {{ data.item.title }}-->
<!--                      </v-list-item-subtitle>-->
                    </v-list-item>
                  </template>
                </v-select>

                <v-text-field
                  label="密钥"
                  hide-details
                  color="primary"
                  rounded="lg"
                  class="mb-4"
                  variant="outlined"
                >
                </v-text-field>
                <v-text-field
                  label="优先级"
                  hide-details
                  color="primary"
                  rounded="lg"
                  variant="outlined"
                >
                </v-text-field>

                <v-checkbox label="启用代理" color="primary"></v-checkbox>


              </v-card-text>

              <v-divider class="mt-2"></v-divider>

              <v-card-actions class="my-2 d-flex justify-end">
                <v-btn
                  class="text-none"
                  rounded="xl"
                  text="取消"
                  @click="isActive.value = false"
                ></v-btn>

                <v-btn
                  class="text-none"
                  color="primary"
                  rounded="xl"
                  text="提交"
                  variant="flat"
                  @click="isActive.value = false"
                ></v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-btn>

<!--      <v-btn-->
<!--        size="small"-->
<!--        icon-->
<!--      >-->
<!--        <v-icon icon="mdi-menu-down"></v-icon>-->

<!--        <v-menu-->
<!--          activator="parent"-->
<!--          location="bottom end"-->
<!--          transition="fade-transition"-->
<!--        >-->
<!--          <v-list-->
<!--            density="compact"-->
<!--            min-width="250"-->
<!--            rounded="lg"-->
<!--            slim-->
<!--          >-->
<!--            <v-list-item-->
<!--              prepend-icon="mdi-link"-->
<!--              title="Copy link"-->
<!--              link-->
<!--            ></v-list-item>-->

<!--            <v-divider class="my-2"></v-divider>-->

<!--            <v-list-item min-height="24">-->
<!--              <template v-slot:subtitle>-->
<!--                <div class="text-caption">-->
<!--                  Shared with John + 1 more-->
<!--                </div>-->
<!--              </template>-->
<!--            </v-list-item>-->
<!--          </v-list>-->
<!--        </v-menu>-->
<!--      </v-btn>-->
    </v-btn-group>
  </div>
</template>

<style scoped>

</style>
