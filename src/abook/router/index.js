import {createRouter, createWebHashHistory} from "vue-router";
import Home from "../views/Home.vue";
import Found from "../views/Found.vue";
import My from "../views/My.vue";
import Search from "../views/Search.vue";
import Detail from "../views/Detail.vue";
import Movies from "../views/Movies.vue";
import DetailMovie from "../views/DetailMovie.vue";
import BookList from "../views/BookList.vue";
// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
    { path: "/", component: Home },
    { path: "/found", component: Found },
    { path: "/my", component: My },
    { path: "/search", component: Search },
    { path: "/detail/:id", component: Detail ,props: true},
    {
        path: "/movies",
        name: "movies",
        component: Movies ,
        props: true,  // 传递所有 params 到
        children: [
            {
                path: "detail2/:id",
                // name: "detail",
                component: DetailMovie ,
                props: true
                // props(route) {return route.query}
            },
        ]
    },
    {
        path: "/movies/detail/:id",
        name: "detailMovie",
        component: DetailMovie ,
        // props: true
        props(route) {return route.query}
    },
    { path: "/book", component: BookList },

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
