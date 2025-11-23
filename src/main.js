import { createApp } from "vue";
import App from "./frontend/App.vue";
import router from './router';

createApp(App).use(router).mount("#app");
