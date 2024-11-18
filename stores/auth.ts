import { defineStore } from "pinia";
export const useAuthStore = defineStore("auth", {
  state: () => ({}),
  actions: {
    async register(payload: any) {
      try {
        const { $customFetch } = useNuxtApp();
        const response = await $customFetch("/api/auth/register", {
          method: "POST",
          body: payload,
        });
        if (response.statusCode === 200) {
          const { $router } = useNuxtApp();
          $router.push(`/login`);
        }
      } catch (error) {
        console.error("Login failed", error);
      }
    },
    async login(payload: any) {
      try {
        const { $customFetch } = useNuxtApp();
        const response = await $customFetch("/api/auth/login", {
          method: "POST",
          body: payload,
        });

        if (response.statusCode === 200) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("webSocketUrl", response.data.webSocketUrl);
          localStorage.setItem(
            "userData",
            JSON.stringify(response.data.userInfo || {})
          );
          const { $router } = useNuxtApp();
          $router.push(`/chat`);
        }
      } catch (error) {
        console.error("Login failed", error);
      }
    },
    logout() {
      localStorage.clear();
      const { $router } = useNuxtApp();
      $router.push(`/login`);
    },
  },
});
