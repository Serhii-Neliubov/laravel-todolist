enum todoState {
  todo = 'todo',
  inProgress = 'inProgress',
  done = 'done'
}

export interface ITodo {
  id?: string;
  title: string;
  description: string;
  state: todoState;
}