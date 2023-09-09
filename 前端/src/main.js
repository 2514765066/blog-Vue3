import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import pinia from "@/store";
import plugin from "@/plugin";
import "@/assets/simple.css";
import "animate.css";

const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(plugin);
app.mount("#app");
