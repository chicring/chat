<script setup lang="ts">

import {onMounted, ref} from "vue";
import {getKnowledgeBaseList} from "../../api/methods/knowledgeBase";

const list = ref([])


onMounted(async () => {
  list.value = await getKnowledgeBaseList()
})
</script>

<template>
  <router-view />
<v-container v-if="$route.meta.showFather">
  <v-card flat rounded="xl" class="mb-4">
    <v-card-title>
      <h3>知识库</h3>
    </v-card-title>

    <v-card-subtitle>
      添加知识库，可以让大模型根据知识库的内容进行推理、回答
    </v-card-subtitle>

    <v-card-actions class="justify-end">
      <v-btn variant="flat">创建知识库</v-btn>
    </v-card-actions>
  </v-card>


    <v-row>
      <v-col cols="12" md="4" v-for="item in list" :key="item.id">
        <v-card flat rounded="xl" min-height="180" :to=" '/knowledge/' + item.id">
          <v-card-title>
            <h4>{{item.name}}</h4>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            {{item.description}}
          </v-card-text>
          <v-card-actions>

          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

</v-container>
</template>

<style scoped>

</style>
