import { createApp } from "vue";
import App from "./App.vue";
import i18n from "./i18n/";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import "remixicon/fonts/remixicon.css";
import "./assets/tailwindcss.css";
import "./assets/style/app.scss";

import "./../mockjs/index.js";
import http from "./api/http/index.js";

//创建app
const app = createApp(App);
app.config.globalProperties.$http = http;

app
  .use(store)
  .use(router)
  .use(i18n)
  .use(ElementPlus, { locale: zhCn })
  .mount("#app");
