<script setup lang="ts">
import {getEmailAvatar} from "../../util/EmailAvatar";

import {useSessionStore, Session, Message} from "../../pininStore/session";
import {formatDate} from "../../util/formatDate";
import {useDebounce} from "../../util/debounceAndThrottle.";
import {info} from "../../components/ToastMessage/Message";
import {getUuid} from "../../util/auth";
import {useSettingStore} from "../../pininStore/setting"
import {storeToRefs} from "pinia";

const sessionStore = useSessionStore();
const settingStore = useSettingStore();
const {sessions, currentSession} = storeToRefs(sessionStore);

const creatSession = useDebounce(async () => {

  const lastSession = sessions.value[sessions.value.length - 1];

  if(lastSession != undefined ){
    if (lastSession.messages.length <= 1){
      info("已经是最新的会话")
      return;
    }
  }
  const newMessage: Message = {
    date: Math.floor(Date.now() / 1000),
    role: "system",
    content: "有什么可以帮你的吗",
  }

  const newSession: Session = {
    id: getUuid(),
    topic: "随便聊聊",
    messages: [newMessage],
    lastUpdate: Math.floor(Date.now() / 1000),
    config: settingStore.setting.config,
  };

  await sessionStore.addSession(newSession);
}, 100)

async function deleteSession(id: string) {
  await sessionStore.deleteSessionById(id);
}


</script>

<template>
  <v-navigation-drawer
    class="px-3"

  >
    <template #prepend>
      <v-img src="/src/assets/logo.svg" alt="Logo"
             max-width="95"
             class="mt-3 mb-5"
      ></v-img>

      <v-btn
        block
        color="primary"
        prepend-icon="mdi-plus"
        variant="tonal"
        rounded="lg"
        size="large"
        @click="creatSession"
        class="mb-2"
      >
        <strong>新对话</strong>
      </v-btn>
    </template>


    <v-list
      nav
      density="compact"
      transition="slide-y-transition"
    >
      <v-list-item
        color="primary"
        rounded="lg"
        v-for="(item, index) in sessions.slice().reverse()"
        :key="item.id"
        :to=" '/chat/' + item.id"
      >
        <v-list-item-title>
          <strong>
            {{item.topic}}
          </strong>
        </v-list-item-title>
        <v-list-item-subtitle>
          {{formatDate(item.lastUpdate)}}
        </v-list-item-subtitle>

        <template #append>
          <MenuDropdown :size="'small'" @delete="deleteSession(item.id)"></MenuDropdown>
        </template>
      </v-list-item>
    </v-list>

    <template v-slot:append>
      <v-card height="70" flat class="mb-3" >
        <v-card-text>
          <v-row justify="space-between" no-gutters>
            <v-col>
              <v-avatar :image="getEmailAvatar('3081044735@qq.com')"></v-avatar>
            </v-col>
            <v-spacer></v-spacer>
            <v-col align-self="end" cols="2">
              <v-btn icon="mdi-cog" variant="plain" to="/chat/setting">
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </template>

  </v-navigation-drawer>
</template>

<style scoped>

</style>
