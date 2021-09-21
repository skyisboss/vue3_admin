<template>
  <div
    class="layout dark-"
    :class="[{ 'mini-side': sidebarCollapse }, theme.data[theme.active].theme]"
  >
    <Header />
    <Sidebar />
    <Content />
  </div>
</template>

<script>
import Header from "./Header.vue";
import Sidebar from "./Sidebar.vue";
import Content from "./Content.vue";
import { defineComponent } from "vue";
import { toRefs, watch, provide } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    Header,
    Sidebar,
    Content,
  },
  setup() {
    const { state, commit } = useStore();
    const { sidebarCollapse, theme } = toRefs(state.app);

    //准备数据
    // provide("stateApp", state.app);

    return {
      theme,
      sidebarCollapse,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>