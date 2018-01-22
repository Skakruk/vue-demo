<template>
  <div>
    <router-view/>
    <user-bar />
  </div>
</template>

<script>
import UserBar from './components/UserBar';

export default {
  name: 'App',
  components: {
    UserBar,
  },
};
</script>

<style>
  @import "../node_modules/todomvc-app-css/index.css";
</style>
