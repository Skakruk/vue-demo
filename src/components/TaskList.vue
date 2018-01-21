<template>
  <section class="main">
    <input id="toggle-all" class="toggle-all" type="checkbox">
    <label for="toggle-all">Mark all as complete</label>
    <ul class="todo-list">
      <!-- These are here just to show the structure of the list items -->
      <!-- List items should get the class `editing` when editing
      and `completed` when marked as completed -->
      <li
        v-for="item in items"
        :class="{ completed: item.isCompleted, editing: item.isEditing }"
        :key="item.id"
      >
        <div class="view">
          <input
            class="toggle"
            type="checkbox"
            :checked="item.isCompleted"
            @click="toggleIncrement(item.id)"
          />
          <label>{{ item.task }}</label>
          <button class="destroy" @click="deleteItem(item.id)"></button>
        </div>
        <input class="edit" :value="item.task">
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'task-list',
  props: ['items'],
  methods: {
    toggleIncrement(itemId) {
      this.$emit('toggle-complete', itemId);
    },
    deleteItem(itemId) {
      this.$emit('delete', itemId);
    },
  },
};
</script>

<style scoped>

</style>
