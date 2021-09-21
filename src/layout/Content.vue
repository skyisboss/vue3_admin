<template>
  <div class="content">
    <div class="main__top flex items-center">
      <i class="icon el-icon-location-information mr-1"></i>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="(item, i) in breadcrumb" :key="i">
          {{ item }}
        </el-breadcrumb-item>
      </el-breadcrumb>

      <el-tabs class="page__tabs hidden" type="card">
        <el-tab-pane label="用户管理"></el-tab-pane>
        <el-tab-pane label="配置管理"></el-tab-pane>
        <el-tab-pane label="角色管理"></el-tab-pane>
        <el-tab-pane label="定时任务补偿"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="main__top-bg"></div>
    <div class="main__wrap">
      <div class="main__content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const { state } = useStore();
    const breadcrumb = computed(() => state.app.breadcrumb);

    return {
      breadcrumb,
    };
  },
};
</script>

<style lang="scss" scoped>
.page__tabs :deep() {
  .el-tabs__header {
    border-bottom: 0 !important;
  }
  // .el-tabs__nav {}
}
</style>