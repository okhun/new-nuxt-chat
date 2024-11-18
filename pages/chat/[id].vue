<script setup lang="ts">
import { useUserStore } from "~/stores/users";
// Define message interface

const userStore = useUserStore();
const { messages } = storeToRefs(userStore);

const newMessage = ref("");
let ws: WebSocket;
function InitWebSocket() {
  if (process.client) {
    const url = localStorage.getItem("webSocketUrl");
    if (url) ws = new WebSocket(url);
  }
}
const sendMessage = () => {
  console.log(ws);
  ws.onopen = (event) => {
    ws.send("Here's some text that the server is urgently awaiting!");
  };
  // if (newMessage.value.trim()) {
  //   messages.value.push({
  //     user: "User", // You can change this to dynamic user names
  //     text: newMessage.value.trim(),
  //   });
  //   newMessage.value = ""; // Clear input field after sending
  // }
};

onMounted(() => {
  InitWebSocket();
  // userStore.getMessages(Number(route.params.id));
});

onUnmounted(() => {
  ws.close();
});
</script>

<template>
  <div
    class="flex flex-col bg-white p-4 rounded-lg shadow-lg h-96 w-96 overflow-y-auto"
  >
    <div class="flex-1 overflow-y-auto mb-4 space-y-4">
      <div
        v-for="(message, index) in messages"
        :key="index"
        class="flex items-start space-x-2"
      >
        <div class="font-semibold text-blue-500">{{ message.user }}:</div>
        <div class="bg-gray-100 p-2 rounded-lg text-sm">
          {{ message.text }}
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
