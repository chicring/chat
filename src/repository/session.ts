
import { localStorageKey} from "./constant";
import {Message} from "./message";
import {Config,useSettingStore} from "../store/setting";


interface Session {
  id: string;
  topic: string;
  messages: Message[];
  lastUpdate: number;
  config: Config
}


class SessionRepository {
  static instance: SessionRepository;

  public static getInstance(): SessionRepository {
    if (!SessionRepository.instance) {
      SessionRepository.instance = new SessionRepository();
    }
    return SessionRepository.instance;
  }

  async loadAllSessions(): Promise<Session[]> {
    const sessions = localStorage.getItem(localStorageKey.Sessions);
    return sessions ? JSON.parse(sessions) : [];
  }

  async createSession(): Promise<void> {
    const sessions = localStorage.getItem(localStorageKey.Sessions);
    const sessionsArray = sessions ? JSON.parse(sessions) : [];

    const newSession: Session = {
      id: Math.random().toString(36).slice(2, 9),
      topic: "随便聊聊",
      messages: [],
      lastUpdate: Date.now(),
      config: useSettingStore.state.config,
    };

    sessionsArray.push(newSession);
    localStorage.setItem(localStorageKey.Sessions, JSON.stringify(sessionsArray));
  }

  async deleteSessionById(id: string): Promise<void> {
    const sessions = localStorage.getItem(localStorageKey.Sessions);
    if (sessions) {
      const sessionsArray = JSON.parse(sessions);
      const index = sessionsArray.findIndex((session: Session) => session.id === id);
      if (index !== -1) {
        sessionsArray.splice(index, 1);
        localStorage.setItem(localStorageKey.Sessions, JSON.stringify(sessionsArray));
      }
    }
  }
  async updateSessionTopic(id: string, newTopic: string): Promise<void> {
    const sessions = localStorage.getItem(localStorageKey.Sessions);
    if (sessions) {
      const sessionsArray = JSON.parse(sessions);
      const sessionIndex = sessionsArray.findIndex((session: Session) => session.id === id);
      if (sessionIndex !== -1) {
        sessionsArray[sessionIndex].topic = newTopic;
        localStorage.setItem(localStorageKey.Sessions, JSON.stringify(sessionsArray));
      }
    }
  }
}

export type { Session };
export { SessionRepository };
