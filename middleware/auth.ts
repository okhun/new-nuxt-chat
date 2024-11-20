export default defineNuxtRouteMiddleware((to) => {
  const token = localStorage.getItem("token");
  if (to.path === "/chat" && !token) {
    return navigateTo("/login");
  }
});
