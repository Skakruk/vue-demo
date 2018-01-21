<template>
  <section class="todoapp">
    <add-task-form @add="addItem"/>
    <!-- This section should be hidden by default and shown when there are todos -->
    <task-list
      v-if="total > 0"
      :items="items"
      @toggle-complete="toggleCompleted"
      @delete="deleteItem"
    />
    <!-- This footer should hidden by default and shown when there are todos -->
    <form-footer :completed-count="completedCount" :total="total" v-if="total > 0"/>
  </section>
</template>

<script>
import AddTaskForm from './components/AddTaskForm';
import FormFooter from './components/FormFooter';
import TaskList from './components/TaskList';

export default {
  name: 'App',
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
  },
};
</script>

<style>
  @import "../node_modules/todomvc-app-css/index.css";
</style>
