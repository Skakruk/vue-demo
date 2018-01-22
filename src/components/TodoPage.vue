<template>
  <section class="todoapp">
    <add-task-form @add-item="addItem"/>
    <!-- This section should be hidden by default and shown when there are todos -->
    <task-list
      v-if="total > 0"
      :items="filteredItems"
      :can-be-modified="user.role === 'editor'"
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
      :can-be-modified="user.role === 'editor'"
      @delete-all-completed="deleteAllCompleted"
    />
  </section>
</template>

<script>
import axios from 'axios';

import AddTaskForm from './AddTaskForm';
import FormFooter from './FormFooter';
import TaskList from './TaskList';

const API_ENDPOINT = 'https://floating-fjord-98973.herokuapp.com/todo';

export default {
  name: 'todo-page',
  props: ['status'],
  components: {
    AddTaskForm,
    FormFooter,
    TaskList,
  },
  data() {
    return {
      items: [],
    };
  },
  created() {
    axios.get(API_ENDPOINT)
      .then((response) => {
        this.items = response.data;
      })
      .catch((e) => {
        this.errors.push(e);
      });
  },
  computed: {
    // a computed getter
    completedCount() {
      // `this` points to the vm instance
      return this.items.filter(item => !item.isCompleted).length;
    },
    total() {
      return this.items.length;
    },
    filteredItems() {
      return this.items.filter((item) => {
        switch (this.status) {
          case 'active':
            return !item.isCompleted;
          case 'completed':
            return item.isCompleted;
          default:
            return true;
        }
      });
    },
  },
  methods: {
    addItem(task) {
      axios.post(API_ENDPOINT, {
        task
      })
        .then((response) => {
          this.items.push(response.data);
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },

    deleteItem(deleteItemId) {
      axios.delete(`${API_ENDPOINT}/${deleteItemId}`)
        .then(() => {
          this.items = this.items.filter(item => item.id !== deleteItemId);
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },

    deleteAllCompleted() {
      const requests = this.items.filter(item => item.isCompleted).map((item) => {
        return axios.delete(`${API_ENDPOINT}/${item.id}`)
      });

      Promise.all(requests)
        .then(() => {
          this.items = this.items.filter(item => !item.isCompleted);
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },

    toggleCompleted(toggledItemId) {
      const editItem = this.items.find(item => item.id === toggledItemId);

      axios.put(`${API_ENDPOINT}/${toggledItemId}`, {
        isCompleted: !editItem.isCompleted,
      })
        .then((response) => {
          this.items = this.items.map((item) => {
            if (item.id === toggledItemId) {
              return response.data;
            }
            return item;
          });
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },

    toggleAll(markCompleted) {
      const requests = this.items.map(item => {
        return axios.put(`${API_ENDPOINT}/${item.id}`, {
          isCompleted: markCompleted,
        });
      });

      Promise.all(requests)
        .then(() => {
          this.items = this.items.map(item => ({
            ...item,
            isCompleted: markCompleted,
          }));
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },

    updateTask(itemId, task) {
      axios.put(`${API_ENDPOINT}/${itemId}`, {
        task,
      })
        .then((response) => {
          this.items = this.items.map((item) => {
            if (item.id === itemId) {
              return response.data;
            }
            return item;
          });
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },
};
</script>

<style scoped>

</style>
