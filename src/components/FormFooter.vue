<template>
  <footer class="footer">
    <!-- This should be `0 items left` by default -->
    <span class="todo-count"><strong>{{ completedCount }}</strong> item left</span>
    <!-- Remove this if you don't implement routing -->
    <ul class="filters">
      <li>
        <a :class="{ selected: !activeStatus }" href="#/">All</a>
      </li>
      <li>
        <a :class="{ selected: activeStatus === 'active' }" href="#/active">Active</a>
      </li>
      <li>
        <a :class="{ selected: activeStatus === 'completed' }" href="#/completed">Completed</a>
      </li>
    </ul>
    <!-- Hidden if no completed items are left ↓ -->
    <button
      class="clear-completed"
      v-if="completedCount != total"
      @click="deleteAllCompleted"
    >
      Clear completed
    </button>
  </footer>
</template>

<script>
export default {
  name: 'form-footer',
  props: [
    'completedCount',
    'total',
    'activeStatus',
  ],
  methods: {
    deleteAllCompleted() {
      this.$emit('delete-all-completed');
    },
  },
};
</script>

<style scoped>

</style>
