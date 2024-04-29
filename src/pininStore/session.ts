import {defineStore} from "pinia";
import {Config} from "./setting";
import {Message} from "./message";
import {Ref, ref} from "vue";
import {localStorageKey} from "./constant";

export interface Session {
  id: string;
  topic: string;
  messages: Message[];
  lastUpdate: number;
  config: Config
}

export const useSessionStore  = defineStore(
  'session',

  () => {

    const sessions : Ref<Session[]> = ref([])
    const currentSession = ref({} as Session)

    async function addSession(session: Session) {
      sessions.value.push(session)
    }

    async function deleteSessionById(id: string) {
      sessions.value = sessions.value.filter(session => session.id !== id);
    }

    async function deleteAllSessions() {
      sessions.value = []
    }

    function updateSession(session: Session) {
      const index = sessions.value.findIndex(s => s.id === session.id)
      if (index !== -1) {
        sessions.value[index] = session
      }
    }

    return { sessions, currentSession, addSession, deleteSessionById, updateSession, deleteAllSessions }
  },

  {
    persist: {
      key: localStorageKey.Sessions,
    }
  }
)
