import Vue from "vue";
import Vuex from "vuex";
// import EventService from "@/services/EventService.js";
import * as user from "./modules/user";
import * as event from "./modules/event";
import * as notification from "./modules/notification";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    categories: [
      "sustainability",
      "nature",
      "animal welfare",
      "housing",
      "education",
      "food",
      "community",
    ],
    todos: [
      { id: 1, text: "...", done: true },
      { id: 2, text: "...", done: false },
      { id: 3, text: "...", done: true },
      { id: 4, text: "...", done: false },
    ],
    count: 0,
  },
  mutations: {
    INCREMENT_COUNT(state, value) {
      state.count += value;
    },
  },
  actions: {
    updateCount({ state, commit }, value) {
      if (state.user) {
        commit("INCREMENT_COUNT", value);
      }
    },
  },
  modules: {
    user,
    event,
    notification,
  },
  getters: {
    catLength: state => state.categories.length,
    doneTodos: state => state.todos.filter(todo => todo.done),
    activeTodosCount: (state, getters) =>
      state.todos.length - getters.doneTodos.length,
    getTodoById: state => id => state.todos.find(todo => todo.id === id),
  },
});
