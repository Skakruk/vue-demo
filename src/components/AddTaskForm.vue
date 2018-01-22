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
      name="new-todo"
      v-validate.initial="'required|min:3'"
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
      if (!this.errors.has('new-todo')) {
        this.$emit('add-item', this.newTask);
        this.newTask = '';
      } else {
        alert(this.errors.first('new-todo')); // eslint-disable-line no-alert
      }
    },
  },
};
</script>

<style scoped>

</style>
