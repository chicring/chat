import {localStorageKey} from "./constant";
import {Session} from "./session";

import { OpenAiRequestBody, OpenAiResponseBody} from "../api/network/types";

import GptClient, {
  DataCallback,
  ErrorCallback,
  ResponseCallback,
} from "../api/network";
import {Config} from "../store/setting";


interface Message {
  id?: string;
  date: number;
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

  async loadAllMessagesBySessionId(sessionId: string): Promise<Session> {
    const sessions = localStorage.getItem(localStorageKey.Sessions);
    if (sessions) {
      const sessionsArray = JSON.parse(sessions);
      const session = sessionsArray.find((session: Session) => session.id === sessionId);
      if (session) {
        return session;
      }
    }
    return {} as Session
  }

  async sendMessage(
    messages: Message[],
    config: Config,
    onData: DataCallback,
    onResponse: ResponseCallback,
    onError: ErrorCallback
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

    GptClient.getInstance().post(requestBody, onData, onResponse, onError);
  }

}

export type { Message };
export { MessageRepository };


