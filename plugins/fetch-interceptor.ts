export default defineNuxtPlugin((nuxtApp) => {
  // Create a custom $fetch function with interceptors
  const customFetch = async (url: string, options: any) => {
    // Request Interceptor
    const token = localStorage.getItem("token");
    if (token) {
      if (!options.headers) {
        options.headers = {};
      }
      options.headers["Authorization"] = `Bearer ${token}`;
    }
    try {
      const response: any = await $fetch(
        "http://34.239.114.61:5000" + url,
        options
      ); // Perform the fetch request

      // If needed, you can handle specific error codes globally (e.g., 401 Unauthorized)
      if (response.status === 401) {
        const { $router } = useNuxtApp();
        $router.push(`/login`);
        // Redirect to login if unauthorized
      }

      return response; // Return the response
    } catch (error) {
      if (error instanceof Error && "status" in error && error.status === 401) {
        const { $router } = useNuxtApp();
        $router.push(`/login`);
      }
      // Global error handling
      throw error; // Rethrow error to be handled by caller
    }
  };

  // Provide the customFetch globally via Nuxt app context
  nuxtApp.provide("customFetch", customFetch);
});
