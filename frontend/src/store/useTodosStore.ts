import { defineStore } from 'pinia';
import { ITodo } from '@models/ITodo.ts';
import { TodosService } from '@services/TodosService.ts';

export const useTodosStore = defineStore('todos', {
  state() {
    return {
      todos: [] as ITodo[],
    }
  },

  actions: {
    async fetchTodos() {
      const todos = await TodosService.getAllTodos();
      if (todos) {
        this.todos = todos;
      }
    },

    async add(todo: ITodo) {
      const newTodo = await TodosService.createTodo(todo);
      if (newTodo) {
        this.todos.push(newTodo);
      }
    },

    async update(todo: ITodo) {
      const updatedTodo = await TodosService.updateTodo(todo);
      if (updatedTodo) {
        const index = this.todos.findIndex(t => t._id === updatedTodo._id);
        if (index !== -1) {
          this.todos[index] = updatedTodo;
        }
      }
    },
    async remove(id: string) {
      const deletedTodo = await TodosService.deleteTodo(id);

      if (deletedTodo) {
        this.todos = this.todos.filter(t => t._id !== id);
      }
    },
  },

  getters: {
    getTodos(): ITodo[] {
      return this.todos;
    },
  }
});
