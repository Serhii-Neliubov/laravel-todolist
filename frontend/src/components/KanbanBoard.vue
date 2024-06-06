<template>
  <div class="flex gap-2 p-[15px] flex-col">
    <h1 class="text-4xl">Kanban</h1>
    <div class="flex gap-2">
      <div class="border-2 border-amber-950 h-[100vh] w-[100%] p-[15px]">
        <div class="flex justify-between items-center">
          <span class="text-2xl font-bold">To Do</span>
          <button @click=addTask class="bg-amber-950 text-white px-3 py-1 rounded">Add Task</button>
        </div>
        <input placeholder="Task name" class="w-[100%] focus:outline-none" />
      </div>
      <div class="border-2 border-amber-950 h-[100vh] w-[100%] p-[15px]">
        <div class="flex justify-between items-center">
          <span class="text-2xl font-bold">Processing</span>
          <button class="bg-amber-950 text-white px-3 py-1 rounded">Add Task</button>
        </div>
        <input placeholder="Task name" class="w-[100%] focus:outline-none" />
      </div>
      <div class="border-2 border-amber-950 h-[100vh] w-[100%] p-[15px]">
        <div class="flex justify-between items-center">
          <span class="text-2xl font-bold">Done</span>
          <button class="bg-amber-950 text-white px-3 py-1 rounded">Add Task</button>
        </div>
        <input placeholder="Task name" class="w-[100%] focus:outline-none" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import axios from "axios";

  export default {
    name: "KanbanBoard",
    components: {},
    methods: {addTask},
    computed: {},
  };

  async function addTask() {
    axios.post("http://localhost:8000/todos", {
      title: "Task 1",
      description: "todo",
    });
  }
</script>