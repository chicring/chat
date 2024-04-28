<script setup lang="ts">

import Message from "./Message.vue";
import {ref, watch} from "vue";

interface Props {
  sessionId: string;
}
const messageList = ref([
  {
    id: 1,
    role: "model",
    content: "你好"
  },
  {
    id: 2,
    role: "user",
    content: "你好"
  }
])

const messages = ref({
  input: "",
  tool: []
})

const sendMessage = async () => {
  if (messages.value.input.trim() === "") {
    return;
  }
  messageList.value.push({
    id: messageList.value.length + 1,
    role: "user",
    content: messages.value.input
  });

  messages.value.input = "";
  setTimeout(() => {
    messageList.value.push({
      id: messageList.value.length + 1,
      role: "model",
      content: "你好"
    });
  }, 100);

}

</script>

<template>
  <v-container fluid  class="d-flex flex-column" style="height: calc(100vh - 64px);">

    <v-list id="messageList" class="flex-grow-1" style="
                    height: calc(100vh - 115px);
                    overflow-y: scroll;
                    padding: 0;
                    margin: 0;"
    >
      <v-list-item v-for="(item, index) in messageList" :key="item.id">
        <Message :role="item.role" :content="item.content"></Message>
      </v-list-item>
    </v-list>


    <div class="mt-10 mb-3">

      <v-textarea
        rounded="xl"
        color="primary"
        variant="outlined"
        auto-grow
        row-height="20"
        rows="1"
        max-rows="10"
        hide-details
        v-model="messages.input"
      >
        <template #append-inner>
          <v-col align-self="end">
            <v-btn
              color="primary"
              text="发送"
              variant="flat"
              @click="sendMessage"
            >
            </v-btn>
          </v-col>
        </template>
      </v-textarea>
    </div>
  </v-container>
</template>

<style scoped>

</style>
