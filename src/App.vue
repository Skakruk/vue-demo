<template>
  <section class="todoapp">
    <header class="header">
      <h1>todos</h1>
      <input class="new-todo" placeholder="What needs to be done?" autofocus>
    </header>
    <!-- This section should be hidden by default and shown when there are todos -->
    <section class="main">
      <input id="toggle-all" class="toggle-all" type="checkbox">
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">
        <!-- These are here just to show the structure of the list items -->
        <!-- List items should get the class `editing` when editing
        and `completed` when marked as completed -->
        <li v-for="item in items" v-bind:class="{ completed: item.isCompleted, editing: item.isEditing }">
          <div class="view">
            <input class="toggle" type="checkbox" v-bind:checked="item.isCompleted" />
            <label>{{ item.task }}</label>
            <button class="destroy"></button>
          </div>
          <input class="edit" v-bind:value="item.task">
        </li>
      </ul>
    </section>
    <!-- This footer should hidden by default and shown when there are todos -->
    <footer class="footer">
      <!-- This should be `0 items left` by default -->
      <span class="todo-count"><strong>{{ count }}</strong> item left</span>
      <!-- Remove this if you don't implement routing -->
      <ul class="filters">
        <li>
          <a class="selected" href="#/">All</a>
        </li>
        <li>
          <a href="#/active">Active</a>
        </li>
        <li>
          <a href="#/completed">Completed</a>
        </li>
      </ul>
      <!-- Hidden if no completed items are left ↓ -->
      <button class="clear-completed" v-if="count != items.length">Clear completed</button>
    </footer>
  </section>
</template>

<script>
export default {
  name: 'App',
  data: () => {
    return {
      items: [
        {
          task: 'Create a TodoMVC template',
          isCompleted: true,
        },
        {
          task: 'Rule the web',
          isCompleted: false,
        }
      ]
    };
  },

  computed: {
    // a computed getter
    count: function () {
      // `this` points to the vm instance
      return this.items.filter(item => !item.isCompleted).length;
    }
  }
};
</script>

<style>
  @import "../node_modules/todomvc-app-css/index.css";
</style>
