import {reactive} from "vue";
import {Message, MessageRepository} from "../repository/message";
import {useSessionStore} from "./session";
import {Config} from "./setting";


export const useMessageStore  =reactive({

  state: {
    messageList: [] as Message[],
    messageRely: null as Message | null,
    currentConfig: {} as Config,
  },

  actions: {
    async loadMessagesBySessionId(useMessageStore, sessionId: string) {
      const session = await MessageRepository.getInstance().loadAllMessagesBySessionId(sessionId);
      useMessageStore.state.messageList = session.messages;
      useMessageStore.state.currentConfig = session.config;
    },

    async addMessage(useMessageStore, message: Message, sessionId: string) {
      useMessageStore.state.messageList.push(message);
      await MessageRepository.getInstance().addMessageToSession(sessionId, message);
      await useSessionStore.actions.loadSessions(useSessionStore);
    },

    async deleteMessageById(useMessageStore, id: string) {
      useMessageStore.state.messageList = useMessageStore.state.messageList.filter(message => message.id !== id);
    },

    async replyMessage(useMessageStore, message: Message) {
      useMessageStore.state.messageRely = message;
    },

    sendMessage(useMessageStore, messages: Message[], config: Config) {
      MessageRepository.getInstance().sendMessage(
        messages,
        config,
        (data: string) => {
          console.log(data);
          useMessageStore.state.replyMessage = {
            date: Math.floor(Date.now() / 1000),
            role: "assistant",
            content: data,
          } as Message;
        },
        (response: string) => {
          const newMessage: Message = {
            date: Math.floor(Date.now() / 1000),
            role: "assistant",
            content: response,
          }
          console.log(useSessionStore.state.currentSessionId);
          useMessageStore.actions.addMessage(useMessageStore, newMessage,useSessionStore.state.currentSessionId);
          useMessageStore.state.replyMessage = null;
        },
        (error: Error) => {
          const newMessage: Message = {
            date: Math.floor(Date.now() / 1000),
            role: "assistant",
            content: error.message,
          }
          useMessageStore.actions.addMessage(useMessageStore, newMessage,useSessionStore.state.currentSessionId);
        }
      );
    }
  }
})
