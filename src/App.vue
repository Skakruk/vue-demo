<template>
  <section class="todoapp">
    <add-task-form/>
    <!-- This section should be hidden by default and shown when there are todos -->
    <task-list :items="items" v-if="total > 0" @toggle-complete="toggleCompleted"/>
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
