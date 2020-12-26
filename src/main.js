import { createApp } from 'vue';
import App from './App.vue';
import "bootstrap/dist/css/bootstrap.min.css";
import Animation from "animate.css";

const app = createApp(App)
app.use(Animation);
app.mount('#app')
