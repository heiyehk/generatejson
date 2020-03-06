import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './i18n';
import * as filters from '@/filters/index';
import Button from '@/components/button.vue';
import Select from '@/components/select.vue';
import Model from '@/components/model.vue';

Vue.component('Button', Button);
Vue.component('Select', Select);
Vue.component('Model', Model);

Vue.config.productionTip = false;

Object.keys(filters).forEach((key: string) => {
  Vue.filter(key, filters[key]);
});

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App)
}).$mount('#app');
