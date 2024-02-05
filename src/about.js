import {createApp} from "vue";
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import "./styles.css";
// import App from "./App.vue";
import App from "./App2.vue";

// const app = createApp(Pic);
// app.use(router);
// // app.use(ElementPlus)
// app.mount("#app");
// // createApp(Pic).mount("#app");

const about = createApp(App);
about.mount("#about");
