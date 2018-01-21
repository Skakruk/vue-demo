<template>
  <header class="header">
    <h1>todos</h1>
    <input
      v-if="user.role === 'editor'"
      class="new-todo"
      v-model="newTask"
      placeholder="What needs to be done?"
      autofocus
      @keyup.enter="submit"
    />
  </header>
</template>

<script>
export default {
  name: 'add-task-form',
  data: () => ({
    newTask: '',
  }),
  methods: {
    submit() {
      this.$emit('add-item', this.newTask);
      this.newTask = '';
    },
  },
};
</script>

<style scoped>

</style>
