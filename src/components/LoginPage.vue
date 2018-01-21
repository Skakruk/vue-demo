<template>
  <section class="todoapp">
    <header class="header">
      <h1>Login</h1>
    </header>
    <section class="main">
      <button class="btn" @click="loginAs('reader')">Login as reader</button>
      <button class="btn" @click="loginAs('editor')">Login as editor</button>
    </section>
  </section>
</template>

<script>
export default {
  name: 'login-page',
  methods: {
    loginAs(role) {
      this.user = {
        isLoggedIn: true,
        role,
      };

      this.$nextTick(() => {
        this.$router.push('/dashboard');
      });
    },
  },
};
</script>

<style scoped>
  .main {
    display: flex;
    justify-content: space-around;
    padding: 20px;
  }

  .btn {
    border: 1px solid #bfbfbf;
    border-radius: 3px;
    padding: 7px 10px;
    font-size: 16px;
    cursor: pointer;
  }
</style>
