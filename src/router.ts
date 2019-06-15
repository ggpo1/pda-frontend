import Vue from 'vue';
import Router from 'vue-router';
import Boards from './views/Boards/Boards.vue';
import Tasks from './views/Tasks/Tasks';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: Boards,
    },
    {
      path: '/tasks',
      component: Tasks,
    }
  ],
});
