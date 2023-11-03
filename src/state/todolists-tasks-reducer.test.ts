import { TasksStateType, TodoListType } from "../App";
import { tasksReducer } from "./task-reducer";
import { AddTodolistAC, todolistReducer } from "./todolist-reducer";

test("ids should be equal", () => {
  const startTaskState: TasksStateType = {};
  const startTodolistState: Array<TodoListType> = [];

  const action = AddTodolistAC("New Todos");

  const endTaskState = tasksReducer(startTaskState, action);
  const endTodolistState = todolistReducer(startTodolistState, action);

  const keys = Object.keys(endTaskState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistState[0].id;

  expect(idFromTasks).toBe(action.todolistId);
  expect(idFromTodolists).toBe(action.todolistId);
});
