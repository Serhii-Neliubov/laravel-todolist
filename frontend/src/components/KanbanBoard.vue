<template>
  <div class="flex flex-col lg:flex-col p-4 lg:p-6 gap-4">
    <div class="my-5 flex flex-col">
      <button @click="openModal" class="mr-8 bg-blue-500 py-3 w-full max-w-[250px] text-white rounded hover:bg-blue-400 transition-all font-semibold">
        Create Todo
      </button>
      <Search @restoreTodos="getAllTodos" @search="searchHandler"/>
    </div>
    <div class="flex flex-col lg:flex-row gap-4 w-full">
      <div class="border-2 border-blue-300 flex-1 h-auto lg:h-[100vh] p-4 rounded">
        <div class="border-gray-300 border-b-2 w-full pb-3">
          <span class="text-2xl font-bold uppercase">
              New
            </span>
        </div>
        <draggable
              class="w-full h-full"
              :list="newTodos"
              group="todos"
              @change="changeTodoState($event, TODO_STATE.NEW)"
              itemKey="_id"
          >
            <template #item="{ element:todo }">
              <div class="flex flex-col w-full">
                <Todo @edit="onEditTodo" @delete="onDeleteTodo" :todo="todo" />
              </div>
            </template>
          </draggable>
      </div>
      <div class="border-2 border-yellow-400 flex-1 h-auto lg:h-[100vh] p-4 rounded">
        <div class="border-gray-300 border-b-2 w-full pb-3">
          <span class="text-2xl font-bold uppercase">
            Processing
          </span>
        </div>
        <draggable
            class="w-full h-full"
            :list="processingTodos"
            group="todos"
            @change="changeTodoState($event, TODO_STATE.PROCESSING)"
            itemKey="_id"
        >
          <template #item="{ element:todo }">
            <div class="flex flex-col w-full">
              <Todo @edit="onEditTodo" @delete="onDeleteTodo" :todo="todo" />
            </div>
          </template>
        </draggable>
      </div>
      <div class="border-2 border-green-400 flex-1 h-auto lg:h-[100vh] p-4 rounded">
        <div class="border-gray-300 border-b-2 w-full pb-3">
          <span class="text-2xl font-bold uppercase">
            Done
          </span>
        </div>
        <draggable
            class="w-full h-full"
            :list="doneTodos"
            group="todos"
            @change="changeTodoState($event, TODO_STATE.DONE)"
            itemKey="_id"
        >
          <template #item="{ element:todo }">
            <div class="flex flex-col w-full">
              <Todo @edit="onEditTodo" @delete="onDeleteTodo" :todo="todo" />
            </div>
          </template>
        </draggable>
      </div>
    </div>
  </div>

  <todo-modal
      v-if="isModalVisible"
      v-model="modalTodo"
      @submit="onModalSubmit"
      @close="onModalClose"
  />

  <loader v-if="loading" />
</template>

<script lang="ts">
import draggable from 'vuedraggable';

import { useTodosStore } from '@store/useTodosStore.ts';
import { ITodo, TODO_STATE } from '@models/ITodo';

import Todo from '@components/Todo.vue';
import TodoModal from '@components/TodoModal.vue';
import Loader from "@components/Loader.vue";
import Search from "@components/Search.vue";

export default {
  name: 'KanbanBoard',

  components: {
    Search,
    Loader,
    Todo,
    TodoModal,
    draggable,
  },

  data() {
    return {
      isModalVisible: false,

      modalTodo: {
        title: '',
        description: '',
        state: TODO_STATE.NEW,
      } as ITodo,

      loading: false,
    };
  },

  setup() {
    const todosStore = useTodosStore();

    return {
      todosStore,
    };
  },

  mounted() {
    this.getAllTodos();
  },

  computed: {
    todos() {
      return this.todosStore.todos;
    },
    newTodos() {
      return this.todos.filter(t => t.state === TODO_STATE.NEW);
    },
    processingTodos() {
      return this.todos.filter(t => t.state === TODO_STATE.PROCESSING);
    },
    doneTodos() {
      return this.todos.filter(t => t.state === TODO_STATE.DONE);
    },
    TODO_STATE() {
      return TODO_STATE;
    },
  },

  methods: {
    openModal() {
      this.isModalVisible = true;
    },

    onModalClose() {
      this.isModalVisible = false;

      Object.assign(this.modalTodo, {
        _id: undefined,
        title: '',
        description: '',
        state: TODO_STATE.NEW,
      });
    },

    onEditTodo(todoId: string) {
      const foundTodo = this.todos.find(t => t._id === todoId);

      if (!foundTodo) {
        return console.error('Todo not found');
      }

      Object.assign(this.modalTodo, foundTodo);
      this.isModalVisible = true;
    },

    async getAllTodos() {
      try {
        this.loading = true;

        await this.todosStore.fetchTodos();
      } finally {
        this.loading = false;
      }
    },

    async onModalSubmit() {
      try {
        if(!this.modalTodo.title) {
          return alert('Title is required');
        }

        this.loading = true;

        if (this.modalTodo._id) {
          await this.todosStore.update(this.modalTodo);
        } else {
          await this.todosStore.add(this.modalTodo);
        }

        Object.assign(this.modalTodo, {
          title: '',
          description: '',
          state: TODO_STATE.NEW,
        });

        this.isModalVisible = false;
      } finally {
        this.loading = false;
      }
    },

    async changeTodoState(event: any, newState: TODO_STATE) {
      if (event.added) {
        const addedTodo = event.added.element;
        const foundTodo = this.todos.find(t => t._id === addedTodo._id);

        if (!foundTodo) {
          return console.error('Todo not found');
        }

        foundTodo.state = newState;
        await this.todosStore.update(foundTodo);
      }
    },

    async onDeleteTodo(todoId: string) {
      try {
        this.loading = true;

        await this.todosStore.remove(todoId);
      } finally {
        this.loading = false;
      }
    },

    async searchHandler(searchValue: string) {
      try {
        this.loading = true;

        await this.todosStore.search(searchValue);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
