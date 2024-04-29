<script setup lang="ts">

import {ref} from "vue";
import OpenAI from "../../assets/icon/OpenAI.vue";
import {Message} from "../../repository/message";

const props = defineProps<{
  message: Message
}>();


// const message = ref({
//   role: null,
//   content: null,
//   tool_calls: null,
//   tool_call_id: null,
// });


</script>

<template>
  <v-col v-if="props.message.role !== 'user'" style="display: flex; justify-content: start" class="pa-0">
    <OpenAI></OpenAI>
    <v-card flat rounded="xl" border="sm" class="ml-1">
      <template #text>
        {{props.message.content}}
      </template>
    </v-card>
  </v-col>

  <v-col v-else style="display: flex; justify-content: end" class="pa-0">
    <v-card flat color="background-1" rounded="xl" class="mr-1" border="sm">
      <template #text>
        {{props.message.content}}
      </template>
    </v-card>
    <v-icon>mdi-account</v-icon>
  </v-col>


<!--    <div class="d-flex justify-end">-->
<!--      <v-btn size="x-small">-->
<!--        <v-icon>mdi-heart</v-icon>-->
<!--      </v-btn>-->
<!--      <v-btn size="x-small">-->
<!--        <v-icon>mdi-share-variant</v-icon>-->
<!--      </v-btn>-->
<!--      <v-btn size="x-small">-->
<!--        <v-icon>mdi-dots-vertical</v-icon>-->
<!--      </v-btn>-->
<!--    </div>-->

</template>

<style scoped>

</style>
