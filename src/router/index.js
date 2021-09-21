import { createRouter, createWebHashHistory } from "vue-router";
import store from "../store";
import Root from "../layout/Root.vue";
import Login from "../layout/Login.vue";
import Lock from "../layout/Lock.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "root",
      redirect: "/home",
      component: Root,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/lock",
      name: "lock",
      component: Lock,
    },
  ],
});

// 登录token
let token;

// 获取路由
await store.dispatch("app/initRouter").then((res) => {
  // 动态添加路由
  res.filter((route) => {
    router.addRoute("root", {
      path: route.href,
      name: route.name,
      meta: {
        id: route.id,
        pid: route.pid,
        active: false,
      },
      component: () => import(`../views${route.view}.vue`),
    });
  });
  // 匹配扩展路由 匹配以 `/extend-` 开头的所有内容，并将其放在 `$route.params.afterUser` 下
  // router.addRoute("layout", {
  //   path: "/extend-:afterUser(.*)",
  //   name: "ExtendPage",
  //   component: () => import("../views/ExtendPage.vue"),
  // });
  // 404错误路由
  // router.addRoute("layout", {
  //   path: "/:pathMatch(.*)*",
  //   name: "NotFound",
  //   component: () => import("../views/NotFound.vue"),
  // });
});

router.beforeEach(async (to, from, next) => {
  token = window.localStorage.getItem("token");
  // if (!token && to.path !== "/login") {
  //   return next("/login");
  // } else if (token && to.path == "/login") {
  //   return next("/");
  // }
  next();
});

export default router;
