<template>
  <div class="flex gap-2 p-[15px] flex-col">
    <div class="flex flex-col my-5 gap-3">
      <button class="bg-blue-500 py-3 max-w-[250px] text-white rounded hover:bg-blue-400 transition-all font-semibold">Create Todo</button>
    </div>
    <div class="flex gap-2">
      <div class="border-2 border-blue-300 h-[100vh] w-[100%] p-[15px] rounded">
        <div class="flex justify-between items-center flex-col">
          <div class="border-gray-300 border-b-[2px] w-[100%] pb-[10px]">
            <span class="text-2xl font-bold ml-[10px] uppercase">New</span>
          </div>
          <div v-for="todo in todos" class="flex w-full">
            <Todo :todo="todo" :updateTodo="updateTodo" :deleteTodo="deleteTodo" />
          </div>
        </div>
      </div>
      <div class="border-2 border-yellow-400 rounded h-[100vh] w-[100%] p-[15px]">
        <div class="border-gray-300 border-b-2 w-[100%] pb-[10px]">
          <span class="text-2xl font-bold uppercase">Processing</span>
        </div>
      </div>
      <div class="border-2 border-green-400 rounded h-[100vh] w-[100%] p-[15px]">
        <div class="border-gray-300 border-b-2 w-[100%] pb-[10px]">
          <span class="text-2xl font-bold uppercase">Done</span>
        </div>
      </div>
    </div>
  </div>
<!--  <todo-modal v-model:openModal="openModal" />-->

</template>

<script lang="ts">
import {onMounted, ref} from "vue";
import {ITodo} from "@models/ITodo.ts";

import {TodosService} from "@services/TodosService.ts";
import TodoModal from "@components/TodoModal.vue";
import Todo from "@components/Todo.vue";

export default {
    name: 'KanbanBoard',

    components: {
      Todo,
      TodoModal,
    },

    setup() {
      const todos = ref<ITodo[]>([]);
      const isModalVisible = ref(false);

      onMounted(async () => {
        try {
          const todosList: ITodo[] | undefined = await TodosService.getAllTodos();

          if (!todosList) {
            return console.error('No todos found');
          }

          todos.value = todosList;
        } catch (error) {
          console.error(error);
        }
      });

      const openModal = () => {
        isModalVisible.value = true;
      };

      const updateTodo = async (todo: ITodo) => {
        try {
          if (!todo.title || !todo.description) {
            return console.error('Title and description are required');
          }

          const updatedTodo = await TodosService.updateTodo(todo);
          const filteredTodos = todos.value.filter(t => t.id !== updatedTodo.id);
          todos.value = [...filteredTodos, updatedTodo];
        } catch (error) {
          console.error(error);
        }
      };

      const deleteTodo = async (todoId: string) => {
        try {
          const deletedTodo = await TodosService.deleteTodo(todoId);

          if (!deletedTodo) {
            return console.error('Todo not found');
          }

          todos.value = todos.value.filter(t => t.id !== todoId);
        } catch (error) {
          console.error(error);
        }
      };

      return {
        todos,
        isModalVisible,
        openModal,
        updateTodo,
        deleteTodo,
      };
    },
  };
</script>