import { v1 } from "uuid";
import { FilterValueType, TasksStateType, TodoListType } from "../App";
import { TaskType } from "../TodoList";
import {
  AddTodolistType,
  RemoveTodolistType,
  todoListId1,
  todoListId2,
} from "./todolist-reducer";

export type RemoveActionType = {
  type: "REMOVE-TASK";
  todoListId: string;
  taskId: number | string;
};

export type AddActionType = {
  type: "ADD-TASK";
  title: string;
  todoListId: string;
};

export type ChangeTaskStatusActionType = {
  type: "CHANGE-TASK-STATUS";
  todoListId: string;
  taskId: string;
  isDone: boolean;
};

export type ChangeTaskTitleActionType = {
  type: "CHANGE-TASK-TITLE";
  todoListId: string;
  taskId: string;
  title: string;
};

type ActionsTypes =
  | RemoveActionType
  | AddActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodolistType
  | RemoveTodolistType;

const initialSatate: TasksStateType = {
  [todoListId1]: [
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "React", isDone: true },
    { id: v1(), title: "Typescript", isDone: true },
    { id: v1(), title: "Redux", isDone: false },
    { id: v1(), title: "Webpack", isDone: false },
  ],
  [todoListId2]: [
    { id: v1(), title: "Car", isDone: true },
    { id: v1(), title: "Home", isDone: true },
    { id: v1(), title: "Job", isDone: false },
    { id: v1(), title: "Phone", isDone: true },
    { id: v1(), title: "Skin", isDone: false },
    { id: v1(), title: "T-Short", isDone: true },
  ],
};

export const tasksReducer = (
  state: TasksStateType = initialSatate,
  action: ActionsTypes
): TasksStateType => {
  switch (action.type) {
    case "REMOVE-TASK": {
      const stateCopy = { ...state };
      const tasks = stateCopy[action.todoListId];
      const filteredTask = tasks.filter((task) => task.id !== action.taskId);
      stateCopy[action.todoListId] = filteredTask;

      return stateCopy;
    }
    case "ADD-TASK": {
      const stateCopy = { ...state };
      const newTask: TaskType = {
        title: action.title,
        id: v1(),
        isDone: false,
      };
      stateCopy[action.todoListId].unshift(newTask);
      return stateCopy;
    }
    case "CHANGE-TASK-STATUS": {
      const stateCopy = { ...state };
      const tasks = stateCopy[action.todoListId];
      const task = tasks.find((t) => t.id === action.taskId);

      if (task) {
        task.isDone = action.isDone;
      }

      return stateCopy;
    }
    case "CHANGE-TASK-TITLE": {
      const stateCopy = { ...state };
      const tasks = stateCopy[action.todoListId];
      const task = tasks.find((t) => t.id === action.taskId);

      if (task) {
        task.title = action.title;
      }

      return stateCopy;
    }
    case "ADD-TODOLIST": {
      const stateCopy = { ...state };

      stateCopy[action.todolistId] = [];

      return stateCopy;
    }
    case "REMOVED-TODOLIST": {
      const stateCopy = { ...state };

      delete stateCopy[action.id];

      return stateCopy;
    }
    default:
      return state;
  }
};

export const removeTaskAC = (
  todoListId: string,
  taskId: string
): RemoveActionType => {
  return { type: "REMOVE-TASK", todoListId, taskId };
};

export const addTaskAC = (title: string, todoListId: string): AddActionType => {
  return { type: "ADD-TASK", title, todoListId };
};

export const changeTaskStatusAC = (
  todoListId: string,
  taskId: string,
  isDone: boolean
): ChangeTaskStatusActionType => {
  return { type: "CHANGE-TASK-STATUS", todoListId, taskId, isDone };
};

export const changeTaskTitleAC = (
  todoListId: string,
  taskId: string,
  title: string
): ChangeTaskTitleActionType => {
  return { type: "CHANGE-TASK-TITLE", todoListId, taskId, title };
};
