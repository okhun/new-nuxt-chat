// import type { Plugin } from "@nuxt/types";

// const websocketPlugin: Plugin = ({ app }, inject) => {
//   // WebSocket URL (change it to your server URL)
//   if (process.client) {
//     const ws = new WebSocket("ws://localhost:3000");
//       ws.onopen = () => {
//         console.log("WebSocket connection established");
//       };
//       ws.onerror = (error) => {
//         console.error("WebSocket error:", error);
//       };
//       ws.onmessage = (event) => {
//         const message = JSON.parse(event.data);
//         console.log("Received message:", message);
//         app.$store.commit("chat/addMessage", message); // Store the message in Vuex
//       };
//       inject("ws", ws);
//   }
// };

// export default websocketPlugin;
const l = 0;
