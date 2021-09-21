<template>
  <div class="sidebar" v-if="!sideLayout">
    <div class="side__menu">
      <template v-for="(item, index) in menus" :key="index">
        <div class="side__menu-top" v-if="index == topMenuActive">
          {{ item.name }}
        </div>
        <div class="side__menu-main">
          <MenuList
            :menus="item"
            :collapse="sidebarCollapse"
            v-if="index == topMenuActive"
          />
        </div>
      </template>
    </div>
  </div>
  <div class="sidebar" v-else>
    <div class="top__menu float-left h-full">
      <ul>
        <li v-for="(item, i) in menus" :key="i">
          <div
            class="menu-nav"
            :class="{ active: i == topMenuActive }"
            @click="clickTopMenu(i)"
          >
            <i class="menu-icon" :class="item.icon"></i>
            <div class="menu-title">{{ item.name }}</div>
          </div>
        </li>
      </ul>
    </div>
    <div class="sub__menu h-full">
      <template v-for="(item, index) in menus" :key="index">
        <MenuList :menus="item" class="pt-4" v-if="index == topMenuActive" />
      </template>
    </div>
  </div>
</template>

<script>
import { toRefs, computed, onMounted } from "vue";
import { useStore } from "vuex";
import MenuList from "./MenuList.vue";
import { useRouter } from "vue-router";

export default {
  components: { MenuList },
  setup() {
    const router = useRouter();
    const { state, commit, dispatch } = useStore();
    const { sidebarCollapse, sideLayout, menus, topMenuActive } = toRefs(
      state.app
    );
    onMounted(() => {
      let r = router.currentRoute.value;
      if (r.path != "/home") {
        dispatch("app/findRouterFromMenus", r.name);
      }
      dispatch("app/findIndexFromMenus");
    });

    const clickTopMenu = (index) => {
      commit("app/topMenuActive", index);
    };

    const topMenuTitle = computed(() => {
      return menus.value[topMenuActive.value].name;
    });

    return {
      sidebarCollapse,
      sideLayout,
      menus,
      topMenuActive,
      clickTopMenu,
      topMenuTitle,
    };
  },
};
</script>

<style lang="scss" scoped>
@keyframes moveTop {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
}
.ow-menu {
  animation: moveTop 0.5s;
}
</style>