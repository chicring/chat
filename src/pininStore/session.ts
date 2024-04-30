import {defineStore} from "pinia";
import {Config} from "./setting";
import {Ref, ref} from "vue";
import {localStorageKey} from "./constant";

import { OpenAiRequestBody, OpenAiResponseBody} from "../api/network/types";

import GptClient, {
  DataCallback,
  ErrorCallback,
  ResponseCallback,
} from "../api/network";
import {getUuid} from "../util/auth";
import path from "node:path/win32";

export interface Session {
  id: string;
  topic: string;
  messages: Message[];
  lastUpdate: number;
  config: Config
}

export interface Message {
  id?: string;
  date: number;
  role?: string;
  content?: string;
  token?: string;
}

export const useSessionStore  = defineStore(
  'session',

  () => {

    const sessions : Ref<Session[]> = ref([])

    const currentSession : Ref<Session> = ref({
      id: '',
      topic: '',
      messages: [],
      lastUpdate: 0,
      config: {} as Config
    })
    const messageRely = ref(null as Message | null);


    async function addSession(session: Session) {
      sessions.value.push(session)
    }

    async function deleteSessionById(id: string) {
      sessions.value = sessions.value.filter(session => session.id !== id);
      if (currentSession.value?.id === id) {
        currentSession.value = sessions.value[0]
      }
    }

    async function deleteAllSessions() {
      sessions.value = []
    }

    async function updateSession(session: Session) {
      const index = sessions.value.findIndex(s => s.id === session.id)
      if (index !== -1) {
        sessions.value[index] = session
      }
    }

    async function findSessionById(id: string) {
      return sessions.value.find(s => s.id === id)
    }

    async function addMessage2Session(message: Message, sessionId: string) {
      const index = sessions.value.findIndex(s => s.id === sessionId)
      if (index !== -1) {
        sessions.value[index].messages.push(message)
        currentSession.value = sessions.value[index]
      }
    }

    async function doChat(
      messages: Message[],
      config: Config,
    ){

      const requestBody: OpenAiRequestBody = {
        messages: messages.map((message) => {
          return {
            role: message.role,
            content: message.content,
          };
        }),
        model: config.model,
        max_tokens: config.max_tokens,
        temperature: config.temperature,
        top_p: config.top_p,
        frequency_penalty: config.frequency_penalty,
        presence_penalty: config.presence_penalty,
        stream: config.stream,
      };

      GptClient.getInstance().post(
        requestBody,
        (data: string) => {
          messageRely.value = {
            date: Math.floor(Date.now() / 1000),
            role: "assistant",
            content: data,
            id: getUuid(),
          } as Message;
        },
        (response: string) => {
          this.addMessage2Session(messageRely.value, currentSession.value.id)
          messageRely.value = null;
        },
        (error: Error) => {
          this.addMessage2Session({
            date: Math.floor(Date.now() / 1000),
            role: "assistant",
            content: error.message,
          }, currentSession.value.id)
        }
      );

    }


    return { sessions, currentSession, messageRely, addSession, deleteSessionById, updateSession, deleteAllSessions, findSessionById,addMessage2Session ,doChat}
  },

  {
    persist: {
      key: localStorageKey.Sessions,
      paths: ['sessions', 'currentSession']
    }
  }
)
