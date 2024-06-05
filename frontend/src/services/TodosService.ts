import axios from 'axios';

const API_URL = import.meta.env.API_URL;

enum todoState {
  todo = 'todo',
  inProgress = 'inProgress',
  done = 'done'
}

interface Todo {
  id?: string;
  title: string;
  description: string;
  state: todoState;
}

export class TodosService {
  public static async getTodos(): Promise<Todo[] | undefined> {
    try {
      const { data } = await axios.get(`${API_URL}/todos`);

      return data;
    } catch (error) {
      console.log('Error getting todos');
    }
  }

  public static async addTodo(todo: Todo): Promise<Todo | undefined> {
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

  public static async updateTodo(todo: Todo): Promise<Todo | undefined> {
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

  public static async deleteTodo(id: string): Promise<Todo | undefined> {
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