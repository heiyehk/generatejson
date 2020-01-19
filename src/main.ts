import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './i18n';
import Button from '@/components/button.vue';
import Select from '@/components/select.vue';

Vue.component('Button', Button);
Vue.component('Select', Select);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App)
}).$mount('#app');
