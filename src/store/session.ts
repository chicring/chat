import {SessionRepository,Session} from "../repository/session";
import {reactive} from "vue";
import {Config} from "./setting";

export const useSessionStore  =reactive({

  state: {
    sessions: [] as Session[],
    currentSessionId: '',
  },

  actions: {
    async loadSessions(useSessionStore) {
      useSessionStore.state.sessions = await SessionRepository.getInstance().loadAllSessions();
      useSessionStore.state.currentSessionId = useSessionStore.state.sessions[0]?.id;
    },

    async deleteSessionById(useSessionStore, id: string) {
      useSessionStore.state.sessions = useSessionStore.state.sessions.filter(session => session.id !== id);
    }
  }

})





