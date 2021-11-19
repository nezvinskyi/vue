import Vue from "vue";
import VueRouter from "vue-router";
import EventCreate from "../views/EventCreate.vue";
import EventList from "../views/EventList.vue";
import EventShow from "../views/EventShow.vue";
import NotFound from "../views/NotFound.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "event-list",
    component: EventList,
  },
  {
    path: "/event/:id",
    name: "event-show",
    component: EventShow,
    props: true,
  },
  {
    path: "/event/create",
    name: "event-create",
    component: EventCreate,
  },
  {
    path: "*",
    name: "not-found",
    component: NotFound,
  },

  // {
  //   path: "/about-us",
  //   name: "event-list",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  //   alias: "/about-me",
  // },
  // {
  //   path: "/about",
  //   redirect: { name: "About" },
  // },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
