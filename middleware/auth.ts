export default defineNuxtRouteMiddleware((to) => {
    const authStore = useAuthStore()
  
    if (to.path === '/chat' && !authStore.isAuthenticated) {
      return navigateTo('/login')
    }
  })
  