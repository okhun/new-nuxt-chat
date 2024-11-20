import { defineStore } from "pinia";
// export interface User {
//   username: string;
//   id: number;
// }
interface ChatPayload {
  chatName: string;
  creatorId: number;
  participantId: number;
}
interface Chat {
  id: number;
  chatName: string;
  chatType: string;
  messages: Message[]; // Assuming messages have a structure to define separately
  users: User[];
}

interface Message {
  // Define message structure if needed. For now, it is an empty array in the example.
  id?: number;
  content?: string;
  senderId?: number;
  timestamp?: string; // ISO 8601 string
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}
export const useUserStore = defineStore("users", {
  state: () => ({
    users: [] as User[],
    messages: [],
    chat: {} as Chat,
  }),
  actions: {
    async getUsers() {
      try {
        const { $customFetch } = useNuxtApp();
        const response: any = await $customFetch("/api/users/get-all");

        this.users = response.data || [];
      } catch (error) {
        console.error("Login failed", error);
      }
    },
    async createChat(payload: ChatPayload) {
      try {
        const { $customFetch } = useNuxtApp();
        const response = await $customFetch(`/api/chats/create`, {
          method: "POST",
          body: payload,
        });
        if (response.statusCode === 200) {
          const { $router } = useNuxtApp();
          $router.push(`/chat/${response.data}`);
        }
      } catch (error) {
        console.error("Create chat failed", error);
      }
    },
    async getMessages(chatId: number) {
      try {
        const { $customFetch } = useNuxtApp();
        const response: any = await $customFetch(
          `/api/chats/get-by-id/${chatId}`
        );

        this.chat = response.data || {};
      } catch (error) {
        console.error("Login failed", error);
      }
    },
  },
});
