import { v1 } from "uuid";
import { FilterValueType, TodoListType } from "../App";

export type RemoveTodolistType = {
  type: "REMOVED-TODOLIST";
  id: number | string;
};

export type AddTodolistType = {
  todolistId: string;
  type: "ADD-TODOLIST";
  title: string;
};

export type ChangeTitleTodolistType = {
  type: "CHANGE-TODOLIST-TITLE";
  id: number | string;
  title: string;
};

export type ChangeFilterTodolistType = {
  type: "CHANGE-TODOLIST-FILTER";
  id: number | string;
  filter: FilterValueType;
};

type ActionsTypes =
  | RemoveTodolistType
  | AddTodolistType
  | ChangeTitleTodolistType
  | ChangeFilterTodolistType;

export const todolistReducer = (
  state: Array<TodoListType>,
  action: ActionsTypes
): Array<TodoListType> => {
  debugger;
  switch (action.type) {
    case "REMOVED-TODOLIST": {
      return state.filter((t1) => t1.id !== action.id);
    }
    case "ADD-TODOLIST": {
      return [
        { id: action.todolistId, title: action.title, filter: "all" },
        ...state,
      ];
    }
    case "CHANGE-TODOLIST-TITLE": {
      let todoList = state.find((tl) => tl.id === action.id);
      if (todoList) {
        todoList.title = action.title;
      }
      return [...state];
    }
    case "CHANGE-TODOLIST-FILTER": {
      let todoList = state.find((tl) => tl.id === action.id);
      if (todoList) {
        todoList.filter = action.filter;
      }
      return [...state];
    }
    default:
      throw new Error("I dont know this action type");
  }
};

export const RemoveTodolistAC = (id: string): RemoveTodolistType => {
  return { type: "REMOVED-TODOLIST", id };
};

export const AddTodolistAC = (title: string): AddTodolistType => {
  return { type: "ADD-TODOLIST", title, todolistId: v1() };
};

export const ChangeTitleTodolistAC = (
  id: string,
  title: string
): ChangeTitleTodolistType => {
  return { type: "CHANGE-TODOLIST-TITLE", title, id };
};

export const ChangeFilterTodolistAC = (
  id: string,
  filter: FilterValueType
): ChangeFilterTodolistType => {
  return { type: "CHANGE-TODOLIST-FILTER", filter, id };
};
