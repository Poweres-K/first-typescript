export interface toDo {
  id: number;
  action: string;
  isComplete: boolean;
}

export interface init {
  [k: string]: toDo[];
  toDoList: toDo[];
  completeToDo: toDo[];
}
