import { init, toDo } from "./type";
import { DropResult } from "react-beautiful-dnd";

interface addTodo {
  type: "ADD_TO_DO";
  payload: string;
}
interface edit {
  type: "EDIT";
  payload: { id: number; editMsg: string; groupName: string };
}

interface deleteTodo {
  type: "DELETE";
  payload: { id: number; groupName: string };
}

interface chnagePosition {
  type: "CHANGE_POSITION";
  payload: DropResult;
}

interface toggleComplete {
  type: "TOGGLE_COMPLETE";
  payload: { id: number; groupName: string };
}

export type Action =
  | addTodo
  | edit
  | deleteTodo
  | chnagePosition
  | toggleComplete;

export function reducer(state: init, action: Action) {
  console.log(action.type);
  switch (action.type) {
    case "ADD_TO_DO":
      const newTodo: toDo = {
        id: Date.now() + Math.random(),
        action: action.payload,
        isComplete: false,
      };
      return {
        ...state,
        toDoList: [...state.toDoList, newTodo],
      };
    case "EDIT":
      var { groupName, id, editMsg } = action.payload;
      const newArray = state[groupName].map((todo) => {
        if (todo.id === id) {
          todo.action = editMsg;
        }
        return todo;
      });
      return { ...state, [groupName]: [...newArray] };
    case "DELETE":
      var { groupName, id } = action.payload;
      return {
        ...state,
        [groupName]: state[groupName].filter((toDo) => toDo.id !== id),
      };
    case "CHANGE_POSITION":
      if (action.payload.destination) {
        const { destination, source } = action.payload;
        const changeElement = state[source.droppableId].splice(source.index, 1);
        state[destination.droppableId].splice(
          destination.index,
          0,
          changeElement[0]
        );
        return {
          ...state,
          toDoList: [...state.toDoList],
          completeToDo: [...state.completeToDo],
        };
      }
      return state;

    case "TOGGLE_COMPLETE":
      var { groupName, id } = action.payload;
      const Array = state[groupName].map((toDo) => {
        const newtoDo =
          toDo.id === id ? { ...toDo, isComplete: !toDo.isComplete } : toDo;
        return newtoDo;
      });
      return { ...state, [groupName]: Array };
    default:
      return state;
  }
}
