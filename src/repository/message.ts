import {localStorageKey} from "./constant";
import {Session} from "./session";


interface Message {
  id?: string;
  date: string;
  role?: string;
  content?: string;
  token?: string;
}

class MessageRepository {

  static instance: MessageRepository;
  public static getInstance(): MessageRepository {
    if (!MessageRepository.instance) {
      MessageRepository.instance = new MessageRepository();
    }
    return MessageRepository.instance;
  }

  async addMessageToSession(sessionId: string, newMessage: Message): Promise<void> {
    const sessions = localStorage.getItem(localStorageKey.Sessions);
    if (sessions) {
      const sessionsArray = JSON.parse(sessions);
      const sessionIndex = sessionsArray.findIndex((session: Session) => session.id === sessionId);
      if (sessionIndex !== -1) {
        sessionsArray[sessionIndex].messages.push(newMessage);
        localStorage.setItem(localStorageKey.Sessions, JSON.stringify(sessionsArray));
      }
    }
  }

}

export type { Message };
export { MessageRepository };


