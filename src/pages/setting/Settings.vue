<script setup lang="ts">

</script>

<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card flat rounded="xl">
          <v-card-item>
            <v-card-title>个人信息</v-card-title>

            <v-divider></v-divider>

            <v-card-text>
              <v-card-subtitle class="text-end">注册时间：2024-1-16</v-card-subtitle>

              <v-row no-gutters>
                <v-col cols="12">
                  <v-text-field color="outline" bg-color="surface-variant" rounded="lg" variant="outlined" label="用户名" ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field color="outline" bg-color="surface-variant" rounded="lg" variant="outlined" label="密码"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field color="outline" bg-color="surface-variant" rounded="lg" variant="outlined" label="邮箱"></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions class="d-flex justify-end">
              <v-btn color="primary" class="text-none" variant="flat" text="保存"></v-btn>
            </v-card-actions>
          </v-card-item>
        </v-card>
      </v-col>

      <v-col cols="12" md="8">
        <v-card flat rounded="xl">
          <v-card-title>监控设置</v-card-title>
          <v-card-subtitle>
            消息通过邮箱通知您
          </v-card-subtitle>
          <v-card-text>


            <v-divider></v-divider>

          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>
