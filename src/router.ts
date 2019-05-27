import Vue from 'vue';
import Router from 'vue-router';
import Boards from './views/Boards/Boards.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: Boards,
    },
  ],
});
