import axios from 'axios';
import {ITodo} from "../models/ITodo.ts";

const API_URL = import.meta.env.API_URL;

export class TodosService {
  public static async getAllTodos(): Promise<ITodo[] | undefined> {
    try {
      const { data } = await axios.get(`${API_URL}/todos`);

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
      const { data } = await axios.get(`${API_URL}/todos/${id}`);

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
      const { data } = await axios.post(`${API_URL}/todos`, todo);

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
      const { data } = await axios.put(`${API_URL}/todos/${todo.id}`, todo);

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
      const { data } = await axios.delete(`${API_URL}/todos/${id}`);

      return data;
    } catch (error){
      console.log(`Error deleting todo: ${id}`);
    }
  }
}