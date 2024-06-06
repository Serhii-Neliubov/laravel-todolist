export enum TODO_STATE {
  NEW = 'new',
  PROCESSING = 'processing',
  DONE = 'done'
}

export interface ITodo {
  _id?: string;
  title: string;
  description: string;
  state: TODO_STATE;
}