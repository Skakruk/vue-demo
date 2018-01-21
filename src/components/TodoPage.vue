<template>
  <section class="todoapp">
    <add-task-form @add-item="addItem"/>
    <!-- This section should be hidden by default and shown when there are todos -->
    <task-list
      v-if="total > 0"
      :items="items"
      @toggle-complete="toggleCompleted"
      @delete-item="deleteItem"
      @toggle-all="toggleAll"
      @update-item="updateTask"
    />
    <!-- This footer should hidden by default and shown when there are todos -->
    <form-footer
      v-if="total > 0"
      :completed-count="completedCount"
      :total="total"
      @delete-all-completed="deleteAllCompleted"
    />
  </section>
</template>

<script>

import AddTaskForm from './AddTaskForm';
import FormFooter from './FormFooter';
import TaskList from './TaskList';

export default {
  name: 'todo-page',
  components: {
    AddTaskForm,
    FormFooter,
    TaskList,
  },
  data: () => ({
    items: [
      {
        id: 1,
        task: 'Create a TodoMVC template',
        isCompleted: true,
      },
      {
        id: 2,
        task: 'Rule the web',
        isCompleted: false,
      },
    ],
  }),

  computed: {
    // a computed getter
    completedCount() {
      // `this` points to the vm instance
      return this.items.filter(item => !item.isCompleted).length;
    },
    total() {
      return this.items.length;
    },
  },
  methods: {
    addItem(task) {
      const maxId = this.items.reduce((acc, item) => {
        if (item.id > acc) {
          return item.id;
        }

        return acc;
      }, 0);

      this.items.push({
        id: maxId + 1,
        isCompleted: false,
        task,
      });
    },

    deleteItem(deleteItemId) {
      this.items = this.items.filter(item => item.id !== deleteItemId);
    },

    deleteAllCompleted() {
      this.items = this.items.filter(item => !item.isCompleted);
    },

    toggleCompleted(toggledItemId) {
      this.items = this.items.map((item) => {
        if (item.id === toggledItemId) {
          return {
            ...item,
            isCompleted: !item.isCompleted,
          };
        }

        return item;
      });
    },

    toggleAll(markCompleted) {
      this.items = this.items.map(item => ({
        ...item,
        isCompleted: markCompleted,
      }));
    },

    updateTask(itemId, task) {
      this.items = this.items.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            task,
          };
        }

        return item;
      });
    },
  },
};
</script>

<style scoped>

</style>