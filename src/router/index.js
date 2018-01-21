import Vue from 'vue';
import Router from 'vue-router';
import TodoPage from '../components/TodoPage';
import LoginPage from '../components/LoginPage';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/dashboard/:status?',
      name: 'TodoPage',
      component: TodoPage,
      props: true,
      beforeEnter: (to, from, next) => {
        const { isLoggedIn } = this.a.app.$store.get('user');

        if (isLoggedIn && isLoggedIn && isLoggedIn !== 'false') {
          next();
        } else {
          next('/login');
        }
      },
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage,
    },
    {
      path: '/',
      redirect: '/dashboard',
    },
  ],
});
