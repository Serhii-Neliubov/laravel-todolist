import {ITodo} from "../models/ITodo.ts";
import $api from "@/utils/interceptors.ts";

export class TodosService {
  public static async getAllTodos(): Promise<ITodo[] | undefined> {
    try {
      const { data } = await $api.get('/todos');

      return data;
    } catch (error) {
      console.log('Error getting todos');
    }
  }

  public static async getTodoById(id: string): Promise<ITodo | undefined> {
    if(!id) {
      return;
    }

    try {
      const { data } = await $api.get(`/todos/${id}`);

      return data;
    } catch (error){
      console.log(`Error getting todo: ${id}`);
    }
  }

  public static async createTodo(todo: ITodo): Promise<ITodo | undefined> {
    if(!todo){
      return;
    }

    try {
      const { data } = await $api.post('/todos', {
        title: todo.title,
        description: todo.description,
      });

      return data;
    } catch (error){
      console.log('Error adding todo');
    }
  }

  public static async updateTodo(todo: ITodo): Promise<ITodo | undefined> {
    if(!todo?.id) {
      return;
    }

    try {
      const { data } = await $api.put(`/todos/${todo.id}`, todo);

      return data;
    } catch (error){
      console.log('Error editing todo');
    }
  }

  public static async deleteTodo(id: string): Promise<ITodo | undefined> {
    if(!id) {
      return;
    }

    try {
      const { data } = await $api.delete(`/todos/${id}`);

      return data;
    } catch (error){
      console.log(`Error deleting todo: ${id}`);
    }
  }
}