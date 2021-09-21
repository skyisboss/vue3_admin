import { createI18n } from "vue-i18n";
import cn from "./cn";

// 构建实例
const i18n = createI18n({
  locale: localStorage.lang || "cn", // 默认当前语言环境
  fallbackLocale: "cn", // 第二默认语言环境
  messages: {
    cn,
  },
});
export default i18n;
