<script setup lang="ts">

import Messages from "./Message.vue";
import {ref, watch} from "vue";
import {Message, useSessionStore} from "../../pininStore/session";
import {useSettingStore} from "../../pininStore/setting";
import {storeToRefs} from "pinia";
import Welcome from "./Welcome.vue";
import OpenAI from "../../assets/icon/OpenAI.vue";

interface Props {
  sessionId?: string;
}

const props = defineProps<Props>()

const settingStore = useSettingStore();
const sessionStore = useSessionStore();
const {currentSession, messageRely} = storeToRefs(sessionStore);

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
  await sessionStore.addMessage2Session(message, sessionID);
  await sessionStore.doChat(currentSession.value.messages, currentSession.value.config);
}


watch(() => props.sessionId, async (newVal) => {
  const newSession = await sessionStore.findSessionById(newVal);

  if (newSession) {
    sessionStore.currentSession = newSession;
  }else {
    sessionStore.currentSession = {
      id: null,
      topic: "随便聊聊",
      messages: [],
      lastUpdate: Math.floor(Date.now() / 1000),
      config: settingStore.setting.config,
    }
  }
  input.value.content = "";
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
      <v-list-item v-for="(item, index) in currentSession.messages" :key="item.id">
        <Messages :message="item"></Messages>
      </v-list-item>

      <v-list-item v-if="messageRely">
        <v-col style="display: flex; justify-content: start" class="pa-0">
          <OpenAI></OpenAI>
          <v-card flat rounded="xl" border="sm" class="ml-1">
            <template v-slot:text>
              {{messageRely.content}}
            </template>
          </v-card>
        </v-col>
      </v-list-item>
    </v-list>


    <welcome v-if="!currentSession.id"></welcome>
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
              @click.stop="sendMessage"
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
