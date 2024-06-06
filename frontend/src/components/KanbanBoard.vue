<template>
  <div class="flex gap-2 p-[15px] flex-col">
    <h1 class="text-4xl">Kanban</h1>
    <div class="flex flex-col my-5 gap-3">
      <input v-model="title" placeholder="Task title" class="border-2 px-2 py-1 w-[100%] focus:outline-none" />
      <input v-model="description" placeholder="Task description" class="border-2 px-2 py-1 w-[100%] focus:outline-none" />
      <button @click="createTodo" class="bg-blue-500 py-1.5 w-[200px] text-white rounded hover:bg-blue-400 transition-all">Create Todo</button>
    </div>

    <div class="flex gap-2">
      <div class="border-2 border-amber-950 h-[100vh] w-[100%] p-[15px]">
        <div class="flex justify-between items-center flex-col">
          <div class="border-black border-b-2 w-[100%]">
            <span class="text-2xl font-bold">New</span>
          </div>
          <div class="flex flex-col">
            <div>
              icons
            </div>
            <span>Task Title</span>
            <p>Task Description</p>
          </div>
        </div>
      </div>
      <div class="border-2 border-amber-950 h-[100vh] w-[100%] p-[15px]">
        <div class="border-black border-b-2 w-[100%]">
          <span class="text-2xl font-bold">Processing</span>
        </div>
      </div>
      <div class="border-2 border-amber-950 h-[100vh] w-[100%] p-[15px]">
        <div class="border-black border-b-2 w-[100%]">
          <span class="text-2xl font-bold">Done</span>
        </div>
      </div>
    </div>
  </div>
  <todo-modal />

</template>

<script lang="ts">
  import {onMounted} from "vue";

  import {ITodo} from "@models/ITodo.ts";
  import {TodosService} from "@services/TodosService.ts";
  import TodoModal from "@components/TodoModal.vue";

  export default {
    name: "KanbanBoard",

    data: () => ({
      title: "",
      description: "",
      todos: [],
    }),

    components: {
      TodoModal,
    },

    methods: {createTodo},
    computed: {},
  };

  onMounted(() => {
    try{
      const todos = TodosService.getAllTodos();

      if(!todos) {
        return console.error("No todos found");
      }

      this.todos = todos;
    } catch (error) {
      console.error(error);
    }
  });

  async function createTodo() {
    try {
      const body = {
        title: this.title,
        description: this.description,
        state: "new",
      }

      const todo = await TodosService.createTodo(body);
      this.todos = [...this.todos, todo];
    } catch (error) {
      console.error(error);
    }
  }

  async function updateTodo(todo: ITodo) {
    try {
      if(!todo.title || !todo.description) {
        return console.error("Title and description are required");
      }

      const updatedTodo = await TodosService.updateTodo(todo);
      const filteredTodos = this.todos.filter(todo => todo.id !== updatedTodo.id);
      this.todos = [...filteredTodos, updatedTodo];
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteTodo(todoId: string) {
    try {
      const deletedTodo = await TodosService.deleteTodo(todoId);

      if(!deletedTodo) {
        return console.error("Todo not found");
      }

      const filteredTodos = this.todos.filter(todo => todo.id !== todoId);
      this.todos = [...filteredTodos, deletedTodo];
    } catch (error) {
      console.error(error);
    }
  }
</script>