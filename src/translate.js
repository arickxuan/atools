import {createApp} from "vue";

// import App from "./App.vue";
// import router from "./router/router"; // 引入路由
import Home from "./translate/Home.vue";

const app = createApp(Home);
// app.use(router);
// app.use(ElementPlus)
app.mount("#app");
