import { init, toDo } from "./type";

interface addTodo {
  type: "ADD_TO_DO";
  payload: string;
}
interface edit {
  type: "EDIT";
  payload: { id: number; editMsg: string };
}

interface deleteTodo {
  type: "DELETE";
  payload: number;
}

export type Action = addTodo | edit | deleteTodo;

export function reducer(state: init, action: Action) {
  switch (action.type) {
    case "ADD_TO_DO":
      const newTodo: toDo = {
        id: Date.now() + Math.random(),
        action: action.payload,
      };
      return { ...state, toDoList: [...state.toDoList, newTodo] };
    case "EDIT":
      const newArray = state.toDoList.map((todo) => {
        if (todo.id === action.payload.id) {
          todo.action = action.payload.editMsg;
        }
        return todo;
      });
      return { ...state, toDoList: [...newArray] };
    case "DELETE":
      return {
        ...state,
        toDoList: state.toDoList.filter((toDo) => toDo.id !== action.payload),
      };
    default:
      return state;
  }
}
