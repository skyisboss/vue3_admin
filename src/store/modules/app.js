// import * as api from "./../../api/app.js";
import * as api from "./../../api/app.js";

const state = {
  sidebarCollapse: false,
  menus: [],
  topMenuActive: 0,
  subMenuActive: "0",
  breadcrumb: [],
  routers: [],
  sideLayout: false,
  theme: {
    active: 0,
    data: [
      { name: "默认", active: true, theme: "" },
      { name: "白色", active: false, theme: "light" },
      { name: "黑色", active: false, theme: "dark" },
      { name: "绿色", active: false, theme: "green" },
    ],
  },
};

const getters = {};

const mutations = {
  //设置菜单
  menus(state, data) {
    state.menus = data;
  },
  navs(state, data) {
    state.navs = data;
  },
  breadcrumb(state, data) {
    state.breadcrumb = data;
  },
  setTheme(state, index) {
    state.theme.active = index;
    state.sideLayout = index == 3 ? true : false;
  },
  topMenuActive(state, data) {
    state.topMenuActive = data;
  },
  subMenuActive(state, data) {
    state.subMenuActive = String(data);
  },
  setSidebarCollapse(state, sc = null) {
    if (sc == null) {
      state.sidebarCollapse = !state.sidebarCollapse;
    } else {
      state.sidebarCollapse = sc;
    }
  },
  routers(state, routers) {
    state.routers = routers;
  },
};

const actions = {
  initRouter({ commit }, route = null) {
    const findArr = (arr) => {
      while (arr.some((t) => Array.isArray(t))) {
        arr = [].concat.apply([], arr);
      }
      return arr;
    };
    return new Promise((resolve) => {
      api.initRouter().then((res) => {
        commit("menus", res.data);
        //解析路由数据
        let routes = [];
        res.data.filter((res) => {
          routes.push(findArr(res.child));
        });
        routes = findArr(routes);
        commit("routers", routes);
        resolve(routes);
      });
    });
  },
  findIndexFromMenus({ commit, state }) {
    return new Promise((resolve) => {
      let idx = state.subMenuActive.split("-");
      let tmp = "";
      let nav = [];
      let m = state.menus[state.topMenuActive];
      nav.push(m.name);
      idx.filter((i) => {
        if (i != "") {
          tmp = tmp == "" ? m.child[i] : tmp.child[i];
          nav.push(tmp.name);
        }
      });
      commit("breadcrumb", nav);
      resolve(tmp);
    });
  },
  findRouterFromMenus({ commit, state }, router) {
    let find = false;
    let findMenu = (menu, index) => {
      if (menu.child.length > 0) {
        menu.child.filter((res, i) => {
          if (!find) {
            findMenu(res, i);
          }
        });
      }
      // TODO:: 开发阶段菜单id重复，但此处应该查找id是否相等而不是name
      if (menu.name == router) {
        find = true;
        commit("subMenuActive", index);
      }
    };
    state.menus.filter((res, index) => {
      if (!find) {
        findMenu(res, index);
        commit("topMenuActive", index);
      }
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
