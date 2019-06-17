import Vue from 'vue';
import Router from 'vue-router';
import Goals from './views/Goals/Goals.vue';
import Tasks from './views/Tasks/Tasks';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: Goals,
    },
    {
      path: '/tasks',
      component: Tasks,
    },
    {
      path: '/goals',
      component: Goals,
    },
    {
      path: '/goals/:goalId',
      component: Tasks,
      props: true,
    },
  ],
});
