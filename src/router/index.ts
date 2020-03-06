import Vue from 'vue';
import VueRouter from 'vue-router';
import index from '../views/main/index.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'index',
    component: index
  },
  {
    path: '/:typeFullScreen/*',
    name: 'index',
    component: index
  },
  {
    path: '/*',
    name: 'index',
    component: index
  }
];

const router = new VueRouter({
  routes
});

export default router;
