import { createStore } from "vuex";
import app from "./modules/app.js";
import home from "./modules/console/home.js";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    app,
    home,
  },
});
