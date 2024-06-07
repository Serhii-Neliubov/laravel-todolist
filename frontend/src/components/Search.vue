<template>
  <input v-model="search" placeholder="Search..." class="outline-none border-2 border-gray-300 max-w-[300px] mt-4 rounded py-1.5 px-3 text-[18px]"/>
</template>

<script lang="ts">
  import { useDebounce } from '@vueuse/core'
  import { ref, watch } from "vue";

  export default {
    name: 'Search',

    emits: ['search', 'restoreTodos'],

    setup(_, { emit }) {
      const search = ref('');
      const debouncedSearch = useDebounce(search, 500);

      watch(debouncedSearch, (newVal) => {
        emit('search', newVal);

        if(newVal === '') {
          emit('restoreTodos');
        }
      });

      return {
        search,
        debouncedSearch
      }
    }
  }
</script>