<template>
  <div class="header">
    <div class="logo flex-none px-4">
      <div class="c-p">
        <span v-if="sideLayout">
          <span class="iconfont-oo" name="o"></span>
          <span class="iconfont-kk" name="k"></span>
        </span>
        <span v-else>
          <span class="iconfont-O" name="o"></span>
          <span class="iconfont-K" name="k"></span>
          <span class="iconfont-uni7AD9" name="站"></span>
          <span class="iconfont-uni7FA4" name="群"></span>
          <span class="iconfont-uni7BA1" name="管"></span>
          <span class="iconfont-uni7406" name="理"></span>
          <span class="iconfont-uni7CFB" name="系"></span>
          <span class="iconfont-uni7EDF" name="统"></span>
        </span>
      </div>
    </div>
    <div class="topbar flex w-full items-center px-6">
      <div class="lt flex flex-1 items-center relative">
        <div class="c-p px-3 -ml-4" @click="toggleSidebar">
          <i
            class="text-xl"
            :class="sidebarCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
          ></i>
        </div>
        <div class="c-p px-3" @click="showSearch = !showSearch">
          <i class="el-icon-search text-xl"></i>
        </div>
        <div class="c-p px-3 absolute" v-if="showSearch" style="left: 70px">
          <el-select size="small" v-model="menuModel" filterable clearable>
            <el-option
              v-for="item in routers"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>

        <ul class="flex nav-ul" v-if="!sideLayout">
          <li v-for="(item, i) in menus" :key="i">
            <div
              class="nav"
              :class="{ active: i == topMenuActive }"
              @click="setTopMenu(i)"
            >
              <i class="mr-2 icon" :class="item.icon"></i>
              <span class="align-top">{{ item.name }}</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="rt">
        <ul class="space-x-10 flex items-center">
          <li>
            <el-popover placement="bottom" :width="300" trigger="click">
              <template #reference>
                <div class="nav">
                  <el-badge is-dot class="item notice">
                    <i class="icon el-icon-bell"></i>
                  </el-badge>
                </div>
              </template>
              <div class="notice-wrap">
                <div class="header">
                  <div>
                    <span class="font-bold">消息通知</span>
                    <el-badge class="mark" :value="3" />
                  </div>
                  <div class="delete-btn">
                    <el-button size="mini" type="text">清空</el-button>
                  </div>
                </div>
                <div class="body h-44- my-5">
                  <div class="flex py-3 px-1 c-p hover:bg-gray-300">
                    <div class="title flex-1">站点创建成功</div>
                    <span class="time text-gray-400">20分钟前</span>
                  </div>
                  <div class="flex py-3 px-1 c-p hover:bg-gray-300">
                    <div class="title flex-1">采集任务开始</div>
                    <span class="time text-gray-400">20分钟前</span>
                  </div>
                </div>
                <div class="footer">
                  <el-button class="w-full" size="small" type="primary"
                    >查看全部</el-button
                  >
                </div>
              </div>
            </el-popover>
          </li>
          <li>
            <div class="nav">
              <el-dropdown>
                <div class="el-dropdown-link">
                  <i class="ri-palette-line icon" style="font-size: 18px"></i>
                  <!-- <i class="icon el-icon-brush"></i> -->
                </div>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item
                      @click="setTheme(i)"
                      v-for="(item, i) in theme.data"
                      :key="i"
                    >
                      {{ item.name }}
                      <i
                        class="icon el-icon-check"
                        v-if="theme.active == i"
                      ></i>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </li>

          <li>
            <div class="nav">
              <el-dropdown>
                <div class="el-dropdown-link">
                  <i class="icon ri-translate-2" style="font-size: 18px"></i>
                </div>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item
                      v-for="(item, i) in langs"
                      :key="i"
                      @click="setLang(i)"
                    >
                      {{ item }}
                      <i class="icon el-icon-check" v-if="i == locale"></i>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </li>
          <li>
            <div class="nav">
              <el-dropdown @command="handleCommand">
                <div class="el-dropdown-link">
                  <el-avatar size="small" icon="el-icon-user-solid"></el-avatar>
                </div>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item icon="icon el-icon-lock" command="lock">
                      锁定屏幕
                    </el-dropdown-item>
                    <el-dropdown-item icon="icon el-icon-mouse" command="todo">
                      待办事项
                    </el-dropdown-item>
                    <el-dropdown-item
                      icon="icon el-icon-user"
                      command="profile"
                    >
                      个人信息
                    </el-dropdown-item>
                    <el-dropdown-item
                      icon="icon el-icon-switch-button"
                      command="logout"
                      divided
                      >退出登录</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { toRefs, reactive, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { ElMessageBox } from "element-plus";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const { commit, state } = useStore();
    const { locale, messages } = useI18n();
    const {
      sidebarCollapse,
      theme,
      sideLayout,
      routers,
      menus,
      topMenuActive,
    } = toRefs(state.app);

    const data = reactive({
      menuModel: "",
      showSearch: false,
    });

    onMounted(() => {
      let theme = localStorage.getItem("theme") || 0;
      setTheme(theme);
      let sidebar = localStorage.getItem("sidebar") || 0;
      if (sidebar == 1) commit("app/setSidebarCollapse");
    });
    // 本地存储
    const setLocalStore = (key, val) => {
      localStorage.setItem(key, val);
    };

    // 侧边栏伸缩
    const toggleSidebar = () => {
      commit("app/setSidebarCollapse");
      setLocalStore("sidebar", sidebarCollapse.value ? 1 : 0);
    };
    // 主题设置
    const setTheme = (index) => {
      setLocalStore("theme", index);
      commit("app/setTheme", index);
    };
    // 点击顶部菜单
    const setTopMenu = (index) => {
      commit("app/topMenuActive", index);
    };
    // 多语言
    const setLang = (key) => {
      locale.value = key;
    };

    // 获取多语言列表
    const langs = computed(() => {
      return messages.value[locale.value].langs;
    });

    // 用户头像下拉菜单
    const handleCommand = (key) => {
      switch (key) {
        case "lock":
          router.push("/lock");
          break;
        case "logout":
          ElMessageBox.confirm("确定退出当前登录吗？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              router.push("/login");
            })
            .catch(() => {});
          break;

        default:
          break;
      }
    };

    return {
      ...toRefs(data),
      toggleSidebar,
      sidebarCollapse,
      theme,
      routers,
      setTheme,
      sideLayout,
      menus,
      topMenuActive,
      setTopMenu,
      langs,
      locale,
      setLang,
      handleCommand,
    };
  },
};
</script>

<style lang="scss" scoped>
.notice-wrap {
  position: relative;
  .header {
    height: 32px;
    line-height: 32px;
    border-bottom: 1px solid #ddd;
  }
  .delete-btn {
    position: absolute;
    right: 0;
    top: 0;
  }
}
.lock-wrap {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  visibility: hidden;
  z-index: 9999999;
  display: flex;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.1);
  &.show {
    opacity: 1;
    visibility: visible;
    transform: perspective(1px) scale(1);
    transition: visibility 0s linear 0s, opacity 0.15s 0s, transform 0.15s;
    backdrop-filter: saturate(90%) blur(10px);
  }
}
</style>