import {createRouter, createWebHashHistory} from "vue-router";
// import Pic from '../views/Pic.vue'
import Tools from "@/views/Tools.vue";
import Home from "/src/views/Home.vue";
import Plugin from "../views/Plugin.vue";
import Settings from "../views/Settings.vue";
import Temp from "../views/Temp.vue";
import About from "../views/About.vue";
import Upload from "../views/Upload.vue";
// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
  { path: "/", component: Home },
  { path: "/tools", component: Tools },
  { path: "/settings", component: Settings },
  { path: "/plugin", component: Plugin },
  { path: "/temp", component: Temp },
  { path: "/upload", component: Upload },
  { path: "/about", component: About },
];

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});

export default router;
