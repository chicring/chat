<script setup lang="ts">


import {onMounted, ref} from "vue";
import {findAllModel} from "../../api/methods/channel";
import Gpt4 from "../../assets/model/gpt-4.vue";

const list = ref([])

onMounted(async () => {
  list.value = await findAllModel()
})
</script>

<template>
  <v-container>
    <v-chip rounded="xl" color="primary" variant="flat">可用模型数量：{{list.length}}</v-chip>

    <v-divider class="my-3"></v-divider>
    <v-row>
      <v-col cols="12" md="4" v-for="(item, index) in list" :key="item.id">
        <v-card height="100"
                elevation="1"
                rounded="lg"
                color="surface-variant"
        >
          <v-card-text>
            <v-row>
              <v-col>
                <gpt4></gpt4>
              </v-col>
              <v-col>
                <v-card-title>
                  {{item.requestModel}}
                </v-card-title>
                <v-card-subtitle>
                  {{item.description}}
                </v-card-subtitle>
              </v-col>
              <v-spacer></v-spacer>
            </v-row>
            {{item.description}}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>
