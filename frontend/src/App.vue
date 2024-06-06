<template>
  <div id="app">
    <kanban-board />
  </div>
</template>

<script lang="ts">
  import KanbanBoard from "@components/KanbanBoard.vue";

  export default {
    name: "App",
    components: { KanbanBoard },
  }
</script>
