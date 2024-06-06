<template>
  <div class="flex flex-col lg:flex-col p-4 lg:p-6 gap-4">
    <div class="my-5">
      <button @click="openModal" class="mr-8 bg-blue-500 py-3 w-full max-w-[250px] text-white rounded hover:bg-blue-400 transition-all font-semibold">
        Create Todo
      </button>
      {{ modalTodo }}
      <span v-if="loading" class="text-2xl">Loading...</span>
    </div>
    <div class="flex flex-col lg:flex-row gap-4 w-full">
      <div class="border-2 border-blue-300 flex-1 h-auto lg:h-[100vh] p-4 rounded">
        <div class="flex flex-col items-center justify-between">
          <div class="border-gray-300 border-b-2 w-full pb-3">
            <span class="text-2xl font-bold uppercase">
              New
            </span>
          </div>
          <div
              v-for="todo in newTodos"
              :key="todo._id"
              class="flex flex-col w-full"
          >
            <Todo @edit="onEditTodo" @delete="onDeleteTodo" :todo="todo" />
          </div>
        </div>
      </div>
      <div class="border-2 border-yellow-400 flex-1 h-auto lg:h-[100vh] p-4 rounded">
        <div class="border-gray-300 border-b-2 w-full pb-3">
          <span class="text-2xl font-bold uppercase">
            Processing
          </span>
        </div>
        <div
            v-for="todo in processingTodos"
            :key="todo._id"
            class="flex flex-col w-full"
        >
          <Todo @edit="onEditTodo" @delete="onDeleteTodo" :todo="todo" />
        </div>
      </div>
      <div class="border-2 border-green-400 flex-1 h-auto lg:h-[100vh] p-4 rounded">
        <div class="border-gray-300 border-b-2 w-full pb-3">
          <span class="text-2xl font-bold uppercase">
            Done
          </span>
        </div>
        <div
            v-for="todo in doneTodos"
            :key="todo._id"
            class="flex flex-col w-full"
        >
          <Todo @edit="onEditTodo" @delete="onDeleteTodo" :todo="todo" />
        </div>
      </div>
    </div>
  </div>

  <todo-modal
      v-if="isModalVisible"
      v-model="modalTodo"
      @submit="onModalSubmit"
      @close="onModalClose"
  />
</template>

<script lang="ts">
  import {onMounted, reactive, ref} from "vue";
  import {ITodo, TODO_STATE} from "@models/ITodo.ts";

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
        const todos = reactive<ITodo[]>([]);
        const modalTodo = ref<ITodo>({
          title: '',
          description: '',
          state: TODO_STATE.NEW,
        });

        const isModalVisible = ref(false);
        const loading = ref(false);

        async function getAllTodos() {
          try {
            loading.value = true;
            const todosList: ITodo[] | undefined = await TodosService.getAllTodos();

            if (!todosList) {
              return console.error('No todos found');
            }

            Object.assign(todos, todosList);
          } catch (error) {
            console.error(error);
          } finally {
            loading.value = false;
          }
        }

        onMounted(async () => {
          await getAllTodos();
        });

        return {
          todos,
          isModalVisible,
          modalTodo,
          loading,
        };
      },

      computed: {
        newTodos() {
          return this.todos.filter(t => t.state === TODO_STATE.NEW);
        },
        processingTodos() {
          return this.todos.filter(t => t.state === TODO_STATE.PROCESSING);
        },
        doneTodos() {
          return this.todos.filter(t => t.state === TODO_STATE.DONE);
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

        onModalSubmit() {
          if(this.modalTodo._id) {
            this.updateTodo(this.modalTodo._id);
          } else {
            this.createTodo(this.modalTodo);
          }
        },

        async createTodo(todo: ITodo) {
          try {
            this.loading = true;

            if (!todo.title || !todo.description) {
              return console.error('Title and description are required');
            }

            const createdTodo: ITodo | undefined = await TodosService.createTodo(todo);

            if (!createdTodo?._id) {
              return console.error('Problem creating todo');
            }

            this.todos.push(createdTodo);
            this.isModalVisible = false;
            Object.assign(this.modalTodo, {
              title: '',
              description: '',
              state: TODO_STATE.NEW,
            });
          } catch (error) {
            console.error(error);
          } finally {
            this.loading = false;
          }
        },

        async updateTodo(todoId: string) {
          try {
            this.loading = true;

            if (!todoId) {
              return console.error('Todo id not found');
            }

            const updatedTodo: ITodo | undefined = await TodosService.updateTodo(this.modalTodo);

            if (!updatedTodo?._id) {
              return console.error('Todo not found');
            }

            this.todos.splice(this.todos.findIndex(t => t._id === updatedTodo._id), 1, updatedTodo);
          } catch (error) {
            console.error(error);
          } finally {
            this.loading = false;
          }
        },

        onEditTodo(todoId: string) {
          const foundTodo = this.todos.find(t => t._id === todoId);

          if (!foundTodo) {
            return console.error('Todo not found');
          }

          Object.assign(this.modalTodo, foundTodo);

          this.isModalVisible = true;
        },

        async onDeleteTodo(todoId: string) {
          try {
            this.loading = true;
            const deletedTodo = await TodosService.deleteTodo(todoId);

            if (!deletedTodo) {
              return console.error('Todo not found');
            }

            this.todos.splice(this.todos.findIndex(t => t._id === todoId), 1);
          } catch (error) {
            console.error(error);
          } finally {
            this.loading = false;
          }
        },
      },
    };
</script>