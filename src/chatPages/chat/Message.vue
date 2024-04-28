<script setup lang="ts">

import {ref} from "vue";

const props = defineProps<{
  content: string
  role: string
}>();


// const message = ref({
//   role: null,
//   content: null,
//   tool_calls: null,
//   tool_call_id: null,
// });


</script>

<template>

  <v-col v-if="props.role !== 'user'" style="display: flex; justify-content: start">

    <v-icon>mdi-robot</v-icon>
    <v-card flat rounded="xl">
      <template v-slot:text>
       {{props.content}}
      </template>
    </v-card>
  </v-col>

  <v-col v-else style="display: flex; justify-content: end">
    <v-card flat color="background-1" rounded="xl" class="mr-1">
      <template v-slot:text>
        {{props.content}}
      </template>
    </v-card>
    <v-icon>mdi-robot</v-icon>
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
