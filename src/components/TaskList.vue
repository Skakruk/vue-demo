<template>
  <section class="main">
    <input
      v-if="canBeModified"
      id="toggle-all"
      class="toggle-all"
      type="checkbox"
      v-model="shouldToggleAll"
      @change="toggleAll"
    />
    <label for="toggle-all" v-if="canBeModified">Mark all as complete</label>
    <ul class="todo-list">
      <!-- These are here just to show the structure of the list items -->
      <!-- List items should get the class `editing` when editing
      and `completed` when marked as completed -->
      <li
        v-for="item in items"
        :class="{ completed: item.isCompleted, editing: item.id === editingItemId }"
        :key="item.id"
      >
        <div class="view">
          <input
            class="toggle"
            type="checkbox"
            :checked="item.isCompleted"
            @click="toggleIncrement(item.id)"
            :disabled="!canBeModified"
          />
          <label @dblclick="canBeModified && enableEditing(item.id)" >{{ item.task }}</label>
          <button v-if="canBeModified" class="destroy" @click="deleteItem(item.id)"></button>
        </div>
        <input
          v-if="item.id === editingItemId"
          class="edit"
          :value="item.task"
          @blur="submitChange(item.id, $event.target.value)"
          @keyup.enter="disableEditing"
          ref="edit">
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'task-list',
  props: ['items', 'canBeModified'],
  data: () => ({
    shouldToggleAll: false,
    editingItemId: null,
  }),
  methods: {
    toggleIncrement(itemId) {
      this.$emit('toggle-complete', itemId);
    },
    deleteItem(itemId) {
      this.$emit('delete-item', itemId);
    },
    toggleAll() {
      this.$emit('toggle-all', this.shouldToggleAll);
    },
    enableEditing(itemId) {
      this.editingItemId = itemId;
      this.$nextTick(() => {
        this.$refs.edit[0].focus();
      });
    },
    disableEditing() {
      this.editingItemId = null;
    },
    submitChange(itemId, task) {
      this.$emit('update-item', itemId, task);
      this.editingItemId = null;
    },
  },
};
</script>

<style scoped>

</style>
