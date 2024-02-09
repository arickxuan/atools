import {createApp} from "vue";
import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import {createPinia} from 'pinia'
import App from "./App.vue";
import router from "./router"; // 引入路由

const app = createApp(App);
const pinia = createPinia()

app.use(router);
app.use(pinia);
app.use(ElementPlus)

app.mount("#app");
