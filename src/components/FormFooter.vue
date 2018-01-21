<template>
  <footer class="footer">
    <!-- This should be `0 items left` by default -->
    <span class="todo-count"><strong>{{ completedCount }}</strong> item left</span>
    <!-- Remove this if you don't implement routing -->
    <ul class="filters">
      <li>
        <router-link :active-class="'selected'" :to="'/dashboard'" exact>All</router-link>
      </li>
      <li>
        <router-link :active-class="'selected'" :to="'/dashboard/active'">Active</router-link>
      </li>
      <li>
        <router-link :active-class="'selected'" :to="'/dashboard/completed'">Completed</router-link>
      </li>
    </ul>
    <!-- Hidden if no completed items are left ↓ -->
    <button
      class="clear-completed"
      v-if="canBeModified && completedCount !== total"
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
    'canBeModified',
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
