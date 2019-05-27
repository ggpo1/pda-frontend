import Vue from 'vue';
import Router from 'vue-router';
import BoardsPage from './views/BoardsPage.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: BoardsPage,
    },
  ],
});
