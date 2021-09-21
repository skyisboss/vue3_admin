<template>
  <el-menu
    class="ow-menu"
    @select="clickMenu"
    :default-active="defaultActive"
    :collapse-transition="false"
  >
    <template v-for="(item, i) in menus.child" :key="i">
      <el-sub-menu :index="String(i)" v-if="item.child.length > 0">
        <template #title>
          <i class="el-icon-" :class="item.icon"></i>
          <span>{{ item.name }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            :index="i + '-' + subIndex"
            v-for="(subItem, subIndex) in item.child"
          >
            {{ subItem.name }}
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-menu-item :index="String(i)" v-else>
        <i class="el-icon-" :class="item.icon"></i>
        <template #title>{{ item.name }}</template>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import { useRouter } from "vue-router";

export default {
  props: ["menus"],
  setup() {
    const router = useRouter();
    const { state, commit, dispatch } = useStore();

    const defaultActive = computed(() => state.app.subMenuActive);

    // 打开菜单
    const clickMenu = (index) => {
      commit("app/subMenuActive", index);
      dispatch("app/findIndexFromMenus").then((menu) => {
        router.push(menu.href);
      });
    };

    return {
      clickMenu,
      defaultActive,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>