<template>
  <div class="bg-black fixed top-0 left-0 w-[100%] h-[100%] bg-opacity-80">
    <div class="w-[350px] border-2 border-blue-400 bg-white rounded top-[50%] absolute left-[50%] translate-x-[-50%] translate-y-[-50%]">
      <div class="p-[15px]">
        <div class="flex flex-col items-start mb-[15px] gap-2">
          <input placeholder='Title' class="border-2 w-full rounded px-3 py-2 outline-none" />
          <input placeholder='Description' class="border-2 w-full rounded px-3 py-2 outline-none" />
        </div>
        <div class="flex gap-2 justify-end">
          <button class="rounded px-4 bg-blue-500 hover:bg-blue-400 transition-all text-white py-2">Create</button>
          <button class="bg-red-500 rounded px-4 py-2 text-white hover:bg-red-400 transition-all">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: "TodoModal",

    data: () => ({
    }),
  };


</script>