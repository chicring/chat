<script setup lang="ts">

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
                  chips
                  label="渠道类型"
                  :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                  variant="outlined"
                  hide-details
                  rounded="lg"
                  class="mb-4"
                ></v-select>

                <v-text-field
                  label="渠道名称"
                  hide-details
                  variant="outlined"
                  rounded="lg"

                  class="mb-4"
                >
                </v-text-field>

                <v-text-field
                  label="渠道站点地址"
                  hide-details
                  variant="outlined"
                  rounded="lg"

                  class="mb-4"
                >
                </v-text-field>

                <v-select
                  clearable
                  chips
                  label="添加模型"
                  :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                  variant="outlined"
                  hide-details
                  rounded="lg"

                  class="mb-4"
                ></v-select>

                <v-text-field
                  label="密钥"
                  hide-details
                  rounded="lg"

                  variant="outlined"
                >
                </v-text-field>


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
