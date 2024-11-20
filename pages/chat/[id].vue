<script setup lang="ts">
import { useUserStore } from "~/stores/users";
// Define message interface
const route = useRoute();
const userStore = useUserStore();
const { chat } = storeToRefs(userStore);
let senderId = "";
const newMessage = ref("");
let ws: WebSocket;
function InitWebSocket() {
  if (process.client) {
    const url = localStorage.getItem("webSocketUrl");
    if (url) ws = new WebSocket(url);
  }
}
const sendMessage = () => {
  const form = JSON.stringify({
    senderId: Number(senderId),
    chatId: Number(route.params.id),
    replyToMessageId: 0,
    content: newMessage.value,
    filePath: "",
  });
  ws.send(form);
};

onMounted(() => {
  senderId = localStorage.getItem("senderId") || "";
  InitWebSocket();
  userStore.getMessages(Number(route.params.id));
});

onUnmounted(() => {
  ws.close();
});
</script>

<template>
  <div
    class="flex flex-col bg-white p-4 rounded-lg shadow-lg h-96 w-96 overflow-y-auto"
  >
    <div class="w-full h-10 border-b p-2">
      <p>
        Name:
        {{ chat?.users?.find((el) => el.id !== Number(senderId))?.username }}
      </p>
    </div>
    <div class="flex-1 overflow-y-auto mb-4 space-y-4">
      <div
        v-for="(message, index) in chat.messages"
        :key="index"
        class="flex items-start space-x-2"
      >
        <div class="font-semibold text-blue-500">{{ message.content }}:</div>
        <div class="bg-gray-100 p-2 rounded-lg text-sm">
          {{ message.content }}
        </div>
      </div>
    </div>

    <form @submit.prevent="sendMessage" class="flex items-center space-x-4">
      <input
        v-model="newMessage"
        type="text"
        placeholder="Type a message..."
        class="w-full p-3 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <button
        type="submit"
        class="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
      >
        Send
      </button>
    </form>
  </div>
</template>
