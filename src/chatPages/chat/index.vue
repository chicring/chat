<script setup lang="ts">

import Messages from "./Message.vue";
import {onMounted, ref, watch} from "vue";
import {useMessageStore} from "../../store/message";
import {Message} from "../../repository/message";
import {useSessionStore} from "../../store/session";
import {Config} from "../../store/setting";

interface Props {
  sessionId?: string;
}
const props = defineProps<Props>()

const currentConfig = ref({} as Config)

const input = ref({
  content: "",
  tool: []
})

const sendMessage = async () => {
  if (input.value.content.trim() === "") {
    return;
  }

  let sessionID = props.sessionId;

  const message : Message = {
    role: "user",
    content: input.value.content,
    date: Math.floor(Date.now() / 1000),
  }
  input.value.content = "";
  await useMessageStore.actions.addMessage(useMessageStore, message, sessionID);

  await useMessageStore.actions.sendMessage(useMessageStore, useMessageStore.state.messageList, useMessageStore.state.currentConfig);
}
watch(() => useSessionStore.state.currentSessionId, (newVal) => {
  useSessionStore.state.currentSessionId = newVal;
})
watch(() => props.sessionId, (newVal) => {
  useSessionStore.state.currentSessionId = newVal;
  useMessageStore.actions.loadMessagesBySessionId(useMessageStore, newVal);
  input.value.content = "";
})

watch(() => useMessageStore.state.messageRely, (newVal) => {
  if (newVal) {
    console.log(newVal)

  }
})
</script>

<template>
  <v-sheet class="d-flex flex-column" style="height: calc(100vh - 64px);">
    <v-list id="messageList" class="flex-grow-1" style="
                    height: calc(100vh - 115px);
                    overflow-y: scroll;
                    padding: 0;
                    margin: 0;"
    >
      <v-list-item v-for="(item, index) in useMessageStore.state.messageList" :key="item.id">
        <Messages :message="item"></Messages>
      </v-list-item>


    </v-list>
    <v-card>
      <template v-slot:text>
        {{useMessageStore.state?.messageRely?.content}}
      </template>
    </v-card>

    <div class="mt-10 mb-3 mx-3">

      <v-textarea
        rounded="xl"
        color="primary"
        variant="outlined"
        auto-grow
        row-height="20"
        rows="1"
        max-rows="10"
        hide-details
        v-model="input.content"
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
  </v-sheet>
</template>

<style scoped>

</style>
