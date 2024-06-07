<template>
  <div v-if="todoModel">
    <div @click="closeModal" class="bg-black fixed top-0 left-0 w-[100%] h-[100%] bg-opacity-80" />

    <div class="w-[650px] border-2 border-blue-400 h-[300px] bg-white rounded top-[50%] absolute left-[50%] translate-x-[-50%] translate-y-[-50%]">
      <div class="p-[35px] flex flex-col h-full justify-between">
        <div class="flex flex-col items-start mb-[15px] gap-2">
          <input v-model="todoModel.title" placeholder='Title' class="border-2 w-full rounded text-xl px-3 py-4 outline-none" />
          <input v-model="todoModel.description" placeholder='Description' class="border-2 w-full text-xl rounded px-3 py-4 outline-none" />
        </div>
        <div class="flex gap-2 justify-end">
          <button @click="onSubmit" class="rounded px-8 bg-blue-500 hover:bg-blue-400 transition-all text-white py-2">
            {{ todoModel._id ? 'Update' : 'Create' }}
          </button>
          <button @click="closeModal" class="z-10 absolute top-[-5px] right-[5px] text-red-400 text-4xl">&times;</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineModel} from "vue";
  import {ITodo} from "@models/ITodo.ts";

  const todoModel = defineModel<ITodo>();
  const emit = defineEmits(['close', 'submit']);

  const closeModal = () => {
    emit('close');
  }

  const onSubmit = () => {
    emit('submit');
  }
</script>