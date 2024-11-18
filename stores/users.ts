import { defineStore } from "pinia";
export interface User {
  username: string;
  id: number;
}
interface Chat {
  chatName: string;
  creatorId: number;
  participantId: number;
}
export const useUserStore = defineStore("users", {
  state: () => ({
    users: [] as User[],
    messages: [],
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
    async createChat(payload: Chat) {
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
          `/api/messages/get-by-chat-id/${chatId}`
        );

        this.messages = response.data || [];
      } catch (error) {
        console.error("Login failed", error);
      }
    },
  },
});
