<template>
  <div class="w-full h-20 shadow-md p-4">
    <Button @click="logout">Logout</Button>
  </div>
  <div class="flex justify-center gap-4 mt-10">
    <ul class="bg-white justify-center w-40 divide-y rounded-lg py-4 shadow-lg">
      <li
        v-for="user in users"
        :key="user.id"
        class="py-3 px-2 hover:bg-slate-100 duration-100"
        @click="handleNavigateToChat(user)"
      >
        <p>{{ user.username }}</p>
      </li>
    </ul>
    <div v-if="route.name === 'chat-id'"><RouterView /></div>
    <div
      v-else
      class="flex flex-col bg-white p-4 rounded-lg shadow-lg h-96 w-96 overflow-y-auto"
    >
      <div>Select user to chat</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "~/stores/auth";
import { useUserStore, type User } from "~/stores/users";

// Function to send the message

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const userStore = useUserStore();
const { users } = storeToRefs(userStore);

const logout = () => {
  authStore.logout();
};
onMounted(async () => {
  // userStore.getUsers();
});

function handleNavigateToChat(user: User) {
  const meString = localStorage.getItem("userData");
  if (meString) {
    const meParse = JSON.parse(meString);
    const matchingChats = user.chats.filter((chat1) =>
      meParse.chats.some((chat2) => chat1.id === chat2.id)
    );
    if (matchingChats.length > 0) {
      router.push(`/chat/${matchingChats[0].id}`);
    } else {
      userStore.createChat({
        chatName: "-",
        creatorId: meParse.id,
        participantId: user.id,
      });
    }
  }
}
</script>
