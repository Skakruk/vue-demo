<template>
  <div class="user-actions">
    <span v-if="user.isLoggedIn">Logged in as {{user.role}}</span>
    <span v-else>Welcome, user <code>undefined</code></span>

    <button v-if="user.isLoggedIn" @click="logout" class="logout">Logout</button>
    <router-link v-else :to="'/login'">Login</router-link>
  </div>
</template>

<script>
export default {
  name: 'user-bar',
  methods: {
    logout() {
      this.user = {
        isLoggedIn: false,
        role: '',
      };

      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
  .user-actions {
    display: flex;
    justify-content: space-between;
  }

  .logout {
    cursor: pointer;
  }
</style>
