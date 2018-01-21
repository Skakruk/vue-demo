// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import persistentState from 'vue-persistent-state'
import App from './App';
import router from './router';

Vue.config.productionTip = false;

Vue.use(persistentState, {
  user: {
    role: '',
    isLoggedIn: false,
  }
});

/* eslint-disable no-new */
window.vm = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
