<template>
  <div class="flex flex-col w-full border-2 mt-[10px] p-[15px] rounded">
    <div class="flex items-center justify-between mb-[10px] gap-4">
      <span class="text-2xl font-semibold">{{ todo.title }}</span>
      <div class="flex items-center gap-2">
        <button @click="update" class="bg-blue-500 p-[10px] rounded hover:bg-blue-400 transition-all">
          <img src="@assets/pen.svg" alt="update todo icon" class="max-w-[20px]"/>
        </button>
        <button @click="deleteTodo(this.todo._id)" class="bg-red-500 p-[10px] rounded hover:bg-red-400 transition-all">
          <img src="@assets/trash.svg" alt="delete todo icon" class="max-w-[20px]"/>
        </button>
      </div>
    </div>
    <p class="text-xl max-w-fit">{{ todo.description }}</p>
  </div>
</template>

<script lang="ts">
  export default {
    name: "Todo",

    methods: {
      update() {
        this.updateTodo();
      },
    },

    data(vm) {
      return {
        todo: vm.todo,
      }
    },

    props: {
      todo: {
        type: Object,
        required: true,
      },
      updateTodo: {
        type: Function,
        required: true,
      },
      deleteTodo: {
        type: Function,
        required: true,
      },
    }
  };
</script>